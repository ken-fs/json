'use client';

import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [collapsedPaths, setCollapsedPaths] = useState<Set<string>>(new Set());
  const editorRef = useRef<HTMLDivElement>(null);

  /**
   * 行号计数器。
   *
   * 原来是一个 useRef，在渲染期读写（`lineNumberRef.current.current++`），并在
   * return 之前重置回 1 —— 渲染期读写 ref 会在 StrictMode 双渲染或并发渲染下
   * 算出重复/跳号的行号。它本质上只是一次渲染内的局部计数，不需要跨渲染留存，
   * 所以就用局部变量。
   */
  const lineCounter = { next: 1 };

  // `value` 是唯一输入，所以解析结果在渲染期算即可，不需要 state + effect。
  //
  // 原来的 effect 版本还有个 bug：输入清空时只重置了 parsedData，没有清 error，
  // 于是报错文案会留在屏幕上 —— 组件同时处于「没有数据」和「有错误」两种状态。
  // 一次性计算两个值就不可能不同步。
  const { parsedData, error } = useMemo(() => {
    if (!value.trim()) return { parsedData: null, error: '' };
    try {
      return { parsedData: JSON.parse(value) as unknown, error: '' };
    } catch (err: unknown) {
      return {
        parsedData: null,
        error: err instanceof Error ? err.message : 'Unknown error',
      };
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

  const renderValue = (data: unknown, path: string = '', level: number = 0, key?: string, isLastItem: boolean = false): React.ReactElement[] => {
    const elements: React.ReactElement[] = [];
    const indent = '  '.repeat(level);
    const isCollapsed = collapsedPaths.has(path);

    const createLine = (content: React.ReactNode, showComma: boolean = false) => {
      const lineNumber = showLineNumbers ? lineCounter.next++ : undefined;
      return (
        <div className="flex items-start font-mono text-sm hover:bg-gray-100 dark:hover:bg-gray-700 px-1 py-0.5 rounded min-w-0">
          {showLineNumbers && lineNumber !== undefined && (
            <span className="text-gray-400 dark:text-gray-500 text-xs mr-2 select-none flex-shrink-0" style={{minWidth: '3ch', textAlign: 'right'}}>
              {lineNumber}
            </span>
          )}
          <div className="flex-1 min-w-0 overflow-hidden">
            <span className="whitespace-pre">{indent}</span>
            <span style={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }}>{content}</span>
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
              <span className={`${getTypeColor('string')} break-all`}>&quot;{data}&quot;</span>
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
                <span className="text-gray-500 ml-1">... {data.length} {t('items')}</span>
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
                <span className="text-gray-500 ml-1">... {keys.length} {t('keys')}</span>
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
        {t('jsonParseErrorShort')}: {error}
      </div>
    );
  }

  if (!parsedData && !value.trim()) {
    return (
      <div className="p-4 text-gray-500 italic text-sm">
        {t('formattedJsonDisplay')}
      </div>
    );
  }

  return (
    <div 
      ref={editorRef}
      className="p-4 font-mono text-sm overflow-auto h-full bg-transparent min-w-0"
      style={{ minHeight: '200px' }}
    >
      <div className="space-y-0 min-w-0">
        {parsedData ? renderValue(parsedData, '', 0, undefined, true).map((element, index) => (
          <React.Fragment key={index}>{element}</React.Fragment>
        )) : null}
      </div>
    </div>
  );
}