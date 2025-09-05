# Claude Code 全局配置

## 技术栈偏好

### 前端技术栈
- **React** - 主要前端框架
- **Next.js** - React全栈框架，用于SSR/SSG
- **Vue.js** - 替代前端框架选择
- **TypeScript** - 首选语言（比JavaScript优先）

### 后端技术栈
- **NestJS** - Node.js后端框架

### 样式技术栈
- **Tailwind CSS** - 主要CSS框架
- **shadcn/ui** - UI组件库

### 包管理器
- **pnpm** - 首选包管理器
- 避免使用npm或yarn，除非项目明确要求

## 编程风格偏好

### 函数式编程
- 优先使用函数式组件
- 优先使用Hook而非Class组件
- 优先使用纯函数和不可变数据
- 使用Array方法如map、filter、reduce等
- 避免副作用，使用useEffect合理管理

### 代码风格
- 使用const/let，避免var
- 优先使用箭头函数
- 使用解构赋值
- 使用模板字符串
- 使用async/await而非Promise.then

### TypeScript规范
- 严格类型检查
- 使用interface定义对象类型
- 使用泛型提高代码复用性
- 避免any类型，使用unknown或具体类型

## 项目结构偏好

### Next.js项目结构
```
src/
  app/              # App Router (Next.js 13+)
  components/       # 复用组件
    ui/            # shadcn/ui组件
  lib/             # 工具函数
  hooks/           # 自定义Hook
  types/           # TypeScript类型定义
  constants/       # 常量定义
```

### React项目结构
```
src/
  components/      # 组件
    ui/           # UI组件
    common/       # 通用组件
  pages/          # 页面组件
  hooks/          # 自定义Hook
  utils/          # 工具函数
  types/          # 类型定义
  constants/      # 常量
```

### NestJS项目结构
```
src/
  modules/        # 功能模块
  common/         # 通用模块
    decorators/   # 装饰器
    filters/      # 过滤器
    guards/       # 守卫
    interceptors/ # 拦截器
  config/         # 配置文件
```

## 常用命令偏好

### 包管理
- 安装依赖: `pnpm install`
- 添加依赖: `pnpm add [package]`
- 添加开发依赖: `pnpm add -D [package]`
- 运行脚本: `pnpm [script]`

### 开发命令
- 开发服务器: `pnpm dev`
- 构建: `pnpm build`
- 测试: `pnpm test`
- 代码检查: `pnpm lint`
- 类型检查: `pnpm type-check`

## 常用依赖包

### 前端开发
```json
{
  "dependencies": {
    "@types/node": "latest",
    "@types/react": "latest", 
    "@types/react-dom": "latest",
    "tailwindcss": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  },
  "devDependencies": {
    "typescript": "latest",
    "eslint": "latest",
    "prettier": "latest"
  }
}
```

### shadcn/ui setup
- 使用 `pnpm dlx shadcn-ui@latest init` 初始化
- 组件安装: `pnpm dlx shadcn-ui@latest add [component]`

## 默认配置文件

### tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### tsconfig.json基础配置
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## 注意事项
- 除非特别说明，否则默认使用上述技术栈
- 优先考虑现代React特性（Hooks、Suspense等）
- 注重代码可读性和可维护性
- 遵循单一职责原则
- 适当使用ESLint和Prettier保证代码质量