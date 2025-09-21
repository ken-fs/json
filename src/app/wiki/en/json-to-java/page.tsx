import { Metadata } from 'next';
import Header from '@/components/Header';
import Link from 'next/link';
import { ArrowLeftIcon, CodeBracketIcon, ClipboardDocumentIcon, ArrowDownTrayIcon, CheckCircleIcon, ExclamationTriangleIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'JSON → Java Classes: How to Use | JSON Tools',
  description: 'Generate plain Java classes (POJOs) from JSON. Learn supported features, type mapping, and how to export code in the JSON Tools app.',
  keywords: 'JSON to Java,Java POJO,JSON code generation,Java classes,JSON tools',
  openGraph: {
    title: 'JSON → Java Classes: How to Use',
    description: 'Generate Java classes from JSON, including nested objects and lists. Quick steps and tips.',
    type: 'article'
  }
};

export default function JsonToJavaDocEN() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/wiki/en" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Knowledge Base
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Back to JSON Tools
            </Link>
          </div>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
              <CodeBracketIcon className="w-10 h-10 mr-3 text-blue-600" />
              JSON → Java Classes
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Convert JSON into Java POJOs, including nested classes and generic lists. Ideal for quick model scaffolding.
            </p>
          </header>

          {/* Table of Contents */}
          <nav className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <CodeBracketIcon className="w-5 h-5 mr-2" />
              Table of Contents
            </h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">Overview</a></li>
              <li><a href="#quick-start" className="text-blue-600 dark:text-blue-400 hover:underline">Quick Start</a></li>
              <li><a href="#type-mapping" className="text-blue-600 dark:text-blue-400 hover:underline">Type Mapping</a></li>
              <li><a href="#collections-nested" className="text-blue-600 dark:text-blue-400 hover:underline">Collections & Nested Classes</a></li>
              <li><a href="#examples" className="text-blue-600 dark:text-blue-400 hover:underline">Examples</a></li>
              <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">Tips & Limitations</a></li>
              <li><a href="#related" className="text-blue-600 dark:text-blue-400 hover:underline">Related Tools</a></li>
            </ul>
          </nav>

          {/* Content */}
          <article className="prose prose-lg max-w-none dark:prose-invert">
            {/* Overview */}
            <section id="overview" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <LightBulbIcon className="w-8 h-8 mr-3 text-yellow-600" />
                Overview
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    What it does
                  </h3>
                  <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                    <li>• Generates Java classes from JSON fields.</li>
                    <li>• Produces getters/setters for each field.</li>
                    <li>• Creates child classes for nested objects.</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center">
                    <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                    Input requirements
                  </h3>
                  <ul className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                    <li>• JSON must be valid and parseable.</li>
                    <li>• Arrays inferred from first element type.</li>
                    <li>• Consider naming conventions for generated classes.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Quick Start */}
            <section id="quick-start" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Quick Start</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Open <Link href="/json-to-java" className="text-blue-600 dark:text-blue-400">/json-to-java</Link></li>
                <li>Paste JSON into the left editor</li>
                <li>Review generated classes in the right panel</li>
                <li>Copy <ClipboardDocumentIcon className="inline w-4 h-4" /> or download <ArrowDownTrayIcon className="inline w-4 h-4" /> the <code>.java</code> file</li>
              </ol>
            </section>

            {/* Type Mapping */}
            <section id="type-mapping" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Type Mapping</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Primitives</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• string → String</li>
                    <li>• integer → int; floating → double</li>
                    <li>• boolean → boolean</li>
                    <li>• null → Object</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Complex</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• array → List&lt;T&gt; (first element based)</li>
                    <li>• object → Child class (capitalized)</li>
                    <li>• nested object → Separate class + field reference</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Collections & Nested */}
            <section id="collections-nested" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Collections & Nested Classes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Good Example</h3>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded border border-green-200 dark:border-green-800">
                    <pre className="text-sm text-green-800 dark:text-green-200 whitespace-pre-wrap">
{`{
  "items": [{ "id": 1, "name": "Book" }]
}`}
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Needs Review</h3>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded border border-yellow-200 dark:border-yellow-800">
                    <pre className="text-sm text-yellow-800 dark:text-yellow-200 whitespace-pre-wrap">
{`{
  "values": [1, "two", true]
}`}
                    </pre>
                    <p className="mt-2 text-xs text-yellow-700 dark:text-yellow-300">Mixed types; choose Object or normalize to consistent types.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Examples */}
            <section id="examples" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Example</h2>
              <pre className="whitespace-pre-wrap">
{`Input JSON
{
  "id": 1,
  "name": "Book",
  "tags": ["tech"],
  "author": { "name": "Tom" }
}

Generated Java
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

            {/* Tips */}
            <section id="tips" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <LightBulbIcon className="w-8 h-8 mr-3 text-yellow-600" />
                Tips & Limitations
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recommended</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Validate JSON and field names</li>
                    <li>• Add packages/annotations as needed (e.g., Lombok)</li>
                    <li>• Rename classes to meaningful domain names</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Limitations</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Mixed arrays inferred from first element</li>
                    <li>• No package/import management beyond List</li>
                    <li>• Custom serialization annotations not generated</li>
                  </ul>
                </div>
              </div>
            </section>
          </article>

          {/* Related */}
          <section id="related" className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-12">
            <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Related Tools</h2>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li>• <Link href="/" className="hover:underline">JSON Formatting Tools</Link></li>
              <li>• <Link href="/wiki/en/json-guide" className="hover:underline">Complete JSON Guide</Link></li>
              <li>• <Link href="/wiki/en/json-validation" className="hover:underline">JSON Validation Guide</Link></li>
              <li>• <Link href="/wiki/en/json-performance" className="hover:underline">Performance Optimization</Link></li>
            </ul>
          </section>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>Generate POJOs quickly, then tailor modifiers, packages and annotations for production use.</p>
              <p className="mt-2">
                <Link href="/wiki/en" className="text-blue-600 dark:text-blue-400 hover:underline mr-4">Back to Knowledge Base</Link>
                <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">Back to JSON Tools</Link>
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
