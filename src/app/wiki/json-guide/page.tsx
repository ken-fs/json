import { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, BookOpenIcon, CodeBracketIcon, DocumentTextIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "JSON完全指南 - 数据交换格式详解 | JSON Tools",
  description: "全面学习JSON (JavaScript Object Notation)：语法规则、应用场景、最佳实践。包含详细示例和SEO优化的JSON教程指南。",
  keywords: "JSON,数据格式,API,REST,JavaScript,数据交换,JSON教程,JSON语法,JSON示例",
  openGraph: {
    title: "JSON完全指南 - 数据交换格式详解",
    description: "全面学习JSON格式：从基础语法到实际应用，包含丰富示例和最佳实践。",
    type: "article"
  },
  other: {
    "article:author": "JSON Tools",
    "article:published_time": "2024-01-01",
    "article:modified_time": new Date().toISOString()
  }
};

export default function JSONGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center space-x-4 mb-6">
            <Link 
              href="/wiki" 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              返回知识库
            </Link>
            <span className="text-gray-400">|</span>
            <Link 
              href="/" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              返回JSON工具
            </Link>
          </div>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              JSON 完全指南
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              深入了解 JSON (JavaScript Object Notation)：现代数据交换的标准格式
            </p>
          </header>

          {/* Table of Contents */}
          <nav className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <BookOpenIcon className="w-5 h-5 mr-2" />
              目录
            </h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#what-is-json" className="text-blue-600 dark:text-blue-400 hover:underline">什么是JSON？</a></li>
              <li><a href="#json-syntax" className="text-blue-600 dark:text-blue-400 hover:underline">JSON语法规则</a></li>
              <li><a href="#data-types" className="text-blue-600 dark:text-blue-400 hover:underline">数据类型详解</a></li>
              <li><a href="#use-cases" className="text-blue-600 dark:text-blue-400 hover:underline">应用场景</a></li>
              <li><a href="#best-practices" className="text-blue-600 dark:text-blue-400 hover:underline">最佳实践</a></li>
              <li><a href="#common-errors" className="text-blue-600 dark:text-blue-400 hover:underline">常见错误</a></li>
              <li><a href="#tools" className="text-blue-600 dark:text-blue-400 hover:underline">JSON工具</a></li>
            </ul>
          </nav>

          {/* Content */}
          <article className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* What is JSON */}
            <section id="what-is-json" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <DocumentTextIcon className="w-8 h-8 mr-3 text-blue-600" />
                什么是JSON？
              </h2>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>JSON (JavaScript Object Notation)</strong> 是一种轻量级的、基于文本的数据交换格式。
                  尽管名称中包含&ldquo;JavaScript&rdquo;，但JSON实际上是一种语言无关的数据格式，
                  几乎所有现代编程语言都原生支持JSON的解析和生成。
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">核心特性</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">人类可读</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    清晰的文本格式，直观的键值对结构
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">机器友好</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    语法规则简单，解析速度快
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">语言无关</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    所有主流编程语言都支持
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">轻量级</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    相比XML更简洁，传输量更小
                  </p>
                </div>
              </div>
            </section>

            {/* JSON Syntax */}
            <section id="json-syntax" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <CodeBracketIcon className="w-8 h-8 mr-3 text-green-600" />
                JSON语法规则
              </h2>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                JSON基于两种结构：
              </p>
              
              <ul className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>对象</strong>：名称/值对的集合（类似于字典、哈希表）</li>
                <li><strong>数组</strong>：值的有序列表（类似于数组或向量）</li>
              </ul>

              <div className="bg-gray-800 rounded-lg p-6 mb-6 overflow-x-auto">
                <h4 className="text-white font-semibold mb-4">基本语法示例</h4>
                <pre className="text-green-400 text-sm">
{`{
  "name": "张三",
  "age": 30,
  "isActive": true,
  "address": {
    "city": "北京",
    "zipCode": "100000"
  },
  "hobbies": ["编程", "阅读", "旅游"],
  "spouse": null
}`}
                </pre>
              </div>
            </section>

            {/* Data Types */}
            <section id="data-types" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">数据类型详解</h2>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. 字符串 (String)</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">用双引号包围的零个或多个Unicode字符</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                    <code className="text-sm">&quot;Hello World&quot;, &quot;你好&quot;, &quot;123&quot;, &quot;&quot;</code>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. 数字 (Number)</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">十进制数字，支持整数和浮点数</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                    <code className="text-sm">42, -17, 3.14159, 0, 1.0e+2</code>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. 布尔值 (Boolean)</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">逻辑值，只有两个可能的值</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                    <code className="text-sm">true, false</code>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. 空值 (null)</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">表示空值或不存在的值</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                    <code className="text-sm">null</code>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">5. 对象 (Object)</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">键值对的无序集合</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                    <code className="text-sm">&#123; &quot;key&quot;: &quot;value&quot;, &quot;number&quot;: 123 &#125;</code>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">6. 数组 (Array)</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">值的有序集合</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                    <code className="text-sm">[1, 2, 3], [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;], [true, false, null]</code>
                  </div>
                </div>
              </div>
            </section>

            {/* Use Cases */}
            <section id="use-cases" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <GlobeAltIcon className="w-8 h-8 mr-3 text-purple-600" />
                应用场景
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Web APIs</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      现代Web API的标准数据格式，用于客户端和服务器之间的数据交换。
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                      <pre className="text-xs overflow-x-auto">
{`{
  "status": "success",
  "data": {
    "users": [
      {
        "id": 1,
        "username": "admin"
      }
    ]
  }
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">配置文件</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      许多应用程序使用JSON作为配置文件格式。
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                      <pre className="text-xs overflow-x-auto">
{`{
  "database": {
    "host": "localhost",
    "port": 3306
  },
  "logging": {
    "level": "info"
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">数据存储</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      广泛用于数据存储、缓存和网络传输。NoSQL数据库如MongoDB原生支持JSON格式。
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">AJAX通信</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      在Web开发中，JSON是AJAX请求的首选数据格式，用于异步数据交换。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section id="best-practices" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">最佳实践</h2>
              
              <div className="space-y-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">✅ 推荐做法</h3>
                  <ul className="space-y-2 text-green-700 dark:text-green-300">
                    <li>• 使用有意义的键名：<code className="bg-green-100 dark:bg-green-800 px-1 rounded">&quot;firstName&quot;</code> 而不是 <code className="bg-green-100 dark:bg-green-800 px-1 rounded">&quot;fn&quot;</code></li>
                    <li>• 保持一致的命名约定：驼峰命名法或下划线</li>
                    <li>• 使用适当的数据类型：数字用数字类型，布尔值用布尔类型</li>
                    <li>• 避免深度嵌套，保持结构扁平化</li>
                    <li>• 使用数组来表示列表数据</li>
                  </ul>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">❌ 避免的做法</h3>
                  <ul className="space-y-2 text-red-700 dark:text-red-300">
                    <li>• 使用单引号：JSON必须使用双引号</li>
                    <li>• 添加注释：标准JSON不支持注释</li>
                    <li>• 使用undefined：JSON不支持undefined值</li>
                    <li>• 键名不加引号：所有键名必须用双引号包围</li>
                    <li>• 末尾添加逗号：JSON不允许尾随逗号</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Common Errors */}
            <section id="common-errors" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">常见错误</h2>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">语法错误</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-red-600 dark:text-red-400 font-medium mb-2">❌ 错误示例</h4>
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
                        <pre className="text-sm">
{`{
  'name': 'John',  // 单引号
  age: 30,         // 键名没有引号  
  "city": "NYC",   // 尾随逗号
}`}
                        </pre>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-green-600 dark:text-green-400 font-medium mb-2">✅ 正确示例</h4>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                        <pre className="text-sm">
{`{
  "name": "John",
  "age": 30,
  "city": "NYC"
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">字符编码问题</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    JSON必须使用UTF-8编码。确保特殊字符正确转义，如反斜杠需要写成 <code>\\\\</code>。
                  </p>
                </div>
              </div>
            </section>

            {/* Tools */}
            <section id="tools" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">JSON工具推荐</h2>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
                  本站提供的JSON工具
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">格式化</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">美化JSON结构，提高可读性</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">验证</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">检查JSON语法正确性</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">压缩</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">移除空白字符，减少文件大小</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">转换</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">JSON与XML、CSV格式互转</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">转义</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">处理转义字符串</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">可视化</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">树形结构展示</p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Link
                    href="/"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    立即使用JSON工具
                  </Link>
                </div>
              </div>
            </section>
          </article>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>本指南涵盖了JSON的核心概念和实践应用，适合初学者学习和专业开发者参考。</p>
              <p className="mt-2">
                <Link href="/wiki" className="text-blue-600 dark:text-blue-400 hover:underline mr-4">
                  返回知识库
                </Link>
                <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                  返回JSON工具首页
                </Link>
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}