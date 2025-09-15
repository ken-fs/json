"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { jsonToJava } from "@/lib/utils";
import Header from "@/components/Header";
import ToolSelector from "@/components/ToolSelector";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowDownTrayIcon,
  ClipboardDocumentIcon,
  ClipboardIcon,
  TrashIcon,
  DocumentTextIcon,
  FolderOpenIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export default function JsonToJavaPage() {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [className] = useState("RootObject");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  };

  // Convert function is handled by useEffect for real-time conversion

  // 监听输入和类名变化，实时转换
  useEffect(() => {
    if (input.trim()) {
      try {
        const result = jsonToJava(input, className);
        setOutput(result);
      } catch {
        // 忽略实时转换错误，用户输入可能不完整
        setOutput("");
      }
    } else {
      setOutput("");
    }
  }, [input, className]);

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      showMessage(t("copiedToClipboard"), "success");
    } catch {
      showMessage(t("copyFailed"), "error");
    }
  };

  const handleDownload = (content: string, filename: string = "Classes.java") => {
    const blob = new Blob([content], { type: "text/plain" });
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

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      showMessage(t("pasteSuccess"), "success");
    } catch {
      showMessage(t("pasteFailed"), "error");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInput(content);
        showMessage(t("fileUploaded"), "success");
      };
      reader.readAsText(file);
    }
  };

  const handleAddExample = () => {
    const example = {
      name: "John Doe",
      age: 30,
      isActive: true,
      address: {
        street: "123 Main St",
        city: "New York",
        zipCode: "10001",
      },
      hobbies: ["reading", "coding", "traveling"],
      contact: {
        email: "john@example.com",
        phone: "123-456-7890",
      },
    };
    setInput(JSON.stringify(example, null, 2));
    showMessage(t("exampleAdded"), "success");
  };

  // 处理输入变化
  const handleInputChange = (value: string) => {
    setInput(value);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
      <Header />

      <div className="flex-1 bg-gray-50 dark:bg-gray-900 relative">
        {/* Toolbar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Left toolbar - Tool Selector */}
            <ToolSelector />

          </div>
        </div>

        {/* Main content area - Split panes */}
        <div className="h-[calc(100vh-178px)] p-4">
          <div className="h-full flex gap-4 min-w-0">
            {/* Left pane - Input area */}
            <div className="flex-4 min-w-0 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 h-[60px]">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("jsonInput")}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePaste}
                    className="flex items-center space-x-1 text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    <ClipboardIcon className="w-3 h-3" />
                    <span>{t("pasteData")}</span>
                  </button>
                  <label className="cursor-pointer">
                    <span className="flex items-center space-x-1 text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                      <FolderOpenIcon className="w-3 h-3" />
                      <span>{t("uploadFile")}</span>
                    </span>
                    <input
                      type="file"
                      accept=".json,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={handleAddExample}
                    className="flex items-center space-x-1 text-xs px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                  >
                    <DocumentTextIcon className="w-3 h-3" />
                    <span>{t("addExample")}</span>
                  </button>
                </div>
              </div>

              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-full h-[calc(100%-64px)] p-4 border-none outline-none font-mono text-sm bg-transparent text-gray-900 dark:text-white resize-none overflow-auto"
                placeholder={t("enterJsonData")}
                spellCheck={false}
              />
            </div>

            {/* Right pane - Output area */}
            <div className="flex-5 min-w-0 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 h-[60px]">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("javaClasses")}
                  </span>
                  {output && (
                    <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 px-2 py-1 rounded">
                      {t("generatedSuccess")}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setInput("")}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    title={t("clearAll")}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                  <button
                    onClick={() => handleCopy(output)}
                    disabled={!output}
                    className="flex items-center space-x-1 text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    <ClipboardDocumentIcon className="w-3 h-3" />
                    <span>{t("copyCode")}</span>
                  </button>
                  <button
                    onClick={() => handleDownload(output, `${className}.java`)}
                    disabled={!output}
                    className="flex items-center space-x-1 text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    <ArrowDownTrayIcon className="w-3 h-3" />
                    <span>{t("downloadFile")}</span>
                  </button>
                </div>
              </div>

              <div className="h-[calc(100%-64px)] p-4 font-mono text-sm overflow-auto bg-transparent">
                <pre className="whitespace-pre-wrap text-gray-900 dark:text-white">
                  {output || t("classesPlaceholder")}
                </pre>
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
    </div>
  );
}