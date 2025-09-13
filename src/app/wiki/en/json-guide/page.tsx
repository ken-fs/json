import { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, BookOpenIcon, CodeBracketIcon, DocumentTextIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Complete JSON Guide - Data Exchange Format Explained | JSON Tools",
  description: "Comprehensive guide to JSON (JavaScript Object Notation): syntax rules, data types, use cases, and best practices. Detailed examples and SEO-optimized JSON tutorial.",
  keywords: "JSON,data format,API,REST,JavaScript,data exchange,JSON tutorial,JSON syntax,JSON examples",
  openGraph: {
    title: "Complete JSON Guide - Data Exchange Format Explained",
    description: "Comprehensive guide to JSON format: from basic syntax to practical applications, including rich examples and best practices.",
    type: "article"
  },
  other: {
    "article:author": "JSON Tools",
    "article:published_time": "2024-01-01",
    "article:modified_time": new Date().toISOString()
  }
};

export default function JSONGuideEnglishPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center space-x-4 mb-6">
            <Link 
              href="/wiki/en" 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Knowledge Base
            </Link>
            <span className="text-gray-400">|</span>
            <Link 
              href="/" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Back to JSON Tools
            </Link>
          </div>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Complete JSON Guide
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Deep dive into JSON (JavaScript Object Notation): the standard format for modern data exchange
            </p>
          </header>

          {/* Table of Contents */}
          <nav className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <BookOpenIcon className="w-5 h-5 mr-2" />
              Table of Contents
            </h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#what-is-json" className="text-blue-600 dark:text-blue-400 hover:underline">What is JSON?</a></li>
              <li><a href="#json-syntax" className="text-blue-600 dark:text-blue-400 hover:underline">JSON Syntax Rules</a></li>
              <li><a href="#data-types" className="text-blue-600 dark:text-blue-400 hover:underline">Data Types Explained</a></li>
              <li><a href="#use-cases" className="text-blue-600 dark:text-blue-400 hover:underline">Use Cases</a></li>
              <li><a href="#best-practices" className="text-blue-600 dark:text-blue-400 hover:underline">Best Practices</a></li>
              <li><a href="#common-errors" className="text-blue-600 dark:text-blue-400 hover:underline">Common Errors</a></li>
              <li><a href="#tools" className="text-blue-600 dark:text-blue-400 hover:underline">JSON Tools</a></li>
            </ul>
          </nav>

          {/* Content */}
          <article className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* What is JSON */}
            <section id="what-is-json" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <DocumentTextIcon className="w-8 h-8 mr-3 text-blue-600" />
                What is JSON?
              </h2>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>JSON (JavaScript Object Notation)</strong> is a lightweight, text-based data interchange format.
                  Despite having &ldquo;JavaScript&rdquo; in its name, JSON is actually a language-independent data format,
                  with native support for parsing and generation in virtually all modern programming languages.
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Core Features</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Human Readable</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Clear text format with intuitive key-value pair structure
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Machine Friendly</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Simple syntax rules, fast parsing speed
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Language Independent</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Supported by all major programming languages
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Lightweight</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    More concise than XML, smaller transmission size
                  </p>
                </div>
              </div>
            </section>

            {/* JSON Syntax */}
            <section id="json-syntax" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <CodeBracketIcon className="w-8 h-8 mr-3 text-green-600" />
                JSON Syntax Rules
              </h2>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                JSON is built on two structures:
              </p>
              
              <ul className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Objects</strong>: A collection of name/value pairs (similar to dictionaries, hash tables)</li>
                <li><strong>Arrays</strong>: An ordered list of values (similar to arrays or vectors)</li>
              </ul>

              <div className="bg-gray-800 rounded-lg p-6 mb-6 overflow-x-auto">
                <h4 className="text-white font-semibold mb-4">Basic Syntax Example</h4>
                <pre className="text-green-400 text-sm">
{`{
  "name": "John Doe",
  "age": 30,
  "isActive": true,
  "address": {
    "city": "New York",
    "zipCode": "10001"
  },
  "hobbies": ["programming", "reading", "traveling"],
  "spouse": null
}`}
                </pre>
              </div>
            </section>

            {/* Data Types */}
            <section id="data-types" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Data Types Explained</h2>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. String</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">Zero or more Unicode characters enclosed in double quotes</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                    <code className="text-sm">&quot;Hello World&quot;, &quot;你好&quot;, &quot;123&quot;, &quot;&quot;</code>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. Number</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">Decimal numbers, supporting integers and floating-point</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                    <code className="text-sm">42, -17, 3.14159, 0, 1.0e+2</code>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. Boolean</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">Logical value with only two possible values</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                    <code className="text-sm">true, false</code>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. null</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">Represents null value or absence of value</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                    <code className="text-sm">null</code>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">5. Object</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">Unordered collection of key/value pairs</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                    <code className="text-sm">&#123; &quot;key&quot;: &quot;value&quot;, &quot;number&quot;: 123 &#125;</code>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">6. Array</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">Ordered collection of values</p>
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
                Use Cases
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Web APIs</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Standard data format for modern Web APIs, used for data exchange between client and server.
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
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Configuration Files</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Many applications use JSON as configuration file format.
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
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Data Storage</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Widely used for data storage, caching, and network transmission. NoSQL databases like MongoDB natively support JSON format.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">AJAX Communication</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      In web development, JSON is the preferred data format for AJAX requests, used for asynchronous data exchange.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section id="best-practices" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Best Practices</h2>
              
              <div className="space-y-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">✅ Recommended Practices</h3>
                  <ul className="space-y-2 text-green-700 dark:text-green-300">
                    <li>• Use meaningful key names: <code className="bg-green-100 dark:bg-green-800 px-1 rounded">&quot;firstName&quot;</code> instead of <code className="bg-green-100 dark:bg-green-800 px-1 rounded">&quot;fn&quot;</code></li>
                    <li>• Maintain consistent naming conventions: camelCase or snake_case</li>
                    <li>• Use appropriate data types: numbers for numeric values, booleans for boolean values</li>
                    <li>• Avoid deep nesting, keep structure flat</li>
                    <li>• Use arrays to represent list data</li>
                  </ul>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">❌ Practices to Avoid</h3>
                  <ul className="space-y-2 text-red-700 dark:text-red-300">
                    <li>• Using single quotes: JSON must use double quotes</li>
                    <li>• Adding comments: Standard JSON doesn&apos;t support comments</li>
                    <li>• Using undefined: JSON doesn&apos;t support undefined values</li>
                    <li>• Unquoted key names: All key names must be enclosed in double quotes</li>
                    <li>• Trailing commas: JSON doesn&apos;t allow trailing commas</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Common Errors */}
            <section id="common-errors" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Common Errors</h2>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Syntax Errors</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-red-600 dark:text-red-400 font-medium mb-2">❌ Incorrect Examples</h4>
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
                        <pre className="text-sm">
{`{
  'name': 'John',  // Single quotes
  age: 30,         // Unquoted key
  "city": "NYC",   // Trailing comma
}`}
                        </pre>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-green-600 dark:text-green-400 font-medium mb-2">✅ Correct Examples</h4>
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
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Character Encoding Issues</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    JSON must use UTF-8 encoding. Ensure special characters are properly escaped, such as backslashes should be written as <code>\\\\</code>.
                  </p>
                </div>
              </div>
            </section>

            {/* Tools */}
            <section id="tools" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">JSON Tools Recommendations</h2>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
                  JSON Tools Available on This Site
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Formatting</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Beautify JSON structure for better readability</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Validation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Check JSON syntax correctness</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Compression</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Remove whitespace to reduce file size</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Conversion</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Convert between JSON, XML, and CSV formats</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Escaping</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Handle escape character strings</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Visualization</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Tree structure display</p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Link
                    href="/"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Use JSON Tools Now
                  </Link>
                </div>
              </div>
            </section>
          </article>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>This guide covers the core concepts and practical applications of JSON, suitable for beginners to learn and professional developers to reference.</p>
              <p className="mt-2">
                <Link href="/wiki/en" className="text-blue-600 dark:text-blue-400 hover:underline mr-4">
                  Back to Knowledge Base
                </Link>
                <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Back to JSON Tools Homepage
                </Link>
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}