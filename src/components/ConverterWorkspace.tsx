"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getConverter } from "@/lib/json/convert";
import { supportsDelimiter, supportsRootName, type ToolDefinition } from "@/lib/tools";
import JSONEditor from "./JSONEditor";
import RelatedTools from "./RelatedTools";
import SiteFooter from "./SiteFooter";
import ToolIntro from "./ToolIntro";
import { Alert, AlertDescription } from "./ui/alert";
import IconButton from "./ui/IconButton";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  DocumentDuplicateIcon,
  ExclamationCircleIcon,
  ListBulletIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface ConverterWorkspaceProps {
  tool: ToolDefinition;
}

/** Shared editor shell for every converter page. */
export default function ConverterWorkspace({ tool }: ConverterWorkspaceProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [rootName, setRootName] = useState("Root");
  const [delimiter, setDelimiter] = useState(",");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const showMessage = useCallback((text: string, type: "success" | "error" = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  }, []);

  // Fall back to the English copy on the tool definition until a locale
  // provides the key, so a new tool is never blank in a translated UI.
  const label = t(`tools.${tool.id}.label`, { defaultValue: tool.label });
  const description = t(`tools.${tool.id}.description`, { defaultValue: tool.description });

  // Convert as the user types. Everything runs in the browser, so there is no
  // request to debounce and the result stays in step with the input.
  //
  // Derived during render rather than pushed into state from an effect. The old
  // shape held `output` and `error` in `useState` and wrote them from a
  // `useEffect` on `input`, which meant every keystroke rendered twice — once
  // with the stale conversion, then again with the new one — and left a frame
  // where the output pane disagreed with the textarea beside it. There is nothing
  // asynchronous here to wait for, so there is nothing for an effect to do.
  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: "", error: "" };

    const convert = getConverter(tool.id);
    if (!convert) {
      return { output: "", error: `No converter registered for "${tool.id}".` };
    }

    try {
      return { output: convert(input, { rootName, delimiter }), error: "" };
    } catch (caught) {
      return {
        output: "",
        error: caught instanceof Error ? caught.message : String(caught),
      };
    }
  }, [input, rootName, delimiter, tool.id]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      showMessage(t("copiedToClipboard"));
    } catch {
      showMessage(t("copyFailed"), "error");
    }
  };

  const handlePaste = async () => {
    try {
      setInput(await navigator.clipboard.readText());
    } catch {
      showMessage(t("pasteFailed"), "error");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `converted.${tool.extension}`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
    showMessage(t("fileDownloaded"));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (loaded) => setInput(loaded.target?.result as string);
    reader.readAsText(file);
    // Reset so selecting the same file twice still fires a change event.
    event.target.value = "";
  };

  const lineCount = useMemo(() => (input ? input.split("\n").length : 0), [input]);
  const hasOutput = Boolean(output);

  return (
    <main className="relative flex-1 bg-[#f7f7f4] px-4 py-6 sm:px-6 lg:px-9 lg:py-7">
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-7 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#1261ff]">
              JSON.how / {label}
            </p>
            <h1 className="text-[38px] font-extrabold leading-none tracking-[-0.055em] text-[#111] sm:text-[48px]">
              {label}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#666a72] sm:text-base">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-md border border-[#d6d6d1] bg-white px-4 text-sm font-semibold text-[#303238] transition-colors hover:border-[#a8a8a2] hover:bg-[#fcfcfa]">
              <ArrowUpTrayIcon className="h-5 w-5" aria-hidden="true" />
              {t("upload")}
              <input type="file" onChange={handleFileUpload} className="hidden" />
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
              onClick={() => setInput(tool.example)}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-[#1261ff] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#064fdc] active:translate-y-px"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
              {t("addExample")}
            </button>
          </div>
        </div>

        <div className="mb-3 flex flex-col gap-3 border-y border-[#dedede] py-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-2 text-sm text-[#62656c]">
            {error ? (
              <ExclamationCircleIcon className="h-5 w-5 text-[#cf3030]" aria-hidden="true" />
            ) : (
              <CheckCircleIcon
                className={`h-5 w-5 ${hasOutput ? "text-[#63b100]" : "text-[#a7aaa4]"}`}
                aria-hidden="true"
              />
            )}
            <span className={hasOutput && !error ? "font-semibold text-[#4f8f00]" : ""}>
              {error ? t("invalid") : hasOutput ? t("validJson") : t("processedLocally")}
            </span>
            <span className="hidden text-[#b0b0aa] sm:inline">·</span>
            <span className="hidden sm:inline">{t("privacyNote")}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {supportsRootName(tool) ? (
              <label className="inline-flex items-center gap-2 text-sm text-[#555961]">
                {t("rootTypeName")}
                <input
                  value={rootName}
                  onChange={(event) => setRootName(event.target.value || "Root")}
                  className="h-9 w-32 rounded-md border border-[#d6d6d1] bg-white px-3 font-mono text-[13px] text-[#25282d] outline-none focus:border-[#1261ff]"
                  spellCheck={false}
                />
              </label>
            ) : null}

            {supportsDelimiter(tool) ? (
              <label className="inline-flex items-center gap-2 text-sm text-[#555961]">
                {t("delimiter")}
                <select
                  value={delimiter}
                  onChange={(event) => setDelimiter(event.target.value)}
                  className="h-9 rounded-md border border-[#d6d6d1] bg-white px-2 text-sm text-[#25282d] outline-none focus:border-[#1261ff]"
                >
                  <option value=",">{t("comma")} ,</option>
                  <option value=";">{t("semicolon")} ;</option>
                  <option value={"\t"}>{t("tab")} \t</option>
                  <option value="|">{t("pipe")} |</option>
                </select>
              </label>
            ) : null}

            <IconButton
              icon={ListBulletIcon}
              label={showLineNumbers ? t("hideLineNumbers") : t("showLineNumbers")}
              onClick={() => setShowLineNumbers(!showLineNumbers)}
              active={showLineNumbers}
            />
            <IconButton
              icon={TrashIcon}
              label={t("clear")}
              hint={t("clearTooltip")}
              onClick={() => setInput("")}
            />
          </div>
        </div>

        <div className="grid min-h-[640px] overflow-hidden rounded-lg border border-[#d9d9d5] bg-white lg:grid-cols-2">
          <section className="flex min-h-[420px] min-w-0 flex-col border-b border-[#d9d9d5] lg:border-b-0 lg:border-r">
            <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-[#e2e2de] px-5">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold uppercase tracking-[0.08em] text-[#27292e]">
                  {t("inputLabel")}
                </span>
                <span className="rounded bg-[#f0f0ec] px-2 py-1 text-xs font-medium text-[#666a72]">
                  {tool.inputLabel}
                </span>
              </div>
              <span className="text-xs tabular-nums text-[#8a8d93]">
                {lineCount > 0 ? `${lineCount} ${t("lines")}` : t("ready")}
              </span>
            </div>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="min-h-[360px] flex-1 resize-none overflow-auto border-none bg-white p-5 font-mono text-[13px] leading-6 text-[#25282d] outline-none placeholder:font-sans placeholder:text-[#9a9da3]"
              placeholder={t("pasteInputPlaceholder", {
                format: tool.inputLabel,
                defaultValue: `Paste ${tool.inputLabel} here`,
              })}
              spellCheck={false}
              aria-label={`${tool.inputLabel} ${t("inputLabel")}`}
              style={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}
            />
          </section>

          <section className="flex min-h-[420px] min-w-0 flex-col">
            <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-[#e2e2de] px-5">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold uppercase tracking-[0.08em] text-[#27292e]">
                  {t("outputLabel")}
                </span>
                <span className="rounded bg-[#f0f0ec] px-2 py-1 text-xs font-medium text-[#666a72]">
                  {tool.outputLabel}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!hasOutput}
                  className="inline-flex h-9 items-center gap-2 rounded-md border border-[#d6d6d1] px-3 text-sm font-semibold text-[#3a3d43] transition-colors hover:bg-[#f8f8f5] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <DocumentDuplicateIcon className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{t("copy")}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!hasOutput}
                  className="inline-flex h-9 items-center gap-2 rounded-md bg-[#1261ff] px-3 text-sm font-semibold text-white transition-colors hover:bg-[#064fdc] disabled:cursor-not-allowed disabled:bg-[#b9cdf8]"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{t("download")}</span>
                </button>
              </div>
            </div>

            <div className="min-h-[360px] flex-1 overflow-auto bg-white">
              <OutputPane
                tool={tool}
                output={output}
                error={error}
                showLineNumbers={showLineNumbers}
                emptyHint={t("outputAppearsHere")}
              />
            </div>
          </section>
        </div>

        {tool.notes && tool.notes.length > 0 ? (
          <div className="mt-4 rounded-lg border border-[#e4e4df] bg-[#fbfbf8] px-5 py-4">
            <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[#6f7279]">
              {t("goodToKnow")}
            </h2>
            <ul className="space-y-1.5">
              {tool.notes.map((note, index) => (
                <li key={index} className="flex gap-2 text-sm leading-6 text-[#4c5057]">
                  <span aria-hidden="true" className="font-semibold text-[#1261ff]">
                    →
                  </span>
                  <span>{t(`tools.${tool.id}.notes.${index}`, { defaultValue: note })}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <ToolIntro id={tool.id} />

        <RelatedTools id={tool.id} />
      </div>

      <SiteFooter />

      {message ? (
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
            <AlertDescription className="font-medium">{message}</AlertDescription>
          </Alert>
        </div>
      ) : null}
    </main>
  );
}

interface OutputPaneProps {
  tool: ToolDefinition;
  output: string;
  error: string;
  showLineNumbers: boolean;
  emptyHint: string;
}

function OutputPane({ tool, output, error, showLineNumbers, emptyHint }: OutputPaneProps) {
  if (error) {
    return (
      <div className="flex h-full items-start gap-3 p-5">
        <ExclamationCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#cf3030]" aria-hidden="true" />
        <p className="font-mono text-[13px] leading-6 text-[#a52020]">{error}</p>
      </div>
    );
  }

  if (!output) {
    return <p className="p-5 text-sm text-[#9a9da3]">{emptyHint}</p>;
  }

  // JSON output gets the collapsible tree; generated source is plain text.
  if (tool.outputMode === "json") {
    return <JSONEditor value={output} showLineNumbers={showLineNumbers} readOnly />;
  }

  const lines = output.split("\n");

  return (
    <div className="p-5 font-mono text-[13px] leading-6">
      {showLineNumbers ? (
        <div className="flex items-start">
          <div
            className="mr-4 shrink-0 select-none text-right text-xs text-[#b0b3b9]"
            style={{ minWidth: `${String(lines.length).length + 1}ch` }}
            aria-hidden="true"
          >
            {lines.map((_, index) => (
              <div key={index} className="leading-6">
                {index + 1}
              </div>
            ))}
          </div>
          <pre className="min-w-0 flex-1 whitespace-pre-wrap break-words text-[#25282d]">{output}</pre>
        </div>
      ) : (
        <pre className="whitespace-pre-wrap break-words text-[#25282d]">{output}</pre>
      )}
    </div>
  );
}
