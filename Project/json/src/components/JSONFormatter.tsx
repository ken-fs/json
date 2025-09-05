'use client';

import { useState, useRef, useEffect } from 'react';
import { formatJSON, validateJSON, minifyJSON, jsonToXML, jsonToCSV } from '@/lib/utils';
import { useLanguageStore } from '@/stores/uiStore';
import JSONEditor from './JSONEditor';
import {
  ArrowDownTrayIcon,
  ClipboardDocumentIcon,
  ClipboardIcon,
  ChevronDownIcon,
  TrashIcon,
  ArrowPathIcon,
  ListBulletIcon,
  DocumentIcon,
  LockClosedIcon,
  DocumentTextIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  QuestionMarkCircleIcon,
  FolderOpenIcon
} from '@heroicons/react/24/outline';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [formattedOutput, setFormattedOutput] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [escapeMode, setEscapeMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const { language } = useLanguageStore();

  const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  // 实时格式化JSON
  useEffect(() => {
    if (!input.trim()) {
      setFormattedOutput('');
      return;
    }
    
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, collapsed ? 0 : 2);
      setFormattedOutput(formatted);
      setMessage('');
    } catch (error: any) {
      setFormattedOutput(`// JSON Parse Error: ${error.message}`);
    }
  }, [input, collapsed]);

  // 工具栏功能函数
  const handleCompress = () => {
    setCollapsed(!collapsed);
    showMessage(collapsed ? 'Expanded JSON' : 'Compressed JSON', 'success');
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      showMessage('Copied to clipboard', 'success');
    } catch (error) {
      showMessage('Copy failed', 'error');
    }
  };

  const handleDownload = (content: string, filename: string = 'data.json') => {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showMessage('File downloaded', 'success');
  };

  const handleToXML = () => {
    try {
      if (!input.trim()) {
        showMessage('Please enter JSON data first', 'error');
        return;
      }
      const xml = jsonToXML(input);
      setFormattedOutput(xml);
      showMessage('Converted to XML', 'success');
    } catch (error: any) {
      showMessage(`XML conversion failed: ${error.message}`, 'error');
    }
  };

  const handleAddExample = () => {
    const example = {
      "name": "John Doe",
      "age": 30,
      "city": "New York",
      "hobbies": ["reading", "coding", "traveling"],
      "address": {
        "street": "123 Main St",
        "zipCode": "10001"
      }
    };
    setInput(JSON.stringify(example, null, 2));
    showMessage('Example JSON added', 'success');
  };

  const toolCategories = [
    {
      name: 'JSON Tools',
      icon: '🛠',
      active: true
    },
    {
      name: 'Formatter',
      icon: '📝'
    },
    {
      name: 'Online Run',
      icon: '▶'
    },
    {
      name: 'Common Tools',
      icon: '🔧'
    },
    {
      name: 'Image Tools',
      icon: '🖼'
    },
    {
      name: 'Network Tools',
      icon: '🌐'
    },
    {
      name: 'Text Tools',
      icon: '📄'
    },
    {
      name: 'Encode & Encrypt',
      icon: '🔒'
    },
    {
      name: 'App Store',
      icon: '🏪'
    }
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
      text: 'Copy Input', 
      tooltip: '复制原始输入内容',
      action: () => handleCopy(input) 
    },
    { 
      icon: ChevronDownIcon, 
      text: 'Compress/Expand', 
      tooltip: collapsed ? '展开JSON结构' : '压缩JSON结构',
      action: handleCompress, 
      active: collapsed 
    },
    { 
      icon: TrashIcon, 
      text: 'Clear', 
      tooltip: '清空所有内容',
      action: () => { setInput(''); setFormattedOutput(''); } 
    },
    { 
      icon: ArrowPathIcon, 
      text: 'Format', 
      tooltip: '重新格式化JSON',
      action: () => setCollapsed(false) 
    },
    { 
      icon: ListBulletIcon, 
      text: 'Line Numbers', 
      tooltip: showLineNumbers ? '隐藏行号' : '显示行号',
      action: () => setShowLineNumbers(!showLineNumbers), 
      active: showLineNumbers 
    },
    { 
      icon: DocumentIcon, 
      text: 'To XML', 
      tooltip: '将JSON转换为XML格式',
      action: handleToXML 
    },
    { 
      icon: LockClosedIcon, 
      text: 'Escape Mode', 
      tooltip: escapeMode ? '关闭转义模式' : '开启转义模式',
      action: () => setEscapeMode(!escapeMode), 
      active: escapeMode 
    },
    { 
      icon: DocumentTextIcon, 
      text: 'Add Example', 
      tooltip: '添加示例JSON数据',
      action: handleAddExample 
    },
    { 
      icon: ArrowUturnLeftIcon, 
      text: 'Undo', 
      tooltip: '撤销操作',
      action: () => {} 
    },
    { 
      icon: ArrowUturnRightIcon, 
      text: 'Redo', 
      tooltip: '重做操作',
      action: () => {} 
    },
    { 
      icon: QuestionMarkCircleIcon, 
      text: 'Help', 
      tooltip: '查看使用帮助',
      action: () => showMessage('JSON Formatter Help: Paste or type JSON on the left, see formatted result on the right', 'success') 
    }
  ];

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch (error) {
      showMessage('Paste failed', 'error');
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

  const renderWithLineNumbers = (content: string) => {
    if (!showLineNumbers) return content;
    
    const lines = content.split('\n');
    return lines.map((line, index) => 
      `${String(index + 1).padStart(3, ' ')} | ${line}`
    ).join('\n');
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900">
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
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-1">{tool.icon}</span>
                {tool.name}
              </button>
            ))}
          </div>

          {/* Right toolbar - Action buttons */}
          <div className="flex items-center space-x-1">
            {rightToolbar.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <div key={index} className="relative group">
                  <button
                    className={`p-2 text-sm rounded transition-colors ${
                      tool.active 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={tool.action}
                  >
                    <IconComponent className="w-5 h-5" />
                  </button>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {tool.tooltip}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content area - Split panes */}
      <div className="h-[calc(100vh-140px)] p-4">
        <div className="h-full flex gap-4">
          
          {/* Left pane - Input area */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">输入JSON数据</span>
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
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">格式化结果</span>
                {formattedOutput && !formattedOutput.startsWith('//') && (
                  <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 px-2 py-1 rounded">
                    ✓ 有效JSON
                  </span>
                )}
                {formattedOutput.startsWith('//') && (
                  <span className="text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 px-2 py-1 rounded">
                    ✗ 解析错误
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative group">
                  <button 
                    onClick={() => handleCopy(formattedOutput)}
                    disabled={!formattedOutput}
                    className="flex items-center space-x-1 text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    <ClipboardDocumentIcon className="w-3 h-3" />
                    <span>复制结果</span>
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    复制格式化后的JSON到剪贴板
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
                <div className="relative group">
                  <button 
                    onClick={() => handleDownload(formattedOutput)}
                    disabled={!formattedOutput || formattedOutput.startsWith('//')}
                    className="flex items-center space-x-1 text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    <ArrowDownTrayIcon className="w-3 h-3" />
                    <span>下载文件</span>
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    将JSON文件下载到本地
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-[calc(100%-50px)] bg-gray-50 dark:bg-gray-900">
              <JSONEditor
                value={formattedOutput}
                showLineNumbers={showLineNumbers}
                readOnly={false}
                onChange={(newValue) => {
                  setFormattedOutput(newValue);
                  // 当右侧编辑时，也更新左侧输入
                  try {
                    const parsed = JSON.parse(newValue);
                    const formatted = JSON.stringify(parsed, null, 2);
                    setInput(formatted);
                  } catch (error) {
                    // 如果解析失败，不更新左侧
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Status message */}
        {message && (
          <div className={`mt-2 p-3 rounded-lg text-sm ${
            messageType === 'success' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}