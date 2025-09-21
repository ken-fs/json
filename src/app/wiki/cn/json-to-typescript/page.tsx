import { Metadata } from 'next';
import Header from '@/components/Header';
import Link from 'next/link';
import { ArrowLeftIcon, CodeBracketIcon, ClipboardDocumentIcon, ArrowDownTrayIcon, CheckCircleIcon, ExclamationTriangleIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'JSON 转 TypeScript 接口 - 使用指南 | JSON Tools',
  description: '将 JSON 一键生成 TypeScript 接口，支持嵌套对象与数组。了解类型映射、快速上手步骤与常见注意事项。',
  keywords: 'JSON 转 TypeScript, TypeScript 接口, JSON 代码生成, TS 类型, JSON 工具',
  openGraph: {
    title: 'JSON 转 TypeScript 接口 - 使用指南',
    description: '从 JSON 生成 TypeScript 接口，支持嵌套与数组，提供快捷操作与实用建议。',
    type: 'article'
  }
};

export default function JsonToTypeScriptDocCN() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 导航 */}
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/wiki/cn" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              返回知识库
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              返回 JSON 工具
            </Link>
          </div>

          {/* 页眉 */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
              <CodeBracketIcon className="w-10 h-10 mr-3 text-blue-600" />
              JSON 转 TypeScript 接口
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              将合法 JSON 自动转换为 TypeScript 接口，支持嵌套对象、数组与基础类型推断。
            </p>
          </header>

          {/* 目录 */}
          <nav className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <CodeBracketIcon className="w-5 h-5 mr-2" />
              目录
            </h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">功能概览</a></li>
              <li><a href="#quick-start" className="text-blue-600 dark:text-blue-400 hover:underline">快速上手</a></li>
              <li><a href="#type-mapping" className="text-blue-600 dark:text-blue-400 hover:underline">类型映射</a></li>
              <li><a href="#arrays-nested" className="text-blue-600 dark:text-blue-400 hover:underline">数组与嵌套对象</a></li>
              <li><a href="#examples" className="text-blue-600 dark:text-blue-400 hover:underline">示例</a></li>
              <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">建议与限制</a></li>
              <li><a href="#related" className="text-blue-600 dark:text-blue-400 hover:underline">相关工具</a></li>
            </ul>
          </nav>

          {/* 内容 */}
          <article className="prose prose-lg max-w-none dark:prose-invert">
            {/* 概览 */}
            <section id="overview" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <LightBulbIcon className="w-8 h-8 mr-3 text-yellow-600" />
                功能概览
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    能做什么
                  </h3>
                  <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                    <li>• 自动从 JSON 生成 TS 接口</li>
                    <li>• 实时转换与预览</li>
                    <li>• 嵌套对象生成子接口</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center">
                    <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                    输入要求
                  </h3>
                  <ul className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                    <li>• 必须是合法 JSON</li>
                    <li>• 顶层数组支持，但按首个元素推断</li>
                    <li>• 混合类型数组需手动调整</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 快速上手 */}
            <section id="quick-start" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">快速上手</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>打开 <Link href="/json-to-typescript" className="text-blue-600 dark:text-blue-400">/json-to-typescript</Link></li>
                <li>将 JSON 粘贴到左侧输入框</li>
                <li>在右侧查看生成的接口</li>
                <li>复制 <ClipboardDocumentIcon className="inline w-4 h-4" /> 或下载 <ArrowDownTrayIcon className="inline w-4 h-4" /></li>
              </ol>
            </section>

            {/* 类型映射 */}
            <section id="type-mapping" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">类型映射</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">基础类型</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• string → string</li>
                    <li>• number → number（无整/浮区分）</li>
                    <li>• boolean → boolean</li>
                    <li>• null → null（可手动细化）</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">复杂类型</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• array → T[]（基于首个元素）</li>
                    <li>• object → 子接口（如 AddressInterface）</li>
                    <li>• 嵌套对象 → 独立接口 + 字段引用</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 数组与嵌套对象 */}
            <section id="arrays-nested" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">数组与嵌套对象</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">良好示例</h3>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded border border-green-200 dark:border-green-800">
                    <pre className="text-sm text-green-800 dark:text-green-200 whitespace-pre-wrap">
{`{
  "users": [{ "id": 1, "name": "A" }]
}`}
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">需注意</h3>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded border border-yellow-200 dark:border-yellow-800">
                    <pre className="text-sm text-yellow-800 dark:text-yellow-200 whitespace-pre-wrap">
{`{
  "values": [1, "two", true]
}`}
                    </pre>
                    <p className="mt-2 text-xs text-yellow-700 dark:text-yellow-300">类型混合；可调整为联合类型或规范化数据。</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 示例 */}
            <section id="examples" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">示例</h2>
              <pre className="whitespace-pre-wrap">
{`输入 JSON
{
  "name": "Alice",
  "age": 28,
  "active": true,
  "address": { "city": "Paris" },
  "tags": ["dev", "ts"]
}

生成的接口
interface RootObject {
  name: string;
  age: number;
  active: boolean;
  address: AddressInterface;
  tags: string[];
}

interface AddressInterface {
  city: string;
}`}
              </pre>
            </section>

            {/* 建议与限制 */}
            <section id="tips" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <LightBulbIcon className="w-8 h-8 mr-3 text-yellow-600" />
                建议与限制
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">推荐做法</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• 转换前先校验 JSON</li>
                    <li>• 按领域语义重命名接口</li>
                    <li>• 需要时补充可选修饰符 (?)</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">限制</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• 混合数组按首个元素推断</li>
                    <li>• 不自动检测可选/联合类型</li>
                    <li>• 复杂结构可能需要手动优化</li>
                  </ul>
                </div>
              </div>
            </section>
          </article>

          {/* 相关工具 */}
          <section id="related" className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-12">
            <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">相关工具</h2>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li>• <Link href="/" className="hover:underline">JSON 格式化工具</Link></li>
              <li>• <Link href="/wiki/cn/json-guide" className="hover:underline">JSON 完全指南</Link></li>
              <li>• <Link href="/wiki/cn/json-validation" className="hover:underline">JSON 校验指南</Link></li>
              <li>• <Link href="/wiki/cn/json-performance" className="hover:underline">性能优化技巧</Link></li>
            </ul>
          </section>

          {/* 页脚 */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>用该转换器快速搭建类型骨架，再按业务需求进行细化与完善。</p>
              <p className="mt-2">
                <Link href="/wiki/cn" className="text-blue-600 dark:text-blue-400 hover:underline mr-4">返回知识库</Link>
                <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">返回工具首页</Link>
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
