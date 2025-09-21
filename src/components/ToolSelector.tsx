"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const toolOptions = [
  {
    value: "json-formatter",
    translationKey: "jsonFormatter",
    path: "/"
  },
  {
    value: "json-to-typescript",
    translationKey: "jsonToTypeScript",
    path: "/json-to-typescript"
  },
  {
    value: "json-to-java",
    translationKey: "jsonToJava",
    path: "/json-to-java"
  }
];

export default function ToolSelector() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  // 规范化路径，去除结尾斜杠（根路径除外）
  const normalizePath = (p: string | null | undefined) => {
    if (!p || p === "/") return "/";
    return p.replace(/\/+$/, "");
  };

  // 初始状态基于当前路径，避免首次渲染显示第一个选项
  const [selectedValue, setSelectedValue] = useState<string>(() => {
    const currentPath = normalizePath(pathname);
    const tool = toolOptions.find(
      (option) => normalizePath(option.path) === currentPath
    );
    return tool?.value || "json-formatter";
  });
  const [isOpen, setIsOpen] = useState(false);

  // 当路径变化时更新选中值
  useEffect(() => {
    const currentPath = normalizePath(pathname);
    const tool = toolOptions.find(
      (option) => normalizePath(option.path) === currentPath
    );
    // 未匹配到时不进行重置，保持当前选择，避免误回到第一个
    if (tool) {
      setSelectedValue(tool.value);
    }
  }, [pathname]);

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.tool-selector-dropdown')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  const handleToolChange = (value: string) => {
    const selectedToolOption = toolOptions.find(tool => tool.value === value);
    if (selectedToolOption) {
      setSelectedValue(value); // 立即更新状态
      setIsOpen(false); // 关闭下拉框
      if (normalizePath(selectedToolOption.path) !== normalizePath(pathname)) {
        router.push(selectedToolOption.path);
      }
    }
  };

  const currentOption = toolOptions.find(tool => tool.value === selectedValue);

  const getToolLabel = (translationKey: string) => {
    return t(`tools.${translationKey}.label`);
  };

  const getToolDescription = (translationKey: string) => {
    return t(`tools.${translationKey}.description`);
  };

  return (
    <div className="relative tool-selector-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-64 px-3 py-3 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex flex-col items-start">
          <span className="font-medium text-gray-900 dark:text-white text-sm leading-tight">
            {currentOption ? getToolLabel(currentOption.translationKey) : t("selectTool")}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 leading-none">
            {currentOption ? getToolDescription(currentOption.translationKey) : ""}
          </span>
        </div>
        <ChevronDownIcon
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          {toolOptions.map((tool) => (
            <button
              key={tool.value}
              onClick={() => handleToolChange(tool.value)}
              className={`w-full px-3 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-md last:rounded-b-md ${
                selectedValue === tool.value
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              <div className="flex flex-col">
                <span className="font-medium text-sm leading-tight">{getToolLabel(tool.translationKey)}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                  {getToolDescription(tool.translationKey)}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
