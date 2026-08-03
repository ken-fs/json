"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { jsonToXML, escapeJSON, unescapeJSON, isEscapedJSON } from "@/lib/utils";
import JSONEditor from "./JSONEditor";
import ToolIntro from "./ToolIntro";
import { Alert, AlertDescription } from "./ui/alert";
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ArrowUpTrayIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  CodeBracketIcon,
  DocumentDuplicateIcon,
  ExclamationCircleIcon,
  ListBulletIcon,
  PlusIcon,
  SparklesIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function JSONFormatter() {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [formattedOutput, setFormattedOutput] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [escapeMode, setEscapeMode] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [overrideOutput, setOverrideOutput] = useState<string>(""); // 手动设置的输出，为空时使用自动格式化
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // const { language } = useLanguageStore(); // 保留用于未来的国际化功能

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  };


  // 实时格式化JSON和手动输出处理
  useEffect(() => {
    if (!input.trim()) {
      setFormattedOutput("");
      setOverrideOutput(""); // 清空手动输出
      setCollapsed(false);
      return;
    }

    // 如果有手动设置的输出，直接使用它（跳过JSON解析）
    if (overrideOutput) {
      return;
    }

    // 否则进行自动格式化
    try {
      // 预处理输入，尝试修复常见的JSON格式问题
      const processedInput = input.trim();

      // 尝试解析原始输入
      let parsed;
      try {
        parsed = JSON.parse(processedInput);
      } catch (firstError) {
        // 如果直接解析失败，尝试一些修复策略
        try {
          // 1. 尝试修复未转义的反斜杠（但保留有效的转义序列）
          const fixedInput = processedInput.replace(
            /\\(?!["\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            "\\\\"
          );
          parsed = JSON.parse(fixedInput);
        } catch {
          // 2. 尝试修复未闭合的字符串（添加缺失的引号）
          try {
            let quotedInput = processedInput;
            if (
              processedInput.startsWith('"') &&
              !processedInput.endsWith('"')
            ) {
              quotedInput = processedInput + '"';
            } else if (
              !processedInput.startsWith('"') &&
              processedInput.endsWith('"')
            ) {
              quotedInput = '"' + processedInput;
            }
            parsed = JSON.parse(quotedInput);
          } catch {
            // 3. 如果都失败了，抛出最原始的错误
            throw firstError;
          }
        }
      }

      const formatted = JSON.stringify(parsed, null, 2);
      setFormattedOutput(formatted);
      setCollapsed(false);
      setMessage("");

      // 自动检测转义的JSON并提示
      if (!escapeMode && isEscapedJSON(input)) {
        showMessage(t("detectedEscapedJson"), "success");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      // 提供更友好的错误信息和修复建议
      let friendlyMessage = errorMessage;
      if (errorMessage.includes("Unexpected token")) {
        if (errorMessage.includes("'/'")) {
          friendlyMessage = t("unexpectedBackslash");
        } else if (errorMessage.includes("in JSON")) {
          friendlyMessage = t("jsonFormatError");
        }
      } else if (errorMessage.includes("Unterminated string")) {
        friendlyMessage = t("unterminatedString");
      } else if (errorMessage.includes("Expected property name")) {
        friendlyMessage = t("expectedPropertyName");
      }

      setFormattedOutput(
        `// ${t("jsonParseError")}: ${friendlyMessage}\n// ${t(
          "originalError"
        )}: ${errorMessage}`
      );
      setCollapsed(false);
    }
  }, [input, overrideOutput, escapeMode, t]);

  // 工具栏功能函数
  const handleCompress = () => {
    if (!formattedOutput || formattedOutput.startsWith("//")) {
      showMessage(t("enterJsonDataFirst"), "error");
      return;
    }

    try {
      // 使用右侧格式化的输出数据进行压缩/展开操作
      const parsed = JSON.parse(formattedOutput);

      if (collapsed) {
        // 展开：格式化为带缩进的 JSON
        const formatted = JSON.stringify(parsed, null, 2);
        setOverrideOutput(formatted); // useEffect会自动设置formattedOutput
        setCollapsed(false);
        showMessage(t("jsonExpanded"), "success");
      } else {
        // 压缩：压缩为单行 JSON
        const compressed = JSON.stringify(parsed);
        setOverrideOutput(compressed); // useEffect会自动设置formattedOutput
        setCollapsed(true);
        showMessage(t("jsonCompressed"), "success");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      showMessage(`${t("compressionFailed")}: ${errorMessage}`, "error");
    }
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      showMessage(t("copiedToClipboard"), "success");
    } catch {
      showMessage(t("copyFailed"), "error");
    }
  };

  const handleDownload = (content: string, filename: string = "data.json") => {
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showMessage(t("fileDownloaded"), "success");
  };

  // 去除转义（预览）：将被转义的 JSON 字符串还原为正常 JSON，显示在右侧预览，不替换输入
  const [previewType, setPreviewType] = useState<null | 'xml' | 'unescape'>(null);
  const handleUnescapePreview = () => {
    if (!input.trim()) {
      showMessage(t("enterJsonDataFirst"), "error");
      return;
    }
    try {
      if (previewType === 'unescape') {
        setOverrideOutput("");
        setPreviewType(null);
        showMessage(t("returnToJsonView"), "success");
        return;
      }
      const unescaped = unescapeJSON(input);
      setOverrideOutput(unescaped);
      setCollapsed(false);
      setEscapeMode(false);
      setPreviewType('unescape');
      showMessage(t("unescapeCompleted"), "success");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      showMessage(`${t("escapeOperationFailed")}: ${errorMessage}`, "error");
    }
  };

  const handleToXML = () => {
    try {
      // 如果处于转义模式，不允许XML转换
      if (escapeMode) {
        showMessage(t("xmlModeActive"), "error");
        return;
      }

      if (overrideOutput) {
        // 如果当前是XML模式，取消XML转换，回到JSON模式
        setOverrideOutput("");
        showMessage(t("returnToJsonView"), "success");
        return;
      }

      if (!input.trim()) {
        showMessage(t("enterJsonDataFirst"), "error");
        return;
      }
      const xml = jsonToXML(input);
      // 格式化 XML 输出，添加适当的缩进
      const formattedXml = formatXML(xml);
      setOverrideOutput(formattedXml);
      showMessage(t("convertedToXml"), "success");
    } catch (error: unknown) {
      showMessage(
        `${t("xmlConversionFailed")}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        "error"
      );
    }
  };

  // XML 格式化辅助函数
  const formatXML = (xml: string): string => {
    let formatted = "";
    let indent = 0;
    const tab = "  ";

    xml.split(/(<[^>]*>)/g).forEach((node) => {
      if (node.match(/^<\/?\w/)) {
        if (node.match(/^<\//)) {
          indent--;
        }
        formatted += tab.repeat(indent) + node + "\n";
        if (node.match(/^<\w/) && !node.match(/\/>$/)) {
          indent++;
        }
      } else if (node.trim()) {
        formatted += tab.repeat(indent) + node.trim() + "\n";
      }
    });

    return formatted.trim();
  };

  const handleEscapeMode = async () => {
    if (!input.trim()) {
      showMessage(t("enterJsonDataFirst"), "error");
      return;
    }

    setIsProcessing(true);

    try {
      if (escapeMode) {
        // 取消转义模式：清除右侧的转义输出，恢复正常JSON格式化
        setOverrideOutput("");
        setEscapeMode(false);
        setPreviewType(null);
        showMessage(t("unescapeCompleted"), "success");
      } else {
        // 如果处于XML模式，先取消XML模式
        if (overrideOutput && !escapeMode) {
          setOverrideOutput("");
        }

        // 开启转义模式：将左侧JSON转义后显示在右侧
        const escaped = escapeJSON(input);
        setOverrideOutput(escaped);
        setEscapeMode(true);
        setPreviewType(null);
        showMessage(t("escapeCompleted"), "success");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      showMessage(`${t("escapeOperationFailed")}: ${errorMessage}`, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddExample = () => {
    const example = {
      name: "John Doe",
      age: 30,
      city: "New York",
      hobbies: ["reading", "coding", "traveling"],
      address: {
        street: "123 Main St",
        zipCode: "10001",
      },
    };
    setInput(JSON.stringify(example, null, 2));
    setCollapsed(false);
    setOverrideOutput(""); // 重置手动输出
    showMessage(t("exampleAdded"), "success");
  };


  const rightToolbar = [
    // {
    //   icon: ArrowDownTrayIcon,
    //   text: 'Download JSON',
    //   tooltip: '下载JSON文件到本地',
    //   action: () => handleDownload(formattedOutput || input)
    // },
    // {
    //   icon: ClipboardDocumentIcon,
    //   text: 'Copy Output',
    //   tooltip: '复制格式化后的结果',
    //   action: () => handleCopy(formattedOutput)
    // },
    {
      icon: DocumentDuplicateIcon,
      text: t("copyInput"),
      tooltip: t("pasteFromClipboard"),
      action: () => handleCopy(input),
    },
    {
      icon: collapsed ? ArrowsPointingOutIcon : ArrowsPointingInIcon,
      text: collapsed ? t("expand") : t("compress"),
      tooltip: collapsed ? t("expandJson") : t("compressJson"),
      action: handleCompress,
      active: collapsed,
    },
    {
      icon: TrashIcon,
      text: t("clear"),
      tooltip: "清空所有内容",
      action: () => {
        setInput("");
        setFormattedOutput("");
        setCollapsed(false);
        setOverrideOutput("");
      },
    },

    {
      icon: ListBulletIcon,
      text: t("lineNumbers"),
      tooltip: showLineNumbers ? t("hideLineNumbers") : t("showLineNumbers"),
      action: () => setShowLineNumbers(!showLineNumbers),
      active: showLineNumbers,
    },
    {
      icon: CodeBracketIcon,
      text: previewType === 'xml' ? t("cancelXmlConversion") : t("toXML"),
      tooltip: escapeMode
        ? t("xmlModeActive")
        : previewType === 'xml'
        ? t("cancelXmlConversion")
        : t("convertToXml"),
      action: () => {
        if (previewType === 'xml') {
          setOverrideOutput("");
          setPreviewType(null);
          showMessage(t("returnToJsonView"), "success");
          return;
        }
        handleToXML();
        setPreviewType('xml');
      },
      active: previewType === 'xml',
      disabled: escapeMode,
    },
    {
      icon: ArrowPathIcon,
      text: previewType === 'unescape' ? t("returnToJsonView") : (t("removeEscapes") || t("unescape")),
      tooltip: previewType === 'unescape' ? t("returnToJsonView") : (t("removeEscapesTooltip") || t("unescapeJsonString")),
      action: handleUnescapePreview,
      active: previewType === 'unescape',
      disabled: !isEscapedJSON(input) && previewType !== 'unescape',
    },
    {
      icon: SparklesIcon,
      text: escapeMode ? t("unescape") : t("escape"),
      tooltip: escapeMode ? t("unescapeJsonString") : t("escapeJsonString"),
      action: handleEscapeMode,
      active: escapeMode,
      processing: isProcessing,
    },
    {
      icon: PlusIcon,
      text: t("addExample"),
      tooltip: t("addExampleData"),
      action: handleAddExample,
    },
    // {
    //   icon: WrenchScrewdriverIcon,
    //   text: "Fix JSON",
    //   tooltip: "自动修复常见的JSON格式错误（转义字符、缺少引号、尾随逗号等）",
    //   action: handleFixJSON,
    // },
    // {
    //   icon: ArrowUturnLeftIcon,
    //   text: "Undo",
    //   tooltip: "撤销操作",
    //   action: () => {},
    // },
    // {
    //   icon: ArrowUturnRightIcon,
    //   text: "Redo",
    //   tooltip: "重做操作",
    //   action: () => {},
    // },
    // {
    //   icon: QuestionMarkCircleIcon,
    //   text: "Help",
    //   tooltip: "查看使用帮助",
    //   action: () =>
    //     showMessage(
    //       "JSON Formatter Help: Paste or type JSON on the left, see formatted result on the right",
    //       "success"
    //     ),
    // },
  ];

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      showMessage("Paste failed", "error");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInput(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  // Extracted to simplify deeply nested JSX/ternaries in the right pane
  const RightPaneContent = () => {
    if (overrideOutput) {
      return (
        <>
          {previewType === 'unescape' && (
            <JSONEditor
              value={overrideOutput}
              showLineNumbers={showLineNumbers}
              readOnly={true}
            />
          )}
          <div
            className="p-4 font-mono text-sm overflow-auto h-full bg-transparent"
            style={{ display: previewType === 'unescape' ? 'none' : undefined }}
          >
            {showLineNumbers ? (
              <div className="flex items-start min-w-0">
                <div
                  className="text-gray-400 dark:text-gray-500 text-xs mr-4 select-none flex-shrink-0"
                  style={{ minWidth: '3ch' }}
                >
                  {overrideOutput.split('\n').map((_, i) => (
                    <div key={i} style={{ textAlign: 'right' }}>
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <pre className="whitespace-pre-wrap break-all text-gray-900 dark:text-white">
                    {overrideOutput}
                  </pre>
                </div>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap break-all text-gray-900 dark:text-white overflow-hidden">
                {overrideOutput}
              </pre>
            )}
          </div>
        </>
      );
    }

    if (collapsed && formattedOutput && !formattedOutput.startsWith('//')) {
      return (
        <div className="p-4 font-mono text-sm overflow-auto h-full bg-transparent">
          {showLineNumbers && (
            <div className="flex items-start min-w-0">
              <span
                className="text-gray-400 dark:text-gray-500 text-xs mr-2 select-none flex-shrink-0"
                style={{ minWidth: '3ch', textAlign: 'right' }}
              >
                1
              </span>
              <div className="flex-1 min-w-0 overflow-hidden">
                <pre className="whitespace-pre-wrap break-all text-gray-900 dark:text-white">
                  {formattedOutput}
                </pre>
              </div>
            </div>
          )}
          {!showLineNumbers && (
            <pre className="whitespace-pre-wrap break-all text-gray-900 dark:text-white overflow-hidden">
              {formattedOutput}
            </pre>
          )}
        </div>
      );
    }

    return (
      <JSONEditor
        value={formattedOutput}
        showLineNumbers={showLineNumbers}
        readOnly={false}
      />
    );
  };

  const handleFormat = () => {
    if (!input.trim()) {
      showMessage(t("enterJsonDataFirst"), "error");
      textareaRef.current?.focus();
      return;
    }

    if (formattedOutput.startsWith("//")) {
      showMessage(t("formatError"), "error");
      return;
    }

    showMessage(t("formatCompleted"), "success");
  };

  const hasOutput = Boolean(overrideOutput || formattedOutput);
  const hasError = formattedOutput.startsWith("//");
  const isValid = Boolean(input.trim() && formattedOutput && !hasError);

  return (
    <main className="relative flex-1 bg-[#f7f7f4] px-4 py-6 sm:px-6 lg:px-9 lg:py-7">
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-7 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#1261ff]">
              JSON1 / {t("tools.jsonFormatter.label")}
            </p>
            <h1 className="text-[42px] font-black leading-none tracking-[-0.055em] text-[#111] sm:text-[54px]">
              {t("workspaceTitle")}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#666a72] sm:text-base">
              {t("workspaceSubtitle")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-md border border-[#d6d6d1] bg-white px-4 text-sm font-semibold text-[#303238] transition-colors hover:border-[#a8a8a2] hover:bg-[#fcfcfa]">
              <ArrowUpTrayIcon className="h-5 w-5" aria-hidden="true" />
              {t("upload")}
              <input
                type="file"
                accept=".json,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={handlePaste}
              className="inline-flex h-11 items-center gap-2 rounded-md border border-[#d6d6d1] bg-white px-4 text-sm font-semibold text-[#303238] transition-colors hover:border-[#a8a8a2] hover:bg-[#fcfcfa]"
            >
              <ClipboardDocumentIcon className="h-5 w-5" aria-hidden="true" />
              {t("paste")}
            </button>
            <button
              type="button"
              onClick={handleFormat}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-[#1261ff] px-5 text-sm font-semibold text-white shadow-[0_5px_18px_rgba(18,97,255,0.22)] transition-transform hover:-translate-y-0.5 hover:bg-[#064fdc] active:translate-y-0"
            >
              <SparklesIcon className="h-5 w-5" aria-hidden="true" />
              {t("format")} JSON
            </button>
          </div>
        </div>

        <div className="mb-3 flex flex-col gap-3 border-y border-[#dedede] py-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-2 text-sm text-[#62656c]">
            <CheckCircleIcon
              className={`h-5 w-5 ${isValid ? "text-[#63b100]" : "text-[#a7aaa4]"}`}
              aria-hidden="true"
            />
            <span className={isValid ? "font-semibold text-[#4f8f00]" : ""}>
              {isValid ? t("validJson") : t("processedLocally")}
            </span>
            <span className="hidden text-[#b0b0aa] sm:inline">·</span>
            <span className="hidden sm:inline">{t("privacyNote")}</span>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            {rightToolbar.map((tool, index) => {
              const IconComponent = tool.icon;
              const processing = (tool as { processing?: boolean }).processing;
              const disabled =
                (tool as { disabled?: boolean }).disabled || processing;

              return (
                <button
                  key={`${tool.text}-${index}`}
                  type="button"
                  onClick={disabled ? undefined : tool.action}
                  disabled={disabled}
                  title={tool.tooltip}
                  aria-label={tool.text}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
                    disabled
                      ? "cursor-not-allowed text-[#c5c5c0]"
                      : tool.active
                      ? "bg-[#edf3ff] text-[#1261ff]"
                      : "text-[#555961] hover:bg-white hover:text-[#111]"
                  }`}
                >
                  <IconComponent
                    className={`h-[18px] w-[18px] ${processing ? "animate-spin" : ""}`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid min-h-[680px] overflow-hidden rounded-lg border border-[#d9d9d5] bg-white lg:grid-cols-[0.9fr_1.1fr]">
          <section className="flex min-h-[460px] min-w-0 flex-col border-b border-[#d9d9d5] lg:border-b-0 lg:border-r">
            <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-[#e2e2de] px-5">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold uppercase tracking-[0.08em] text-[#27292e]">
                  {t("inputLabel")}
                </span>
                <span className="rounded bg-[#f0f0ec] px-2 py-1 text-xs font-medium text-[#666a72]">
                  JSON
                </span>
                {escapeMode ? (
                  <span className="text-xs font-semibold text-[#1261ff]">
                    {t("escapeMode")}
                  </span>
                ) : null}
              </div>
              <span className="text-xs tabular-nums text-[#8a8d93]">
                {input ? `${input.split("\n").length} ${t("lines")}` : t("ready")}
              </span>
            </div>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="min-h-[400px] flex-1 resize-none overflow-auto border-none bg-white p-5 font-mono text-[13px] leading-6 text-[#25282d] outline-none placeholder:font-sans placeholder:text-[#9a9da3] focus:bg-[#fefeff]"
              placeholder={t("enterJsonData")}
              spellCheck={false}
              style={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}
            />
          </section>

          <section className="flex min-h-[460px] min-w-0 flex-col">
            <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-[#e2e2de] px-5">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold uppercase tracking-[0.08em] text-[#27292e]">
                  {t("outputLabel")}
                </span>
                <span className="rounded bg-[#f0f0ec] px-2 py-1 text-xs font-medium text-[#666a72]">
                  {previewType === "xml" ? "XML" : t("formatted")}
                </span>
                {hasError ? (
                  <span className="text-xs font-semibold text-[#cf3030]">
                    {t("invalid")}
                  </span>
                ) : null}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(overrideOutput || formattedOutput)}
                  disabled={!hasOutput}
                  className="inline-flex h-9 items-center gap-2 rounded-md border border-[#d6d6d1] px-3 text-sm font-semibold text-[#3a3d43] transition-colors hover:bg-[#f8f8f5] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <DocumentDuplicateIcon className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{t("copy")}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleDownload(
                      overrideOutput || formattedOutput,
                      previewType === "xml" ? "data.xml" : "data.json"
                    )
                  }
                  disabled={!hasOutput || hasError}
                  className="inline-flex h-9 items-center gap-2 rounded-md bg-[#1261ff] px-3 text-sm font-semibold text-white transition-colors hover:bg-[#064fdc] disabled:cursor-not-allowed disabled:bg-[#b9cdf8]"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{t("download")}</span>
                </button>
              </div>
            </div>

            <div className="min-h-[400px] flex-1 overflow-hidden bg-[#fff]">
              <RightPaneContent />
            </div>
          </section>
        </div>

        <ToolIntro id="jsonFormatter" />

        <footer className="mt-8 flex flex-col gap-2 border-t border-[#dedede] py-5 text-xs text-[#6f7279] sm:flex-row sm:items-center sm:justify-between">
          <span>JSON1 — {t("footerTagline")}</span>
          <span>{t("processedLocally")} · {t("privacyNote")}</span>
        </footer>
      </div>

      {/* Fixed Alert at bottom */}
      {message && (
        <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2">
          <Alert
            variant={messageType === "success" ? "success" : "destructive"}
            className="animate-in border bg-white shadow-xl slide-in-from-bottom-2 duration-300"
          >
            {messageType === "success" ? (
              <CheckCircleIcon className="h-4 w-4" />
            ) : (
              <ExclamationCircleIcon className="h-4 w-4" />
            )}
            <AlertDescription className="font-medium">
              {message}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </main>
  );
}
