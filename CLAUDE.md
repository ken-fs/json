# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 技术栈偏好

### 前端技术栈
- **React 19** - 主要前端框架
- **Next.js 15** - React全栈框架，使用App Router
- **TypeScript** - 首选语言（比JavaScript优先）

### 后端技术栈
- **NestJS** - Node.js后端框架

### 样式技术栈
- **Tailwind CSS 4** - 主要CSS框架，使用PostCSS
- **@heroicons/react** - UI图标库

### 包管理器
- **pnpm** - 首选包管理器
- 避免使用npm或yarn，除非项目明确要求

## 常用命令

### 开发命令
- `pnpm dev` - 启动开发服务器 (使用Turbopack)
- `pnpm build` - 构建项目 (使用Turbopack)  
- `pnpm start` - 启动生产服务器
- `pnpm lint` - 运行ESLint检查

### 依赖管理
- `pnpm install` - 安装依赖
- `pnpm add [package]` - 添加依赖
- `pnpm add -D [package]` - 添加开发依赖

## 项目架构

### 核心应用结构
这是一个JSON工具网站(JSONTools.io)，主要功能包括JSON格式化、验证、转换等。

### 主要组件架构

#### 布局组件
- `Header.tsx` - 顶部导航栏，包含logo、导航菜单、主题切换等控件
- `JSONFormatter.tsx` - 主要的JSON编辑器组件，左右分栏设计

#### JSON编辑器
- **左右分栏布局**：左侧输入原始JSON，右侧实时显示格式化结果
- **JSONEditor.tsx** - 专门的JSON查看器，支持语法高亮、折叠/展开、不同数据类型颜色区分
- **实时验证** - 输入时自动验证JSON格式并显示错误

#### 状态管理
使用Zustand进行状态管理，持久化存储：
```typescript
// src/stores/uiStore.ts
useLanguageStore - 语言切换 ('en' | 'zh')
useThemeStore - 主题切换 ('light' | 'dark')
```

#### 工具函数
`src/lib/utils.ts` 包含核心JSON处理功能：
- `formatJSON()` - JSON格式化
- `minifyJSON()` - JSON压缩
- `validateJSON()` - JSON验证
- `jsonToXML()` - JSON转XML
- `jsonToCSV()` - JSON转CSV

#### 国际化
- `src/lib/i18n.ts` - 国际化系统
- `src/locales/` - 语言文件 (en.json, zh.json)

### UI/UX特点

#### Heroicons图标系统
所有工具栏按钮使用@heroicons/react图标，每个按钮都有tooltip提示：
- 专业矢量图标替代emoji
- 悬停显示详细中文说明
- 统一的设计语言

#### 深色模式支持
- 完整的深色/浅色主题切换
- 使用Tailwind CSS dark: 前缀
- 状态持久化存储

#### 响应式设计
- 左右分栏在大屏幕上显示
- 移动端友好的响应式布局
- Tailwind CSS断点系统

## 代码规范

### 组件风格
- 优先使用函数式组件和Hook
- 使用TypeScript strict模式
- 组件文件使用PascalCase命名

### 导入顺序
```typescript
// React相关
import { useState, useRef } from 'react';
// 工具函数
import { formatJSON } from '@/lib/utils';
// 状态管理
import { useLanguageStore } from '@/stores/uiStore';
// 组件
import JSONEditor from './JSONEditor';
// 图标
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
```

### CSS类名
- 使用Tailwind CSS工具类
- 响应式前缀: `md:`, `lg:`
- 深色模式前缀: `dark:`
- 状态前缀: `hover:`, `focus:`

## 开发注意事项

### Next.js 15特性
- 使用App Router (src/app/目录)
- React 19兼容性
- Turbopack作为构建工具

### 性能优化
- 组件懒加载和代码分割
- Zustand状态持久化
- 图标按需导入

### 错误处理
- JSON解析错误友好提示
- 用户操作反馈系统
- 输入验证和边界情况处理