'use client';

import React, { useState, useEffect, useRef } from 'react';

interface JSONEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  showLineNumbers?: boolean;
}

interface JSONNode {
  key?: string;
  value: any;
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  collapsed?: boolean;
  path: string;
}

export default function JSONEditor({ 
  value, 
  onChange, 
  readOnly = false, 
  showLineNumbers = true 
}: JSONEditorProps) {
  const [parsedData, setParsedData] = useState<any>(null);
  const [collapsedPaths, setCollapsedPaths] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string>('');
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (value.trim()) {
        const parsed = JSON.parse(value);
        setParsedData(parsed);
        setError('');
      } else {
        setParsedData(null);
      }
    } catch (err: any) {
      setError(err.message);
      setParsedData(null);
    }
  }, [value]);

  const toggleCollapse = (path: string) => {
    if (readOnly) return;
    
    const newCollapsed = new Set(collapsedPaths);
    if (newCollapsed.has(path)) {
      newCollapsed.delete(path);
    } else {
      newCollapsed.add(path);
    }
    setCollapsedPaths(newCollapsed);
  };

  const getTypeColor = (type: string) => {
    const colors = {
      string: 'text-green-600 dark:text-green-400',
      number: 'text-blue-600 dark:text-blue-400',
      boolean: 'text-purple-600 dark:text-purple-400',
      null: 'text-gray-500 dark:text-gray-400',
      key: 'text-red-600 dark:text-red-400',
      bracket: 'text-gray-800 dark:text-gray-200',
      comma: 'text-gray-600 dark:text-gray-400'
    };
    return colors[type as keyof typeof colors] || 'text-gray-800 dark:text-gray-200';
  };

  const renderValue = (data: any, path: string = '', level: number = 0, key?: string): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    const indent = '  '.repeat(level);
    const isCollapsed = collapsedPaths.has(path);

    const createLine = (content: React.ReactNode, className = '') => (
      <div className={`flex items-center font-mono text-sm hover:bg-gray-100 dark:hover:bg-gray-700 px-1 py-0.5 rounded ${className}`}>
        <span className="whitespace-pre">{indent}</span>
        {content}
      </div>
    );

    if (data === null) {
      elements.push(
        <div key={path}>
          {createLine(
            <>
              {key && (
                <>
                  <span className={`${getTypeColor('key')} font-semibold`}>"{key}"</span>
                  <span className={getTypeColor('comma')}>: </span>
                </>
              )}
              <span className={getTypeColor('null')}>null</span>
            </>
          )}
        </div>
      );
    } else if (typeof data === 'string') {
      elements.push(
        <div key={path}>
          {createLine(
            <>
              {key && (
                <>
                  <span className={`${getTypeColor('key')} font-semibold`}>"{key}"</span>
                  <span className={getTypeColor('comma')}>: </span>
                </>
              )}
              <span className={getTypeColor('string')}>"{data}"</span>
            </>
          )}
        </div>
      );
    } else if (typeof data === 'number') {
      elements.push(
        <div key={path}>
          {createLine(
            <>
              {key && (
                <>
                  <span className={`${getTypeColor('key')} font-semibold`}>"{key}"</span>
                  <span className={getTypeColor('comma')}>: </span>
                </>
              )}
              <span className={getTypeColor('number')}>{data}</span>
            </>
          )}
        </div>
      );
    } else if (typeof data === 'boolean') {
      elements.push(
        <div key={path}>
          {createLine(
            <>
              {key && (
                <>
                  <span className={`${getTypeColor('key')} font-semibold`}>"{key}"</span>
                  <span className={getTypeColor('comma')}>: </span>
                </>
              )}
              <span className={getTypeColor('boolean')}>{data.toString()}</span>
            </>
          )}
        </div>
      );
    } else if (Array.isArray(data)) {
      const currentPath = path;
      const hasItems = data.length > 0;
      
      // Array opening bracket with collapse button
      elements.push(
        <div key={`${path}_open`}>
          {createLine(
            <>
              {key && (
                <>
                  <span className={`${getTypeColor('key')} font-semibold`}>"{key}"</span>
                  <span className={getTypeColor('comma')}>: </span>
                </>
              )}
              {hasItems && !readOnly && (
                <button
                  onClick={() => toggleCollapse(currentPath)}
                  className="mr-1 w-4 h-4 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                >
                  {isCollapsed ? '▶' : '▼'}
                </button>
              )}
              <span className={getTypeColor('bracket')}>[</span>
              {isCollapsed && hasItems && (
                <span className="text-gray-500 ml-1">... {data.length} items</span>
              )}
              {(isCollapsed || !hasItems) && (
                <span className={getTypeColor('bracket')}>]</span>
              )}
            </>
          )}
        </div>
      );

      // Array items (if not collapsed)
      if (!isCollapsed && hasItems) {
        data.forEach((item, index) => {
          const itemPath = `${currentPath}[${index}]`;
          elements.push(...renderValue(item, itemPath, level + 1));
          
          // Add comma except for last item
          if (index < data.length - 1) {
            elements.push(
              <div key={`${itemPath}_comma`} className="flex items-center font-mono text-sm hover:bg-gray-100 dark:hover:bg-gray-700 px-1 py-0.5 rounded">
                <span className="whitespace-pre">{'  '.repeat(level + 1)}</span>
                <span className={getTypeColor('comma')}>,</span>
              </div>
            );
          }
        });

        // Array closing bracket
        elements.push(
          <div key={`${path}_close`}>
            {createLine(<span className={getTypeColor('bracket')}>]</span>)}
          </div>
        );
      }
    } else if (typeof data === 'object' && data !== null) {
      const currentPath = path;
      const keys = Object.keys(data);
      const hasKeys = keys.length > 0;
      
      // Object opening brace with collapse button
      elements.push(
        <div key={`${path}_open`}>
          {createLine(
            <>
              {key && (
                <>
                  <span className={`${getTypeColor('key')} font-semibold`}>"{key}"</span>
                  <span className={getTypeColor('comma')}>: </span>
                </>
              )}
              {hasKeys && !readOnly && (
                <button
                  onClick={() => toggleCollapse(currentPath)}
                  className="mr-1 w-4 h-4 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                >
                  {isCollapsed ? '▶' : '▼'}
                </button>
              )}
              <span className={getTypeColor('bracket')}>{'{'}</span>
              {isCollapsed && hasKeys && (
                <span className="text-gray-500 ml-1">... {keys.length} keys</span>
              )}
              {(isCollapsed || !hasKeys) && (
                <span className={getTypeColor('bracket')}>{'}'}</span>
              )}
            </>
          )}
        </div>
      );

      // Object properties (if not collapsed)
      if (!isCollapsed && hasKeys) {
        keys.forEach((objKey, index) => {
          const keyPath = `${currentPath}.${objKey}`;
          elements.push(...renderValue(data[objKey], keyPath, level + 1, objKey));
          
          // Add comma except for last property
          if (index < keys.length - 1) {
            elements.push(
              <div key={`${keyPath}_comma`} className="flex items-center font-mono text-sm hover:bg-gray-100 dark:hover:bg-gray-700 px-1 py-0.5 rounded">
                <span className="whitespace-pre">{'  '.repeat(level + 1)}</span>
                <span className={getTypeColor('comma')}>,</span>
              </div>
            );
          }
        });

        // Object closing brace
        elements.push(
          <div key={`${path}_close`}>
            {createLine(<span className={getTypeColor('bracket')}>{'}'}</span>)}
          </div>
        );
      }
    }

    return elements;
  };

  if (error) {
    return (
      <div className="p-4 text-red-600 dark:text-red-400 font-mono text-sm bg-red-50 dark:bg-red-900/10 rounded">
        JSON Parse Error: {error}
      </div>
    );
  }

  if (!parsedData && !value.trim()) {
    return (
      <div className="p-4 text-gray-500 italic text-sm">
        格式化后的JSON数据将在这里显示...
      </div>
    );
  }

  return (
    <div 
      ref={editorRef}
      className="p-4 font-mono text-sm overflow-auto h-full bg-transparent"
      style={{ minHeight: '200px' }}
    >
      <div className="space-y-0">
        {parsedData && renderValue(parsedData)}
      </div>
    </div>
  );
}