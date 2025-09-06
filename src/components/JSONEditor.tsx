'use client';

import React, { useState, useEffect, useRef } from 'react';

interface JSONEditorProps {
  value: string;
  readOnly?: boolean;
  showLineNumbers?: boolean;
}

export default function JSONEditor({ 
  value, 
  readOnly = false, 
  showLineNumbers = true 
}: JSONEditorProps) {
  const [parsedData, setParsedData] = useState<unknown>(null);
  const [collapsedPaths, setCollapsedPaths] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string>('');
  const editorRef = useRef<HTMLDivElement>(null);
  const lineNumberRef = useRef<{ current: number }>({ current: 1 });

  useEffect(() => {
    try {
      if (value.trim()) {
        const parsed = JSON.parse(value);
        setParsedData(parsed);
        setError('');
      } else {
        setParsedData(null);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
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

  const renderValue = (data: unknown, path: string = '', level: number = 0, key?: string, isLastItem: boolean = false): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    const indent = '  '.repeat(level);
    const isCollapsed = collapsedPaths.has(path);

    const createLine = (content: React.ReactNode, showComma: boolean = false) => {
      const lineNumber = showLineNumbers ? lineNumberRef.current.current++ : undefined;
      return (
        <div className="flex items-start font-mono text-sm hover:bg-gray-100 dark:hover:bg-gray-700 px-1 py-0.5 rounded">
          {showLineNumbers && lineNumber !== undefined && (
            <span className="text-gray-400 dark:text-gray-500 text-xs mr-2 select-none" style={{minWidth: '3ch', textAlign: 'right'}}>
              {lineNumber}
            </span>
          )}
          <div className="flex-1">
            <span className="whitespace-pre">{indent}</span>
            {content}
            {showComma && <span className={getTypeColor('comma')}>,</span>}
          </div>
        </div>
      );
    };

    if (data === null) {
      elements.push(
        <div key={path}>
          {createLine(
            <>
              {key && (
                <>
                  <span className={`${getTypeColor('key')} font-semibold`}>&quot;{key}&quot;</span>
                  <span className={getTypeColor('comma')}>: </span>
                </>
              )}
              <span className={getTypeColor('null')}>null</span>
            </>,
            !isLastItem
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
                  <span className={`${getTypeColor('key')} font-semibold`}>&quot;{key}&quot;</span>
                  <span className={getTypeColor('comma')}>: </span>
                </>
              )}
              <span className={getTypeColor('string')}>&quot;{data}&quot;</span>
            </>,
            !isLastItem
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
                  <span className={`${getTypeColor('key')} font-semibold`}>&quot;{key}&quot;</span>
                  <span className={getTypeColor('comma')}>: </span>
                </>
              )}
              <span className={getTypeColor('number')}>{data}</span>
            </>,
            !isLastItem
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
                  <span className={`${getTypeColor('key')} font-semibold`}>&quot;{key}&quot;</span>
                  <span className={getTypeColor('comma')}>: </span>
                </>
              )}
              <span className={getTypeColor('boolean')}>{data.toString()}</span>
            </>,
            !isLastItem
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
                  <span className={`${getTypeColor('key')} font-semibold`}>&quot;{key}&quot;</span>
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
            </>,
            (isCollapsed || !hasItems) ? !isLastItem : false
          )}
        </div>
      );

      // Array items (if not collapsed)
      if (!isCollapsed && hasItems) {
        data.forEach((item, index) => {
          const itemPath = `${currentPath}[${index}]`;
          const isLastArrayItem = index === data.length - 1;
          elements.push(...renderValue(item, itemPath, level + 1, undefined, isLastArrayItem));
        });

        // Array closing bracket
        elements.push(
          <div key={`${path}_close`}>
            {createLine(<span className={getTypeColor('bracket')}>]</span>, !isLastItem)}
          </div>
        );
      }
    } else if (typeof data === 'object' && data !== null) {
      const currentPath = path;
      const keys = Object.keys(data as Record<string, unknown>);
      const hasKeys = keys.length > 0;
      
      // Object opening brace with collapse button
      elements.push(
        <div key={`${path}_open`}>
          {createLine(
            <>
              {key && (
                <>
                  <span className={`${getTypeColor('key')} font-semibold`}>&quot;{key}&quot;</span>
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
            </>,
            (isCollapsed || !hasKeys) ? !isLastItem : false
          )}
        </div>
      );

      // Object properties (if not collapsed)
      if (!isCollapsed && hasKeys) {
        keys.forEach((objKey, index) => {
          const keyPath = `${currentPath}.${objKey}`;
          const isLastObjectProperty = index === keys.length - 1;
          const objData = data as Record<string, unknown>;
          elements.push(...renderValue(objData[objKey], keyPath, level + 1, objKey, isLastObjectProperty));
        });

        // Object closing brace
        elements.push(
          <div key={`${path}_close`}>
            {createLine(<span className={getTypeColor('bracket')}>{'}'}</span>, !isLastItem)}
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

  // Reset line number counter before rendering
  lineNumberRef.current.current = 1;

  return (
    <div 
      ref={editorRef}
      className="p-4 font-mono text-sm overflow-auto h-full bg-transparent"
      style={{ minHeight: '200px' }}
    >
      <div className="space-y-0">
        {parsedData && renderValue(parsedData, '', 0, undefined, true)}
      </div>
    </div>
  );
}