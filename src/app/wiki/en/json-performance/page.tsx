import { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, RocketLaunchIcon, CheckCircleIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Complete JSON Performance Optimization Guide - Big Data Processing & Memory Management | JSON Tools",
  description: "Deep dive into JSON performance optimization: parsing optimization, memory management, big data processing, compression strategies, and practical techniques. Professional guide to boost application performance.",
  keywords: "JSON performance optimization,JSON parsing,memory management,big data processing,JSON compression,performance tuning,JSON optimization techniques",
  openGraph: {
    title: "Complete JSON Performance Optimization Guide - Big Data Processing & Memory Management",
    description: "Learn comprehensive JSON performance optimization techniques including parsing optimization, memory management, and practical tips.",
    type: "article"
  },
  other: {
    "article:author": "JSON Tools",
    "article:published_time": "2024-01-01",
    "article:modified_time": new Date().toISOString(),
    "article:section": "Performance Optimization",
    "article:tag": "JSON Performance,Performance Optimization,Big Data,Memory Management"
  }
};

export default function JSONPerformanceEnglishPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <RocketLaunchIcon className="w-10 h-10 mr-4 text-orange-600" />
              JSON Performance Optimization
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Master JSON processing performance optimization techniques to improve application response speed and resource utilization
            </p>
          </header>

          {/* Table of Contents */}
          <nav className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <ChartBarIcon className="w-5 h-5 mr-2" />
              Table of Contents
            </h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#performance-basics" className="text-blue-600 dark:text-blue-400 hover:underline">Performance Optimization Basics</a></li>
              <li><a href="#parsing-optimization" className="text-blue-600 dark:text-blue-400 hover:underline">Parsing Performance Optimization</a></li>
              <li><a href="#memory-management" className="text-blue-600 dark:text-blue-400 hover:underline">Memory Management Strategies</a></li>
              <li><a href="#large-data-handling" className="text-blue-600 dark:text-blue-400 hover:underline">Large Data Processing</a></li>
              <li><a href="#compression-strategies" className="text-blue-600 dark:text-blue-400 hover:underline">Compression Strategies</a></li>
              <li><a href="#streaming-processing" className="text-blue-600 dark:text-blue-400 hover:underline">Streaming Processing</a></li>
              <li><a href="#caching-strategies" className="text-blue-600 dark:text-blue-400 hover:underline">Caching Strategies</a></li>
              <li><a href="#performance-monitoring" className="text-blue-600 dark:text-blue-400 hover:underline">Performance Monitoring</a></li>
            </ul>
          </nav>

          {/* Content */}
          <article className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* Performance Basics */}
            <section id="performance-basics" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Performance Optimization Basics</h2>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">Performance Impact Factors</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Data Characteristics</h4>
                    <ul className="space-y-1 text-blue-700 dark:text-blue-300 text-sm">
                      <li>• JSON file size</li>
                      <li>• Nesting depth levels</li>
                      <li>• Array lengths</li>
                      <li>• String lengths</li>
                      <li>• Data type complexity</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Environment Factors</h4>
                    <ul className="space-y-1 text-blue-700 dark:text-blue-300 text-sm">
                      <li>• Available memory</li>
                      <li>• CPU processing power</li>
                      <li>• Network bandwidth</li>
                      <li>• Parser implementation</li>
                      <li>• Runtime environment</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    Optimization Principles
                  </h3>
                  <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                    <li>• <strong>Minimize data size</strong>: Reduce unnecessary fields and nesting</li>
                    <li>• <strong>Optimize parsing</strong>: Choose efficient parsers and algorithms</li>
                    <li>• <strong>Memory efficiency</strong>: Manage memory allocation and cleanup</li>
                    <li>• <strong>Lazy loading</strong>: Process data only when needed</li>
                    <li>• <strong>Caching strategies</strong>: Cache frequently accessed data</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                    Performance Metrics
                  </h3>
                  <ul className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                    <li>• <strong>Parse time</strong>: Time to convert JSON to objects</li>
                    <li>• <strong>Memory usage</strong>: Peak and average memory consumption</li>
                    <li>• <strong>Throughput</strong>: Data processed per unit time</li>
                    <li>• <strong>Latency</strong>: Response time for operations</li>
                    <li>• <strong>CPU utilization</strong>: Processing resource usage</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Parsing Optimization */}
            <section id="parsing-optimization" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Parsing Performance Optimization</h2>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Parser Selection and Comparison</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left p-3 font-medium text-gray-900 dark:text-white">Parser</th>
                          <th className="text-left p-3 font-medium text-gray-900 dark:text-white">Language</th>
                          <th className="text-left p-3 font-medium text-gray-900 dark:text-white">Performance</th>
                          <th className="text-left p-3 font-medium text-gray-900 dark:text-white">Memory Usage</th>
                          <th className="text-left p-3 font-medium text-gray-900 dark:text-white">Features</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <td className="p-3"><code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">JSON.parse()</code></td>
                          <td className="p-3 text-gray-600 dark:text-gray-300">JavaScript</td>
                          <td className="p-3"><span className="text-green-600 dark:text-green-400">High</span></td>
                          <td className="p-3"><span className="text-yellow-600 dark:text-yellow-400">Medium</span></td>
                          <td className="p-3 text-gray-600 dark:text-gray-300">Native, fast</td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <td className="p-3"><code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">ujson</code></td>
                          <td className="p-3 text-gray-600 dark:text-gray-300">Python</td>
                          <td className="p-3"><span className="text-green-600 dark:text-green-400">Very High</span></td>
                          <td className="p-3"><span className="text-green-600 dark:text-green-400">Low</span></td>
                          <td className="p-3 text-gray-600 dark:text-gray-300">C-based, ultra-fast</td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <td className="p-3"><code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">rapidjson</code></td>
                          <td className="p-3 text-gray-600 dark:text-gray-300">C++</td>
                          <td className="p-3"><span className="text-green-600 dark:text-green-400">Very High</span></td>
                          <td className="p-3"><span className="text-green-600 dark:text-green-400">Low</span></td>
                          <td className="p-3 text-gray-600 dark:text-gray-300">SAX/DOM, streaming</td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <td className="p-3"><code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Jackson</code></td>
                          <td className="p-3 text-gray-600 dark:text-gray-300">Java</td>
                          <td className="p-3"><span className="text-green-600 dark:text-green-400">High</span></td>
                          <td className="p-3"><span className="text-yellow-600 dark:text-yellow-400">Medium</span></td>
                          <td className="p-3 text-gray-600 dark:text-gray-300">Streaming, data binding</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Parsing Optimization Techniques</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">✅ Best Practices</h4>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                        <pre className="text-sm text-green-800 dark:text-green-200">
{`// Use native parsers when possible
const data = JSON.parse(jsonString);

// For large files, use streaming
const parser = new JSONStream();
parser.on('data', chunk => {
  processChunk(chunk);
});

// Avoid repeated parsing
const cache = new Map();
function parseOnce(json) {
  if (!cache.has(json)) {
    cache.set(json, JSON.parse(json));
  }
  return cache.get(json);
}`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">❌ Avoid These Patterns</h4>
                      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                        <pre className="text-sm text-red-800 dark:text-red-200">
{`// Don't parse the same data repeatedly
for (let i = 0; i < 1000; i++) {
  const obj = JSON.parse(sameJsonString);
  // This is wasteful
}

// Avoid eval() for JSON parsing
const obj = eval('(' + jsonString + ')');
// Security risk and slower

// Don't load entire file for partial data
const huge = JSON.parse(hugeJsonFile);
const small = huge.users[0];
// Memory inefficient`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Memory Management */}
            <section id="memory-management" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Memory Management Strategies</h2>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Memory Optimization Techniques</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Object Pooling</h4>
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mb-3">
                        <pre className="text-xs overflow-x-auto">
{`class ObjectPool {
  constructor() {
    this.pool = [];
  }
  
  get() {
    return this.pool.pop() || {};
  }
  
  release(obj) {
    // Clear object properties
    Object.keys(obj).forEach(key => {
      delete obj[key];
    });
    this.pool.push(obj);
  }
}

const pool = new ObjectPool();
const obj = pool.get();
// Use object...
pool.release(obj);`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Lazy Loading</h4>
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mb-3">
                        <pre className="text-xs overflow-x-auto">
{`class LazyJSON {
  constructor(jsonString) {
    this.raw = jsonString;
    this.parsed = null;
  }
  
  get data() {
    if (!this.parsed) {
      this.parsed = JSON.parse(this.raw);
      this.raw = null; // Free memory
    }
    return this.parsed;
  }
}

const lazy = new LazyJSON(largeJsonString);
// Only parsed when accessed
console.log(lazy.data.users);`}
                        </pre>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded border border-yellow-200 dark:border-yellow-800">
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Memory Management Tips</h4>
                    <ul className="space-y-1 text-yellow-700 dark:text-yellow-300 text-sm">
                      <li>• Release references to large objects after use</li>
                      <li>• Use WeakMap/WeakSet for temporary references</li>
                      <li>• Monitor memory usage with profiling tools</li>
                      <li>• Implement garbage collection triggers for long-running processes</li>
                      <li>• Consider using typed arrays for numeric data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Large Data Handling */}
            <section id="large-data-handling" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Large Data Processing</h2>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Strategies for Large JSON Files</h3>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded border border-blue-200 dark:border-blue-800">
                      <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Chunked Processing</h4>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">Break large files into smaller, manageable chunks</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded border border-purple-200 dark:border-purple-800">
                      <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Streaming</h4>
                      <p className="text-purple-700 dark:text-purple-300 text-sm">Process data as it arrives without loading everything</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded border border-green-200 dark:border-green-800">
                      <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Pagination</h4>
                      <p className="text-green-700 dark:text-green-300 text-sm">Request data in pages to limit memory usage</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Streaming JSON Parser Example</h4>
                    <pre className="text-sm overflow-x-auto">
{`import { Transform } from 'stream';

class JSONStreamParser extends Transform {
  constructor() {
    super({ objectMode: true });
    this.buffer = '';
    this.depth = 0;
    this.inString = false;
  }
  
  _transform(chunk, encoding, callback) {
    this.buffer += chunk.toString();
    
    let start = 0;
    for (let i = 0; i < this.buffer.length; i++) {
      const char = this.buffer[i];
      
      if (char === '"' && this.buffer[i-1] !== '\\\\') {
        this.inString = !this.inString;
      }
      
      if (!this.inString) {
        if (char === '{') this.depth++;
        if (char === '}') {
          this.depth--;
          if (this.depth === 0) {
            // Found complete object
            const obj = this.buffer.slice(start, i + 1);
            try {
              this.push(JSON.parse(obj));
              start = i + 1;
            } catch (e) {
              // Handle parse error
            }
          }
        }
      }
    }
    
    this.buffer = this.buffer.slice(start);
    callback();
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Compression Strategies */}
            <section id="compression-strategies" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Compression Strategies</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Compression Methods Comparison</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <span className="font-mono text-sm">gzip</span>
                      <div className="text-right">
                        <div className="text-green-600 dark:text-green-400 text-sm">70-80% reduction</div>
                        <div className="text-gray-500 text-xs">Good balance</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <span className="font-mono text-sm">brotli</span>
                      <div className="text-right">
                        <div className="text-green-600 dark:text-green-400 text-sm">75-85% reduction</div>
                        <div className="text-gray-500 text-xs">Better compression</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <span className="font-mono text-sm">lz4</span>
                      <div className="text-right">
                        <div className="text-yellow-600 dark:text-yellow-400 text-sm">50-60% reduction</div>
                        <div className="text-gray-500 text-xs">Fastest speed</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">JSON Structure Optimization</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">❌ Verbose Structure</h4>
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
                        <pre className="text-xs text-red-800 dark:text-red-200">
{`{
  "users": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "emailAddress": "john@example.com"
    }
  ]
}`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">✅ Compact Structure</h4>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                        <pre className="text-xs text-green-800 dark:text-green-200">
{`{
  "u": [
    ["John", "Doe", "john@example.com"]
  ],
  "k": ["firstName", "lastName", "email"]
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Performance Monitoring */}
            <section id="performance-monitoring" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <ChartBarIcon className="w-8 h-8 mr-3 text-blue-600" />
                Performance Monitoring
              </h2>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Performance Measurement Tools</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Browser DevTools</h4>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                      <pre className="text-xs">
{`// Measure parsing time
console.time('JSON Parse');
const data = JSON.parse(largeJsonString);
console.timeEnd('JSON Parse');

// Memory usage
const beforeMem = performance.memory.usedJSHeapSize;
const data = JSON.parse(jsonString);
const afterMem = performance.memory.usedJSHeapSize;
console.log('Memory used:', afterMem - beforeMem);`}
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Node.js Profiling</h4>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                      <pre className="text-xs">
{`const { performance } = require('perf_hooks');

const start = performance.now();
const data = JSON.parse(jsonString);
const end = performance.now();

console.log(\`Parse time: \${end - start}ms\`);

// Memory monitoring
const used = process.memoryUsage();
console.log('Memory usage:', {
  rss: Math.round(used.rss / 1024 / 1024),
  heapTotal: Math.round(used.heapTotal / 1024 / 1024),
  heapUsed: Math.round(used.heapUsed / 1024 / 1024)
});`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Reference */}
            <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-12">
              <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                Performance Optimization Quick Reference
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Optimization Checklist</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Choose appropriate parser for data size</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Implement streaming for large datasets</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Use compression for data transfer</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Monitor memory usage patterns</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Implement caching strategies</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Related Tools</h3>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li>• <Link href="/" className="hover:underline">JSON Formatting Tools</Link></li>
                    <li>• <Link href="/wiki/en/json-guide" className="hover:underline">Complete JSON Guide</Link></li>
                    <li>• <Link href="/wiki/en/json-validation" className="hover:underline">JSON Validation Guide</Link></li>
                    <li>• <Link href="/wiki/en/json-api-best-practices" className="hover:underline">API Best Practices</Link></li>
                  </ul>
                </div>
              </div>
            </section>
          </article>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>This guide provides comprehensive knowledge about JSON performance optimization, from basic concepts to advanced techniques, helping you build high-performance applications.</p>
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