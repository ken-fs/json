import { Metadata } from 'next';
import Header from '@/components/Header';
import Link from 'next/link';
import { ArrowLeftIcon, CodeBracketIcon, ClipboardDocumentIcon, ArrowDownTrayIcon, CheckCircleIcon, ExclamationTriangleIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'JSON 转 Java 类 - 使用指南 | JSON Tools',
  description: '从 JSON 生成 Java POJO 类，支持嵌套对象与 List。了解类型映射、导出方式与常见注意事项。',
  keywords: 'JSON 转 Java, Java POJO, JSON 代码生成, Java 类, JSON 工具',
  openGraph: {
    title: 'JSON 转 Java 类 - 使用指南',
    description: '基于 JSON 结构生成 Java 类（含 getter/setter），并支持嵌套对象与集合。',
    type: 'article'
  }
};

export default function JsonToJavaDocCN() {
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
              JSON 转 Java 类
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              将 JSON 自动转换为 Java 类（POJO），包含基础字段与 getter/setter，支持嵌套类与泛型 List。
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
              <li><a href="#collections-nested" className="text-blue-600 dark:text-blue-400 hover:underline">集合与嵌套类</a></li>
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
                    <li>• 基于字段生成 Java 类</li>
                    <li>• 为每个字段生成 getter/setter</li>
                    <li>• 嵌套对象生成对应子类</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center">
                    <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                    输入要求
                  </h3>
                  <ul className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                    <li>• JSON 必须合法可解析</li>
                    <li>• 数组类型按首个元素推断</li>
                    <li>• 生成类名建议按项目命名规范处理</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 快速上手 */}
            <section id="quick-start" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">快速上手</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>打开 <Link href="/json-to-java" className="text-blue-600 dark:text-blue-400">/json-to-java</Link></li>
                <li>将 JSON 粘贴到左侧输入框</li>
                <li>在右侧查看生成的类代码</li>
                <li>复制 <ClipboardDocumentIcon className="inline w-4 h-4" /> 或下载 <ArrowDownTrayIcon className="inline w-4 h-4" /> <code>.java</code> 文件</li>
              </ol>
            </section>

            {/* 类型映射 */}
            <section id="type-mapping" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">类型映射</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">基础类型</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• string → String</li>
                    <li>• 整数 → int；小数 → double</li>
                    <li>• boolean → boolean</li>
                    <li>• null → Object</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">复杂类型</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• array → List&lt;T&gt;（按首个元素推断）</li>
                    <li>• object → 子类（首字母大写）</li>
                    <li>• 嵌套对象 → 独立类 + 字段引用</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 集合与嵌套类 */}
            <section id="collections-nested" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">集合与嵌套类</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">良好示例</h3>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded border border-green-200 dark:border-green-800">
                    <pre className="text-sm text-green-800 dark:text-green-200 whitespace-pre-wrap">
{`{
  "items": [{ "id": 1, "name": "Book" }]
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
                    <p className="mt-2 text-xs text-yellow-700 dark:text-yellow-300">类型混合；可选择使用 Object 或规范化为一致类型。</p>
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
  "id": 1,
  "name": "Book",
  "tags": ["tech"],
  "author": { "name": "Tom" }
}

生成的 Java
public class RootObject {
    private int id;
    private String name;
    private List<String> tags;
    private Author author;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
    public Author getAuthor() { return author; }
    public void setAuthor(Author author) { this.author = author; }
}

public class Author {
    private String name;
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
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
                    <li>• 转换前校验 JSON 与字段命名</li>
                    <li>• 需要时补充包名/注解（如 Lombok）</li>
                    <li>• 重命名类为更有语义的领域名</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">限制</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• 混合数组按首个元素推断</li>
                    <li>• 除 List 之外不管理包/导入</li>
                    <li>• 不生成序列化相关注解</li>
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
              <p>可快速生成 POJO，随后根据生产环境需求补充修饰符、包名与注解。</p>
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
