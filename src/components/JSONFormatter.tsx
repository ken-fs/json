"use client";

import { useState, useRef, useEffect } from "react";
import { jsonToXML } from "@/lib/utils";
// import { useLanguageStore } from "@/stores/uiStore";
import JSONEditor from "./JSONEditor";
import { Alert, AlertDescription } from "./ui/alert";
import {
  ArrowDownTrayIcon,
  ClipboardDocumentIcon,
  ClipboardIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  TrashIcon,
  ArrowPathIcon,
  ListBulletIcon,
  DocumentIcon,
  LockClosedIcon,
  DocumentTextIcon,
  FolderOpenIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [formattedOutput, setFormattedOutput] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [escapeMode, setEscapeMode] = useState(false);
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

    // 如果有手动设置的输出，使用它
    if (overrideOutput) {
      setFormattedOutput(overrideOutput);
      return;
    }

    // 否则进行自动格式化
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setFormattedOutput(formatted);
      setCollapsed(false);
      setMessage("");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setFormattedOutput(`// JSON Parse Error: ${errorMessage}`);
      setCollapsed(false);
    }
  }, [input, overrideOutput]);

  // 工具栏功能函数
  const handleCompress = () => {
    if (!formattedOutput || formattedOutput.startsWith('//')) {
      showMessage("Please enter valid JSON data first", "error");
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
        showMessage("Expanded JSON", "success");
      } else {
        // 压缩：压缩为单行 JSON
        const compressed = JSON.stringify(parsed);
        setOverrideOutput(compressed); // useEffect会自动设置formattedOutput
        setCollapsed(true);
        showMessage("Compressed JSON", "success");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      showMessage(`Compress failed: ${errorMessage}`, "error");
    }
  };


  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      showMessage("Copied to clipboard", "success");
    } catch {
      showMessage("Copy failed", "error");
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
    showMessage("File downloaded", "success");
  };

  const handleToXML = () => {
    try {
      if (!input.trim()) {
        showMessage("Please enter JSON data first", "error");
        return;
      }
      const xml = jsonToXML(input);
      // 格式化 XML 输出，添加适当的缩进
      const formattedXml = formatXML(xml);
      setFormattedOutput(formattedXml);
      showMessage("Converted to XML", "success");
    } catch (error: unknown) {
      showMessage(`XML conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`, "error");
    }
  };

  // XML 格式化辅助函数
  const formatXML = (xml: string): string => {
    let formatted = '';
    let indent = 0;
    const tab = '  ';
    
    xml.split(/(<[^>]*>)/g).forEach(node => {
      if (node.match(/^<\/?\w/)) {
        if (node.match(/^<\//)) {
          indent--;
        }
        formatted += tab.repeat(indent) + node + '\n';
        if (node.match(/^<\w/) && !node.match(/\/>$/)) {
          indent++;
        }
      } else if (node.trim()) {
        formatted += tab.repeat(indent) + node.trim() + '\n';
      }
    });
    
    return formatted.trim();
  };

  const handleEscapeMode = () => {
    if (!input.trim()) {
      showMessage("Please enter JSON data first", "error");
      return;
    }

    try {
      if (escapeMode) {
        // 关闭转义模式：将转义的 JSON 字符串解析为普通 JSON
        const unescaped = JSON.parse(input);
        const formatted = JSON.stringify(unescaped, null, 2);
        setInput(formatted);
        setEscapeMode(false);
        showMessage("Escape mode disabled", "success");
      } else {
        // 开启转义模式：将 JSON 转换为转义的字符串格式
        const parsed = JSON.parse(input);
        const jsonString = JSON.stringify(parsed);
        const escaped = JSON.stringify(jsonString, null, 2);
        setInput(escaped);
        setEscapeMode(true);
        showMessage("Escape mode enabled", "success");
      }
    } catch (error: unknown) {
      showMessage(`Escape mode failed: ${error instanceof Error ? error.message : 'Unknown error'}`, "error");
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
    showMessage("Example JSON added", "success");
  };

  const toolCategories = [
    {
      name: "JSON Tools",
      icon: "🛠",
      active: true,
    },
    // {
    //   name: 'Formatter',
    //   icon: '📝'
    // },
    // {
    //   name: 'Online Run',
    //   icon: '▶'
    // },
    // {
    //   name: 'Common Tools',
    //   icon: '🔧'
    // },
    // {
    //   name: 'Image Tools',
    //   icon: '🖼'
    // },
    // {
    //   name: 'Network Tools',
    //   icon: '🌐'
    // },
    // {
    //   name: 'Text Tools',
    //   icon: '📄'
    // },
    // {
    //   name: 'Encode & Encrypt',
    //   icon: '🔒'
    // },
    // {
    //   name: 'App Store',
    //   icon: '🏪'
    // }
  ];

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
      icon: ClipboardIcon,
      text: "Copy Input",
      tooltip: "复制原始输入内容",
      action: () => handleCopy(input),
    },
    {
      icon: collapsed ? ChevronRightIcon : ChevronDownIcon,
      text: "Compress/Expand",
      tooltip: collapsed ? "展开JSON结构" : "压缩JSON结构",
      action: handleCompress,
      active: collapsed,
    },
    {
      icon: TrashIcon,
      text: "Clear",
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
      text: "Line Numbers",
      tooltip: showLineNumbers ? "隐藏行号" : "显示行号",
      action: () => setShowLineNumbers(!showLineNumbers),
      active: showLineNumbers,
    },
    {
      icon: DocumentIcon,
      text: "To XML",
      tooltip: "将JSON转换为XML格式",
      action: handleToXML,
    },
    {
      icon: LockClosedIcon,
      text: "Escape Mode",
      tooltip: escapeMode ? "关闭转义模式" : "开启转义模式",
      action: handleEscapeMode,
      active: escapeMode,
    },
    {
      icon: DocumentTextIcon,
      text: "Add Example",
      tooltip: "添加示例JSON数据",
      action: handleAddExample,
    },
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


  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900 relative">
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Left toolbar - Tool Categories */}
          <div className="flex items-center space-x-1">
            {toolCategories.map((tool, index) => (
              <button
                key={index}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  tool.active
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className="mr-1">{tool.icon}</span>
                {tool.name}
              </button>
            ))}
          </div>

          {/* Right toolbar - Action buttons */}
        </div>
      </div>

      {/* Main content area - Split panes */}
      <div className="h-[calc(100vh-178px)] p-4">
        <div className="h-full flex gap-4">
          {/* Left pane - Input area */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 h-[88px]">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  输入JSON数据
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative group">
                  <button
                    onClick={handlePaste}
                    className="flex items-center space-x-1 text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    <ClipboardIcon className="w-3 h-3" />
                    <span>粘贴</span>
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    从剪贴板粘贴JSON数据
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
                <div className="relative group">
                  <label className="cursor-pointer">
                    <span className="flex items-center space-x-1 text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                      <FolderOpenIcon className="w-3 h-3" />
                      <span>上传文件</span>
                    </span>
                    <input
                      type="file"
                      accept=".json,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    上传本地JSON文件
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
              </div>
            </div>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-[calc(100%-50px)] p-4 border-none outline-none font-mono text-sm bg-transparent text-gray-900 dark:text-white resize-none"
              placeholder="请输入JSON数据..."
              spellCheck={false}
            />
          </div>

          {/* Right pane - JSON Viewer with syntax highlighting */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 h-[88px]">
              <div className="flex items-center space-x-2">
                {/* <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  格式化结果
                </span> */}
                {formattedOutput && !formattedOutput.startsWith("//") && (
                  <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 px-2 py-1 rounded">
                    ✓ 有效
                  </span>
                )}
                {formattedOutput.startsWith("//") && (
                  <span className="text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 px-2 py-1 rounded">
                    ✗ 错误
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1">
                {/* 工具栏图标按钮 */}
                {rightToolbar.map((tool, index) => {
                  const IconComponent = tool.icon;
                  return (
                    <div key={index} className="relative group">
                      <button
                        className={`p-2 text-sm rounded transition-colors ${
                          tool.active
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                        onClick={tool.action}
                      >
                        <IconComponent className="w-4 h-4" />
                      </button>

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        {tool.tooltip}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </div>
                  );
                })}

                {/* 分隔线 */}
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>

                {/* 复制结果按钮 */}
                <div className="relative group">
                  <button
                    onClick={() => handleCopy(formattedOutput)}
                    disabled={!formattedOutput}
                    className="flex items-center space-x-1 text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    <ClipboardDocumentIcon className="w-3 h-3" />
                    <span>copy</span>
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    复制格式化后的JSON到剪贴板
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>

                {/* 下载文件按钮 */}
                <div className="relative group">
                  <button
                    onClick={() => handleDownload(formattedOutput)}
                    disabled={
                      !formattedOutput || formattedOutput.startsWith("//")
                    }
                    className="flex items-center space-x-1 text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    <ArrowDownTrayIcon className="w-3 h-3" />
                    <span>download</span>
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    将JSON文件下载到本地
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[calc(100%-188px)] border-radius-lg dark:bg-gray-900">
              {collapsed && formattedOutput && !formattedOutput.startsWith('//') ? (
                // 压缩模式：显示原始文本
                <div className="p-4 font-mono text-sm overflow-auto h-full bg-transparent">
                  {showLineNumbers && (
                    <div className="flex items-start">
                      <span className="text-gray-400 dark:text-gray-500 text-xs mr-2 select-none" style={{minWidth: '3ch', textAlign: 'right'}}>
                        1
                      </span>
                      <div className="flex-1">
                        <pre className="whitespace-pre-wrap break-all text-gray-900 dark:text-white">
                          {formattedOutput}
                        </pre>
                      </div>
                    </div>
                  )}
                  {!showLineNumbers && (
                    <pre className="whitespace-pre-wrap break-all text-gray-900 dark:text-white">
                      {formattedOutput}
                    </pre>
                  )}
                </div>
              ) : (
                // 展开模式：使用JSONEditor
                <JSONEditor
                  value={formattedOutput}
                  showLineNumbers={showLineNumbers}
                  readOnly={false}
                />
              )}
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
