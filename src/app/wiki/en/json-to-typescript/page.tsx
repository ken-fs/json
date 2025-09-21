import { Metadata } from 'next';
import Header from '@/components/Header';
import Link from 'next/link';
import { ArrowLeftIcon, CodeBracketIcon, ClipboardDocumentIcon, ArrowDownTrayIcon, CheckCircleIcon, ExclamationTriangleIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'JSON → TypeScript Interfaces: How to Use | JSON Tools',
  description: 'Learn how to generate TypeScript interfaces from JSON. Covers supported features, type mapping, and quick usage steps in the JSON Tools app.',
  keywords: 'JSON to TypeScript,TypeScript interfaces,JSON code generation,TS types,JSON tools',
  openGraph: {
    title: 'JSON → TypeScript Interfaces: How to Use',
    description: 'Generate TypeScript interfaces from JSON with nested types and arrays. Quick usage guide and tips.',
    type: 'article'
  }
};

export default function JsonToTypeScriptDocEN() {
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
              JSON → TypeScript Interfaces
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Convert any valid JSON into clean TypeScript interfaces. Supports nested objects, arrays, and basic type inference.
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
              <li><a href="#arrays-nested" className="text-blue-600 dark:text-blue-400 hover:underline">Arrays & Nested Objects</a></li>
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
                    <li>• Auto-generates TypeScript interfaces from JSON.</li>
                    <li>• Real-time conversion while typing/pasting.</li>
                    <li>• Generates child interfaces for nested objects.</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center">
                    <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                    Input requirements
                  </h3>
                  <ul className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                    <li>• JSON must be valid and parseable.</li>
                    <li>• Top-level array is supported but inferred from first item.</li>
                    <li>• Mixed-type arrays may require manual edits.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Quick Start */}
            <section id="quick-start" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Quick Start</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Open <Link href="/json-to-typescript" className="text-blue-600 dark:text-blue-400">/json-to-typescript</Link></li>
                <li>Paste JSON into the left editor</li>
                <li>Review generated interfaces in the right panel</li>
                <li>Copy <ClipboardDocumentIcon className="inline w-4 h-4" /> or download <ArrowDownTrayIcon className="inline w-4 h-4" /></li>
              </ol>
            </section>

            {/* Type Mapping */}
            <section id="type-mapping" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Type Mapping</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Primitives</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• string → string</li>
                    <li>• number → number (no int/float distinction)</li>
                    <li>• boolean → boolean</li>
                    <li>• null → null (consider refining manually)</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Complex</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• array → T[] (inferred from first element)</li>
                    <li>• object → Named child interface (e.g., AddressInterface)</li>
                    <li>• nested object → Separate interface + field reference</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Arrays & Nested */}
            <section id="arrays-nested" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Arrays & Nested Objects</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Good Example</h3>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded border border-green-200 dark:border-green-800">
                    <pre className="text-sm text-green-800 dark:text-green-200 whitespace-pre-wrap">
{`{
  "users": [{ "id": 1, "name": "A" }]
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
                    <p className="mt-2 text-xs text-yellow-700 dark:text-yellow-300">Mixed types; adjust to a union or normalize data.</p>
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
  "name": "Alice",
  "age": 28,
  "active": true,
  "address": { "city": "Paris" },
  "tags": ["dev", "ts"]
}

Generated Interfaces
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
                    <li>• Validate JSON before conversion</li>
                    <li>• Rename interfaces to domain-specific names</li>
                    <li>• Add optional modifiers (?) where appropriate</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Limitations</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Mixed arrays inferred from first element</li>
                    <li>• No automatic optional/union detection</li>
                    <li>• Complex schemas may need refinement</li>
                  </ul>
                </div>
              </div>
            </section>
          </article>

          {/* Quick Reference / Related */}
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
              <p>Use this converter to bootstrap types quickly, then refine interfaces to match your domain.</p>
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
