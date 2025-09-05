'use client';

import { useState, useRef, useEffect } from 'react';
import { formatJSON, validateJSON, minifyJSON, jsonToXML, jsonToCSV } from '@/lib/utils';
import { useLanguageStore } from '@/stores/uiStore';
import JSONEditor from './JSONEditor';

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
    { icon: '💾', text: 'Download', action: () => handleDownload(formattedOutput || input) },
    { icon: '📋', text: 'Copy Output', action: () => handleCopy(formattedOutput) },
    { icon: '📋', text: 'Copy Input', action: () => handleCopy(input) },
    { icon: '🗂', text: 'Compress/Expand', action: handleCompress, active: collapsed },
    { icon: '🗑', text: 'Clear', action: () => { setInput(''); setFormattedOutput(''); } },
    { icon: '🔄', text: 'Format', action: () => setCollapsed(false) },
    { icon: '📊', text: 'Line Numbers', action: () => setShowLineNumbers(!showLineNumbers), active: showLineNumbers },
    { icon: '📄', text: 'To XML', action: handleToXML },
    { icon: '🔒', text: 'Escape Mode', action: () => setEscapeMode(!escapeMode), active: escapeMode },
    { icon: '📝', text: 'Add Example', action: handleAddExample },
    { icon: '⬅', text: 'Undo', action: () => {} },
    { icon: '➡', text: 'Redo', action: () => {} },
    { icon: '❓', text: 'Help', action: () => showMessage('JSON Formatter Help: Paste or type JSON on the left, see formatted result on the right', 'success') }
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
            {rightToolbar.map((tool, index) => (
              <button
                key={index}
                className={`p-2 text-sm rounded transition-colors ${
                  tool.active 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title={tool.text}
                onClick={tool.action}
              >
                {tool.icon}
              </button>
            ))}
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
                <button 
                  onClick={handlePaste}
                  className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  粘贴
                </button>
                <label className="cursor-pointer">
                  <span className="text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                    上传文件
                  </span>
                  <input 
                    type="file" 
                    accept=".json,.txt" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                  />
                </label>
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
                <button 
                  onClick={() => handleCopy(formattedOutput)}
                  disabled={!formattedOutput}
                  className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  复制结果
                </button>
                <button 
                  onClick={() => handleDownload(formattedOutput)}
                  disabled={!formattedOutput || formattedOutput.startsWith('//')}
                  className="text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  下载文件
                </button>
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

      {/* Bottom promotional banner */}
      <div className="bg-red-500 text-white text-center py-2 text-sm">
        <span className="font-medium">🎯 限时优惠：高级域名 .COM 仅需 $12/年</span>
        <span className="mx-4">🔒 免费SSL证书</span>
        <span className="mx-4">🤖 AI驱动的JSON工具套件</span>
        <span className="mx-4">⚡ 专业API访问权限</span>
      </div>
    </div>
  );
}