"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { jsonToXML, escapeJSON, unescapeJSON, isEscapedJSON } from "@/lib/utils";
import JSONEditor from "./JSONEditor";
import { Alert, AlertDescription } from "./ui/alert";
import ToolSelector from "./ToolSelector";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

// Inline SVG icons (theme-aware via currentColor)
type IconProps = { className?: string };
const IconCopy = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <rect x="4" y="4" width="11" height="11" rx="2" />
  </svg>
);
const IconExpand = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path d="M4 12h6M8 8l2 2-2 2" />
    <path d="M20 12h-6M16 16l-2-2 2-2" />
  </svg>
);
const IconCompress = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path d="M4 12h8M8 8l-2 2 2 2" />
    <path d="M20 12h-8M16 16l2-2-2-2" />
  </svg>
);
const IconClear = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path d="M4 7h16M9 7l1-2h4l1 2M7 7l1 12h8l1-12" />
  </svg>
);
const IconLineNumbers = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path d="M6 6h12M6 12h12M6 18h12" />
    <path d="M3 6v0M3 12v0M3 18v0" strokeLinecap="round" />
  </svg>
);
const IconXML = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path d="M7 8l-4 4 4 4" />
    <path d="M17 8l4 4-4 4" />
    <path d="M11 6l2 12" />
  </svg>
);
const IconUnescape = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path d="M6 18L18 6" />
    <path d="M8 6l-2 2" />
    <path d="M16 18l2-2" />
  </svg>
);
const IconEscape = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path d="M6 18L18 6" />
    <path d="M12 10v4" />
    <path d="M10 12h4" />
  </svg>
);
const IconAdd = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <rect x="4" y="4" width="16" height="18" rx="2" />
    <path d="M12 10v6M9 13h6" />
  </svg>
);
const IconDownload = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path d="M12 3v10" />
    <path d="M8 9l4 4 4-4" />
    <path d="M4 20h16" />
  </svg>
);
const IconPaste = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path d="M9 4h6M8 7h8M7 7h10a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
  </svg>
);
const IconUpload = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path d="M20 20H4" />
    <path d="M12 4v10" />
    <path d="M8 8l4-4 4 4" />
  </svg>
);
const IconSpinner = ({ className = "w-4 h-4 animate-spin" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" fill="none" />
    <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" fill="none" />
  </svg>
);

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
      icon: IconCopy,
      text: t("copyInput"),
      tooltip: t("pasteFromClipboard"),
      action: () => handleCopy(input),
    },
    {
      icon: collapsed ? IconExpand : IconCompress,
      text: collapsed ? t("expand") : t("compress"),
      tooltip: collapsed ? t("expandJson") : t("compressJson"),
      action: handleCompress,
      active: collapsed,
    },
    {
      icon: IconClear,
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
      icon: IconLineNumbers,
      text: t("lineNumbers"),
      tooltip: showLineNumbers ? t("hideLineNumbers") : t("showLineNumbers"),
      action: () => setShowLineNumbers(!showLineNumbers),
      active: showLineNumbers,
    },
    {
      icon: IconXML,
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
      icon: IconUnescape,
      text: previewType === 'unescape' ? t("returnToJsonView") : (t("removeEscapes") || t("unescape")),
      tooltip: previewType === 'unescape' ? t("returnToJsonView") : (t("removeEscapesTooltip") || t("unescapeJsonString")),
      action: handleUnescapePreview,
      active: previewType === 'unescape',
      disabled: !isEscapedJSON(input) && previewType !== 'unescape',
    },
    {
      icon: IconEscape,
      text: escapeMode ? t("unescape") : t("escape"),
      tooltip: escapeMode ? t("unescapeJsonString") : t("escapeJsonString"),
      action: handleEscapeMode,
      active: escapeMode,
      processing: isProcessing,
    },
    {
      icon: IconAdd,
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

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900 relative">
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left toolbar - Tool Selector */}
          <ToolSelector />

          {/* Right toolbar - Action buttons */}
        </div>
      </div>

      {/* Main content area - Split panes */}
      <div className="h-[calc(100vh-178px)] p-4">
        <div className="h-full flex gap-4 min-w-0">
          {/* Left pane - Input area */}
          <div className="flex-4 min-w-0 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 h-[60px]">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("input")}
                </span>
                {escapeMode && (
                  <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full border border-green-200 dark:border-green-700">
                    <IconEscape className="w-3 h-3 mr-1" />
                    {t("escapeMode")}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative group">
                  <button
                    onClick={handlePaste}
                    className="flex items-center space-x-1 text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    <IconPaste className="w-3 h-3" />
                    <span>{t("paste")}</span>
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {t("pasteFromClipboard")}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
                <div className="relative group">
                  <label className="cursor-pointer">
                    <span className="flex items-center space-x-1 text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                      <IconUpload className="w-3 h-3" />
                      <span>{t("upload")}</span>
                    </span>
                    <input
                      type="file"
                      accept=".json,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {t("uploadLocalFile")}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
              </div>
            </div>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-[calc(100%-100px)] p-4 border-none outline-none font-mono text-sm bg-transparent text-gray-900 dark:text-white resize-none overflow-auto"
              placeholder={t("enterJsonData")}
              spellCheck={false}
              style={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}
            />
          </div>

          {/* Right pane - JSON Viewer with syntax highlighting */}
          <div className="flex-5 min-w-0 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 h-[60px]">
              <div className="flex items-center space-x-2">
                {/* <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  格式化结果
                </span> */}
                {previewType === 'xml' && (
                  <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                    ✓ XML
                  </span>
                )}
                {escapeMode && overrideOutput && (
                  <span className="text-xs text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded">
                    ✓ {t("escapeMode")}
                  </span>
                )}
                {previewType === 'unescape' && (
                  <span className="text-xs text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900 px-2 py-1 rounded">
                    ✓{t('unescaped')}
                  </span>
                )}
                {!overrideOutput &&
                  formattedOutput &&
                  !formattedOutput.startsWith("//") && (
                    <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 px-2 py-1 rounded">
                      ✓ {t("valid")}
                    </span>
                  )}
                {!overrideOutput &&
                  formattedOutput &&
                  formattedOutput.startsWith("//") && (
                    <span className="text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 px-2 py-1 rounded">
                      ✗ {t("formatError")}
                    </span>
                  )}
              </div>
              <div className="flex items-center space-x-1">
                {/* 工具栏图标按钮 */}
                {rightToolbar.map((tool, index) => {
                  const IconComponent = tool.icon;
                  const isEscapeButton = tool.action === handleEscapeMode;
                  const isProcessing = (tool as { processing?: boolean })
                    .processing;
                  const isDisabled =
                    (tool as { disabled?: boolean }).disabled || isProcessing;

                  return (
                    <div key={index} className="relative group">
                      <button
                        className={`p-2 text-sm rounded transition-all duration-200 ${
                          isDisabled
                            ? "opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-600"
                            : isEscapeButton && tool.active
                            ? "bg-green-500 text-white shadow-lg transform scale-105 border-2 border-green-400"
                            : isEscapeButton
                            ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900 dark:hover:text-green-300 border-2 border-transparent hover:border-green-300"
                            : tool.active
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                        onClick={isDisabled ? undefined : tool.action}
                        disabled={isDisabled}
                      >
                        {isProcessing ? (
                          <IconSpinner className="w-4 h-4 animate-spin" />
                        ) : (
                          <IconComponent className="w-4 h-4" />
                        )}
                        {isEscapeButton && tool.active && !isDisabled && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        )}
                      </button>

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                        <div className="font-medium">{tool.tooltip}</div>
                        {isEscapeButton && (
                          <div className="text-xs text-gray-300 mt-1">
                            {tool.active ? "点击取消" : "点击启用"}
                          </div>
                        )}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  );
                })}

                {/* 分隔线 */}
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>

                {/* 复制结果按钮 */}
                <div className="relative group">
                  <button
                    onClick={() =>
                      handleCopy(overrideOutput || formattedOutput)
                    }
                    disabled={!overrideOutput && !formattedOutput}
                    className="flex items-center space-x-1 text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    <IconCopy className="w-3 h-3" />
                    <span>{t("copy")}</span>
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {t("copyToClipboard")}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>

                {/* 下载文件按钮 */}
                <div className="relative group">
                  <button
                    onClick={() =>
                      handleDownload(
                        overrideOutput || formattedOutput,
                        previewType === 'xml' ? "data.xml" : "data.json"
                      )
                    }
                    disabled={
                      (!overrideOutput && !formattedOutput) ||
                      formattedOutput.startsWith("//")
                    }
                    className="flex items-center space-x-1 text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    <IconDownload className="w-3 h-3" />
                    <span>{t("download")}</span>
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {t("downloadToLocal")}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[calc(100%-108px)] border-radius-lg dark:bg-gray-900 overflow-hidden">
               <RightPaneContent />





                {/* 压缩模式：显示原始文本 */}



            </div>
          </div>
        </div>
      </div>

      {/* Fixed Alert at bottom */}
      {message && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4">
          <Alert
            variant={messageType === "success" ? "success" : "destructive"}
            className="shadow-lg border animate-in slide-in-from-bottom-2 duration-300"
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
    </div>
  );
}
