"use client";

import { useMemo, useRef, useState } from "react";
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

/**
 * 右侧面板当前显示哪一种转换结果。
 *
 * 原来这是四个互相纠缠的开关 —— collapsed、escapeMode、previewType，外加一个
 * overrideOutput 存着算好的字符串。它们的组合大半是无意义的（escapeMode 为真同时
 * previewType 是 'xml'），而 overrideOutput 更麻烦：它是一份快照，左侧输入一变就
 * 过期，而原来的 useEffect 在 overrideOutput 非空时直接 return，于是右侧会一直冻结
 * 在旧内容上。改成一个模式枚举，输出全部在渲染期从「输入 + 模式」算出来，就没有
 * 能过期的东西 —— 任何模式下看到的都是当前输入的转换结果。
 */
type ViewMode = "formatted" | "compressed" | "xml" | "unescaped" | "escaped";

/** 以 JSON 树渲染的模式。其余模式的输出是纯文本：单行 JSON、XML、转义后的字符串。 */
const TREE_MODES = new Set<ViewMode>(["formatted", "unescaped"]);

const errorText = (error: unknown) =>
  error instanceof Error ? error.message : "Unknown error";

/**
 * 按几种常见笔误依次尝试解析。全部失败时抛出最初那个错误 —— 它指向用户真正写下的
 * 位置，修复尝试produce的错误只会把人带偏。
 */
const parseLoose = (source: string): unknown => {
  try {
    return JSON.parse(source);
  } catch (firstError) {
    // 1. 补上没转义的反斜杠，同时保留合法的转义序列
    try {
      return JSON.parse(source.replace(/\\(?!["\\/bfnrt]|u[0-9a-fA-F]{4})/g, "\\\\"));
    } catch {
      // 2. 补上单边缺失的引号
      try {
        let quoted = source;
        if (source.startsWith('"') && !source.endsWith('"')) {
          quoted = source + '"';
        } else if (!source.startsWith('"') && source.endsWith('"')) {
          quoted = '"' + source;
        }
        return JSON.parse(quoted);
      } catch {
        throw firstError;
      }
    }
  }
};

/**
 * 引擎报错命中的已知模式对应的文案 key；null 表示只能原样展示引擎的说法。
 * 返回 key 而不是译文，这样这个函数就不需要拿到 t。
 */
const parseErrorKey = (raw: string): string | null => {
  if (raw.includes("Unexpected token")) {
    if (raw.includes("'/'")) return "unexpectedBackslash";
    if (raw.includes("in JSON")) return "jsonFormatError";
    return null;
  }
  if (raw.includes("Unterminated string")) return "unterminatedString";
  if (raw.includes("Expected property name")) return "expectedPropertyName";
  return null;
};

/** 给 XML 加缩进。 */
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

interface ToolbarButton {
  icon: React.ElementType;
  text: string;
  tooltip: string;
  action: () => void;
  active?: boolean;
  disabled?: boolean;
}

export default function JSONFormatter() {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("formatted");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  };

  // 输入和模式就能完全决定右侧内容，全部在浏览器里同步算完，没有要等的东西，
  // 所以在渲染期派生，不经过 state。
  const { output, error } = useMemo<{ output: string; error: string }>(() => {
    const source = input.trim();
    if (!source) return { output: "", error: "" };

    // 转义和去转义处理的是字符串本身，不要求输入是合法 JSON。
    if (viewMode === "escaped" || viewMode === "unescaped") {
      try {
        const convert = viewMode === "escaped" ? escapeJSON : unescapeJSON;
        return { output: convert(input), error: "" };
      } catch (caught) {
        return { output: "", error: errorText(caught) };
      }
    }

    let parsed: unknown;
    try {
      parsed = parseLoose(source);
    } catch (caught) {
      const raw = errorText(caught);
      const key = parseErrorKey(raw);
      return {
        output: "",
        error: key
          ? `${t("jsonParseError")}: ${t(key)}\n${t("originalError")}: ${raw}`
          : raw,
      };
    }

    if (viewMode === "xml") {
      try {
        return { output: formatXML(jsonToXML(input)), error: "" };
      } catch (caught) {
        return { output: "", error: errorText(caught) };
      }
    }

    return {
      output: JSON.stringify(parsed, null, viewMode === "compressed" ? 0 : 2),
      error: "",
    };
  }, [input, viewMode, t]);

  /**
   * 输入变了。输出是派生的，所以这里没有要清理的输出状态 —— 唯一要做的是「检测到
   * 转义过的 JSON」这条提示：它是对用户这次输入动作的反馈，推不出来，只能在事件里发。
   */
  const applyInput = (next: string) => {
    setInput(next);
    if (viewMode !== "escaped" && next.trim() && isEscapedJSON(next)) {
      showMessage(t("detectedEscapedJson"));
    }
  };

  const handleCompress = () => {
    if (!input.trim()) {
      showMessage(t("enterJsonDataFirst"), "error");
      return;
    }
    if (error) {
      // 报错文案可能有两行，提示条里只放第一行。
      showMessage(`${t("compressionFailed")}: ${error.split("\n")[0]}`, "error");
      return;
    }

    const collapsing = viewMode !== "compressed";
    setViewMode(collapsing ? "compressed" : "formatted");
    showMessage(collapsing ? t("jsonCompressed") : t("jsonExpanded"));
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      showMessage(t("copiedToClipboard"));
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
    showMessage(t("fileDownloaded"));
  };

  /**
   * 切到某个转换模式，或者从它切回来。
   *
   * 转换在这里先跑一遍只为了拿失败信息 —— 派生逻辑会再跑一次，但这是一次点击，
   * 代价可以忽略，而换来的是「转不了就弹提示、并且停在原来的视图」而不是把一个
   * 报错面板顶到用户面前。
   */
  const enterMode = (
    mode: ViewMode,
    convert: (source: string) => string,
    successMessage: string,
    failurePrefix: string
  ) => {
    if (viewMode === mode) {
      setViewMode("formatted");
      showMessage(t("returnToJsonView"));
      return;
    }
    if (!input.trim()) {
      showMessage(t("enterJsonDataFirst"), "error");
      return;
    }
    try {
      convert(input);
    } catch (caught) {
      showMessage(`${failurePrefix}: ${errorText(caught)}`, "error");
      return;
    }
    setViewMode(mode);
    showMessage(successMessage);
  };

  const handleToXML = () =>
    enterMode(
      "xml",
      (source) => formatXML(jsonToXML(source)),
      t("convertedToXml"),
      t("xmlConversionFailed")
    );

  const handleUnescape = () =>
    enterMode(
      "unescaped",
      unescapeJSON,
      t("unescapeCompleted"),
      t("escapeOperationFailed")
    );

  const handleEscape = () => {
    if (viewMode === "escaped") {
      setViewMode("formatted");
      showMessage(t("unescapeCompleted"));
      return;
    }
    enterMode(
      "escaped",
      escapeJSON,
      t("escapeCompleted"),
      t("escapeOperationFailed")
    );
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
    setViewMode("formatted");
    showMessage(t("exampleAdded"));
  };

  const rightToolbar: ToolbarButton[] = [
    {
      icon: DocumentDuplicateIcon,
      text: t("copyInput"),
      tooltip: t("pasteFromClipboard"),
      action: () => handleCopy(input),
    },
    {
      icon:
        viewMode === "compressed" ? ArrowsPointingOutIcon : ArrowsPointingInIcon,
      text: viewMode === "compressed" ? t("expand") : t("compress"),
      tooltip: viewMode === "compressed" ? t("expandJson") : t("compressJson"),
      action: handleCompress,
      active: viewMode === "compressed",
    },
    {
      icon: TrashIcon,
      text: t("clear"),
      tooltip: "清空所有内容",
      action: () => {
        setInput("");
        setViewMode("formatted");
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
      text: viewMode === "xml" ? t("cancelXmlConversion") : t("toXML"),
      tooltip:
        viewMode === "escaped"
          ? t("xmlModeActive")
          : viewMode === "xml"
          ? t("cancelXmlConversion")
          : t("convertToXml"),
      action: handleToXML,
      active: viewMode === "xml",
      disabled: viewMode === "escaped",
    },
    {
      icon: ArrowPathIcon,
      text:
        viewMode === "unescaped"
          ? t("returnToJsonView")
          : t("removeEscapes") || t("unescape"),
      tooltip:
        viewMode === "unescaped"
          ? t("returnToJsonView")
          : t("removeEscapesTooltip") || t("unescapeJsonString"),
      action: handleUnescape,
      active: viewMode === "unescaped",
      disabled: !isEscapedJSON(input) && viewMode !== "unescaped",
    },
    {
      icon: SparklesIcon,
      text: viewMode === "escaped" ? t("unescape") : t("escape"),
      tooltip:
        viewMode === "escaped" ? t("unescapeJsonString") : t("escapeJsonString"),
      action: handleEscape,
      active: viewMode === "escaped",
    },
    {
      icon: PlusIcon,
      text: t("addExample"),
      tooltip: t("addExampleData"),
      action: handleAddExample,
    },
  ];

  const handlePaste = async () => {
    try {
      applyInput(await navigator.clipboard.readText());
    } catch {
      showMessage("Paste failed", "error");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        applyInput(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleFormat = () => {
    if (!input.trim()) {
      showMessage(t("enterJsonDataFirst"), "error");
      textareaRef.current?.focus();
      return;
    }

    if (error) {
      showMessage(t("formatError"), "error");
      return;
    }

    showMessage(t("formatCompleted"));
  };

  const hasOutput = Boolean(output);
  const hasError = Boolean(error);
  const isValid = Boolean(input.trim() && hasOutput && !hasError);

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

              return (
                <button
                  key={`${tool.text}-${index}`}
                  type="button"
                  onClick={tool.disabled ? undefined : tool.action}
                  disabled={tool.disabled}
                  title={tool.tooltip}
                  aria-label={tool.text}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
                    tool.disabled
                      ? "cursor-not-allowed text-[#c5c5c0]"
                      : tool.active
                      ? "bg-[#edf3ff] text-[#1261ff]"
                      : "text-[#555961] hover:bg-white hover:text-[#111]"
                  }`}
                >
                  <IconComponent
                    className="h-[18px] w-[18px]"
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
                {viewMode === "escaped" ? (
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
              onChange={(event) => applyInput(event.target.value)}
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
                  {viewMode === "xml" ? "XML" : t("formatted")}
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
                  onClick={() => handleCopy(output)}
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
                      output,
                      viewMode === "xml" ? "data.xml" : "data.json"
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
              <OutputPane
                output={output}
                error={error}
                viewMode={viewMode}
                showLineNumbers={showLineNumbers}
                emptyHint={t("formattedJsonDisplay")}
              />
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

interface OutputPaneProps {
  output: string;
  error: string;
  viewMode: ViewMode;
  showLineNumbers: boolean;
  emptyHint: string;
}

/**
 * 右侧面板。声明在组件外面：原来它是 JSONFormatter 里的一个箭头函数，每次渲染都是
 * 一个新的组件类型，React 会卸载旧的再挂载新的，里面 JSONEditor 的折叠状态因此
 * 每敲一个键就丢一次。
 */
function OutputPane({
  output,
  error,
  viewMode,
  showLineNumbers,
  emptyHint,
}: OutputPaneProps) {
  if (error) {
    return (
      <div className="flex h-full items-start gap-3 p-5">
        <ExclamationCircleIcon
          className="mt-0.5 h-5 w-5 shrink-0 text-[#cf3030]"
          aria-hidden="true"
        />
        <p className="whitespace-pre-wrap font-mono text-[13px] leading-6 text-[#a52020]">
          {error}
        </p>
      </div>
    );
  }

  if (!output) {
    return <p className="p-5 text-sm text-[#9a9da3]">{emptyHint}</p>;
  }

  if (TREE_MODES.has(viewMode)) {
    return <JSONEditor value={output} showLineNumbers={showLineNumbers} />;
  }

  const lines = output.split("\n");

  return (
    <div className="p-4 font-mono text-sm overflow-auto h-full bg-transparent">
      {showLineNumbers ? (
        <div className="flex items-start min-w-0">
          <div
            className="text-gray-400 dark:text-gray-500 text-xs leading-5 mr-4 select-none flex-shrink-0"
            style={{ minWidth: "3ch", textAlign: "right" }}
          >
            {lines.map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>
          <div className="flex-1 min-w-0 overflow-hidden">
            <pre className="whitespace-pre-wrap break-all text-gray-900 dark:text-white">
              {output}
            </pre>
          </div>
        </div>
      ) : (
        <pre className="whitespace-pre-wrap break-all text-gray-900 dark:text-white overflow-hidden">
          {output}
        </pre>
      )}
    </div>
  );
}
