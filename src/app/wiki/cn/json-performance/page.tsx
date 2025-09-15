import { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, RocketLaunchIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "JSON性能优化完整指南 - 大数据处理与内存管理 | JSON Tools",
  description: "深入学习JSON性能优化：解析优化、内存管理、大数据处理、压缩策略和实用技巧。提升应用性能的专业指南。",
  keywords: "JSON性能优化,JSON解析,内存管理,大数据处理,JSON压缩,性能调优,JSON优化技巧",
  openGraph: {
    title: "JSON性能优化完整指南 - 大数据处理与内存管理",
    description: "学习JSON性能优化的完整指南，包含解析优化、内存管理和实用技巧。",
    type: "article"
  },
  other: {
    "article:author": "JSON Tools",
    "article:published_time": "2024-01-01",
    "article:modified_time": new Date().toISOString(),
    "article:section": "性能优化",
    "article:tag": "JSON性能,性能优化,大数据,内存管理"
  }
};

export default function JSONPerformancePage() {
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <RocketLaunchIcon className="w-10 h-10 mr-4 text-orange-600" />
              JSON 性能优化
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              掌握JSON处理的性能优化技巧，提升应用程序的响应速度和资源利用率
            </p>
          </header>

          {/* Table of Contents */}
          <nav className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <ChartBarIcon className="w-5 h-5 mr-2" />
              目录
            </h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#performance-basics" className="text-blue-600 dark:text-blue-400 hover:underline">性能优化基础</a></li>
              <li><a href="#parsing-optimization" className="text-blue-600 dark:text-blue-400 hover:underline">解析性能优化</a></li>
              <li><a href="#memory-management" className="text-blue-600 dark:text-blue-400 hover:underline">内存管理策略</a></li>
              <li><a href="#large-data-handling" className="text-blue-600 dark:text-blue-400 hover:underline">大数据处理</a></li>
              <li><a href="#compression-strategies" className="text-blue-600 dark:text-blue-400 hover:underline">压缩策略</a></li>
              <li><a href="#streaming-processing" className="text-blue-600 dark:text-blue-400 hover:underline">流式处理</a></li>
              <li><a href="#caching-strategies" className="text-blue-600 dark:text-blue-400 hover:underline">缓存策略</a></li>
              <li><a href="#performance-monitoring" className="text-blue-600 dark:text-blue-400 hover:underline">性能监控</a></li>
            </ul>
          </nav>

          {/* Content */}
          <article className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* Performance Basics */}
            <section id="performance-basics" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">性能优化基础</h2>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">性能影响因素</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">数据特征</h4>
                    <ul className="space-y-1 text-blue-700 dark:text-blue-300 text-sm">
                      <li>• JSON文件大小</li>
                      <li>• 嵌套层级深度</li>
                      <li>• 数组长度</li>
                      <li>• 字符串长度</li>
                      <li>• 数据类型复杂度</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">环境因素</h4>
                    <ul className="space-y-1 text-blue-700 dark:text-blue-300 text-sm">
                      <li>• 可用内存大小</li>
                      <li>• CPU处理能力</li>
                      <li>• 网络带宽</li>
                      <li>• 存储I/O性能</li>
                      <li>• 解析器选择</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    优化目标
                  </h3>
                  <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                    <li>• 减少解析时间</li>
                    <li>• 降低内存使用</li>
                    <li>• 提高吞吐量</li>
                    <li>• 改善用户体验</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                    性能瓶颈
                  </h3>
                  <ul className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                    <li>• 大文件解析</li>
                    <li>• 深度嵌套结构</li>
                    <li>• 频繁序列化</li>
                    <li>• 内存碎片化</li>
                  </ul>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                  <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-3">
                    优化原则
                  </h3>
                  <ul className="space-y-2 text-orange-700 dark:text-orange-300 text-sm">
                    <li>• 测量优先</li>
                    <li>• 针对性优化</li>
                    <li>• 权衡取舍</li>
                    <li>• 持续监控</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Parsing Optimization */}
            <section id="parsing-optimization" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">解析性能优化</h2>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">选择高性能解析器</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">JavaScript解析器对比</h4>
                      <div className="space-y-3">
                        <div className="border-l-4 border-green-500 pl-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900 dark:text-white">JSON.parse() (原生)</span>
                            <span className="text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded">推荐</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">• 最快的解析速度</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">• 浏览器优化</p>
                        </div>
                        
                        <div className="border-l-4 border-blue-500 pl-4">
                          <span className="font-medium text-gray-900 dark:text-white">simdjson-js</span>
                          <p className="text-sm text-gray-600 dark:text-gray-300">• SIMD优化</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">• 大文件处理</p>
                        </div>
                        
                        <div className="border-l-4 border-purple-500 pl-4">
                          <span className="font-medium text-gray-900 dark:text-white">JSONStream</span>
                          <p className="text-sm text-gray-600 dark:text-gray-300">• 流式解析</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">• 内存友好</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">性能对比 (相对速度)</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="w-20 text-sm">JSON.parse</span>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded">
                            <div className="bg-green-500 h-4 rounded" style={{width: '100%'}}></div>
                          </div>
                          <span className="w-12 text-sm text-right">100%</span>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="w-20 text-sm">simdjson-js</span>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded">
                            <div className="bg-blue-500 h-4 rounded" style={{width: '95%'}}></div>
                          </div>
                          <span className="w-12 text-sm text-right">95%</span>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="w-20 text-sm">JSONStream</span>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded">
                            <div className="bg-purple-500 h-4 rounded" style={{width: '80%'}}></div>
                          </div>
                          <span className="w-12 text-sm text-right">80%</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                        * 基于1MB标准JSON数据的基准测试
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">解析优化技巧</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-green-600 dark:text-green-400 font-medium mb-2 flex items-center">
                        <CheckCircleIcon className="w-4 h-4 mr-1" />
                        推荐做法
                      </h4>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                        <pre className="text-sm text-green-800 dark:text-green-200">
{`// 使用原生JSON.parse
const data = JSON.parse(jsonString);

// 避免重复解析
const cache = new Map();
function parseJSON(jsonString) {
  if (cache.has(jsonString)) {
    return cache.get(jsonString);
  }
  const result = JSON.parse(jsonString);
  cache.set(jsonString, result);
  return result;
}

// 延迟解析
function lazyParse(jsonString) {
  let parsed = null;
  return {
    get data() {
      if (!parsed) {
        parsed = JSON.parse(jsonString);
      }
      return parsed;
    }
  };
}`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-red-600 dark:text-red-400 font-medium mb-2 flex items-center">
                        <XCircleIcon className="w-4 h-4 mr-1" />
                        避免的做法
                      </h4>
                      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                        <pre className="text-sm text-red-800 dark:text-red-200">
{`// 避免eval()解析
const data = eval('(' + jsonString + ')');

// 避免频繁的小块解析
for (let i = 0; i < items.length; i++) {
  const item = JSON.parse(items[i]);
  process(item);
}

// 避免在循环中解析
function processData() {
  const data = JSON.parse(largeJSON); // 每次调用都解析
  return data.items.map(item => transform(item));
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Memory Management */}
            <section id="memory-management" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">内存管理策略</h2>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">内存使用模式</h3>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg mb-2">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1x</div>
                        <div className="text-sm text-blue-600 dark:text-blue-400">JSON字符串</div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">原始数据大小</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-green-100 dark:bg-green-800 p-4 rounded-lg mb-2">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">2-3x</div>
                        <div className="text-sm text-green-600 dark:text-green-400">解析后对象</div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">JavaScript对象</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded-lg mb-2">
                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">4-5x</div>
                        <div className="text-sm text-yellow-600 dark:text-yellow-400">处理过程</div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">临时对象+GC</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded border border-yellow-200 dark:border-yellow-800">
                    <h4 className="text-yellow-800 dark:text-yellow-200 font-medium mb-2 flex items-center">
                      <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                      内存规划建议
                    </h4>
                    <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                      处理大型JSON时，预留5-8倍于文件大小的可用内存，以应对解析和处理过程中的内存峰值。
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">内存优化技巧</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">1. 分批处理</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-green-600 dark:text-green-400 text-sm font-medium mb-2">✅ 推荐方式</h5>
                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                            <pre className="text-xs text-green-800 dark:text-green-200">
{`function processBatch(items, batchSize = 1000) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    processBatchItems(batch);
    
    // 让出控制权，允许GC运行
    if (i % (batchSize * 10) === 0) {
      await new Promise(resolve => 
        setTimeout(resolve, 0)
      );
    }
  }
}`}
                            </pre>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-red-600 dark:text-red-400 text-sm font-medium mb-2">❌ 避免方式</h5>
                          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
                            <pre className="text-xs text-red-800 dark:text-red-200">
{`function processAll(items) {
  // 一次性处理所有数据
  return items.map(item => {
    return expensiveTransform(item);
  });
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">2. 及时释放引用</h4>
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                        <pre className="text-sm overflow-x-auto">
{`function processLargeJSON(jsonString) {
  let data = JSON.parse(jsonString);
  
  // 处理后立即清除引用
  const result = processData(data);
  data = null; // 帮助GC回收
  
  return result;
}

// 使用WeakMap避免内存泄漏
const cache = new WeakMap();
function cacheResult(object, result) {
  cache.set(object, result);
}`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">3. 对象池模式</h4>
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                        <pre className="text-sm overflow-x-auto">
{`class ObjectPool {
  constructor(createFn, resetFn, maxSize = 100) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.pool = [];
    this.maxSize = maxSize;
  }
  
  acquire() {
    return this.pool.length > 0 
      ? this.pool.pop() 
      : this.createFn();
  }
  
  release(obj) {
    if (this.pool.length < this.maxSize) {
      this.resetFn(obj);
      this.pool.push(obj);
    }
  }
}

const processorPool = new ObjectPool(
  () => new DataProcessor(),
  (processor) => processor.reset()
);`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Large Data Handling */}
            <section id="large-data-handling" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">大数据处理</h2>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">数据分块策略</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">按大小分块</h4>
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mb-3">
                        <pre className="text-sm overflow-x-auto">
{`function chunkBySize(data, maxChunkSize) {
  const chunks = [];
  let currentChunk = [];
  let currentSize = 0;
  
  for (const item of data) {
    const itemSize = JSON.stringify(item).length;
    
    if (currentSize + itemSize > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk);
      currentChunk = [];
      currentSize = 0;
    }
    
    currentChunk.push(item);
    currentSize += itemSize;
  }
  
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }
  
  return chunks;
}`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">按数量分块</h4>
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mb-3">
                        <pre className="text-sm overflow-x-auto">
{`function chunkByCount(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

// 使用示例
const data = largeArray;
const chunks = chunkByCount(data, 1000);

for (const chunk of chunks) {
  await processChunk(chunk);
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Virtual Scrolling</h3>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded mb-4 border border-blue-200 dark:border-blue-800">
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      对于需要在UI中显示大量JSON数据的场景，虚拟滚动可以显著提升性能。
                    </p>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                    <pre className="text-sm overflow-x-auto">
{`class VirtualJSONList {
  constructor(data, itemHeight = 50, containerHeight = 400) {
    this.data = data;
    this.itemHeight = itemHeight;
    this.containerHeight = containerHeight;
    this.visibleItems = Math.ceil(containerHeight / itemHeight);
    this.startIndex = 0;
  }
  
  getVisibleData() {
    const endIndex = Math.min(
      this.startIndex + this.visibleItems + 5, // 预加载5个
      this.data.length
    );
    
    return {
      items: this.data.slice(this.startIndex, endIndex),
      offsetY: this.startIndex * this.itemHeight,
      totalHeight: this.data.length * this.itemHeight
    };
  }
  
  updateScrollPosition(scrollTop) {
    this.startIndex = Math.floor(scrollTop / this.itemHeight);
  }
}`}
                    </pre>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">数据预处理</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">索引构建</h4>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                        <pre className="text-xs overflow-x-auto">
{`function buildIndex(data, keyField) {
  const index = new Map();
  data.forEach((item, idx) => {
    index.set(item[keyField], idx);
  });
  return index;
}

// 快速查找
const userIndex = buildIndex(users, 'id');
const user = users[userIndex.get(userId)];</`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">数据压缩</h4>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                        <pre className="text-xs overflow-x-auto">
{`// 字段缩写
const compressed = data.map(item => ({
  i: item.id,
  n: item.name,
  e: item.email,
  a: item.age
}));

// 数组格式 (适用于同构数据)
const headers = ['id', 'name', 'email', 'age'];
const compactData = data.map(item => 
  headers.map(field => item[field])
);</`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Compression Strategies */}
            <section id="compression-strategies" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">压缩策略</h2>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">压缩算法对比</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-2">算法</th>
                          <th className="text-left py-2">压缩率</th>
                          <th className="text-left py-2">速度</th>
                          <th className="text-left py-2">CPU消耗</th>
                          <th className="text-left py-2">适用场景</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 dark:text-gray-300">
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <td className="py-2 font-medium">gzip</td>
                          <td className="py-2">高 (70-80%)</td>
                          <td className="py-2">快</td>
                          <td className="py-2">低</td>
                          <td className="py-2">HTTP传输</td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <td className="py-2 font-medium">brotli</td>
                          <td className="py-2">很高 (75-85%)</td>
                          <td className="py-2">中等</td>
                          <td className="py-2">中等</td>
                          <td className="py-2">现代浏览器</td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <td className="py-2 font-medium">LZ4</td>
                          <td className="py-2">中等 (60-70%)</td>
                          <td className="py-2">非常快</td>
                          <td className="py-2">很低</td>
                          <td className="py-2">实时数据</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">zstd</td>
                          <td className="py-2">高 (75-80%)</td>
                          <td className="py-2">快</td>
                          <td className="py-2">低</td>
                          <td className="py-2">存储/传输</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">JavaScript压缩示例</h3>
                  
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                    <pre className="text-sm overflow-x-auto">
{`// 使用pako库进行gzip压缩
import pako from 'pako';

function compressJSON(data) {
  const jsonString = JSON.stringify(data);
  const compressed = pako.gzip(jsonString);
  return compressed;
}

function decompressJSON(compressed) {
  const decompressed = pako.ungzip(compressed, { to: 'string' });
  return JSON.parse(decompressed);
}

// 使用CompressionStream API (现代浏览器)
async function compressWithStream(data) {
  const jsonString = JSON.stringify(data);
  const stream = new CompressionStream('gzip');
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();
  
  writer.write(new TextEncoder().encode(jsonString));
  writer.close();
  
  const chunks = [];
  let done = false;
  while (!done) {
    const { value, done: streamDone } = await reader.read();
    done = streamDone;
    if (value) chunks.push(value);
  }
  
  return new Uint8Array(chunks.reduce((acc, chunk) => [...acc, ...chunk], []));
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Streaming Processing */}
            <section id="streaming-processing" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">流式处理</h2>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">JSONLines处理</h3>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mb-4">
                  <pre className="text-sm overflow-x-auto">
{`// 流式处理JSONLines格式
async function processJSONLines(stream) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\\n');
      
      // 保留最后一行(可能不完整)
      buffer = lines.pop() || '';
      
      // 处理完整的行
      for (const line of lines) {
        if (line.trim()) {
          try {
            const data = JSON.parse(line);
            await processRecord(data);
          } catch (e) {
            console.error('解析错误:', line, e);
          }
        }
      }
    }
    
    // 处理剩余的buffer
    if (buffer.trim()) {
      const data = JSON.parse(buffer);
      await processRecord(data);
    }
  } finally {
    reader.releaseLock();
  }
}`}
                  </pre>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">流式处理优势</h4>
                  <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                    <li>• 内存使用恒定</li>
                    <li>• 支持无限大数据</li>
                    <li>• 早期数据处理</li>
                    <li>• 更好的用户体验</li>
                    <li>• 容错性强</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">适用场景</h4>
                  <ul className="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
                    <li>• 日志文件处理</li>
                    <li>• 大型数据集导入</li>
                    <li>• 实时数据分析</li>
                    <li>• 网络数据传输</li>
                    <li>• ETL数据处理</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Performance Monitoring */}
            <section id="performance-monitoring" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">性能监控</h2>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">性能测量工具</h3>
                  
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mb-4">
                    <pre className="text-sm overflow-x-auto">
{`class PerformanceProfiler {
  constructor() {
    this.metrics = new Map();
  }
  
  startTiming(label) {
    this.metrics.set(label, {
      start: performance.now(),
      memoryStart: performance.memory?.usedJSHeapSize || 0
    });
  }
  
  endTiming(label) {
    const metric = this.metrics.get(label);
    if (!metric) return;
    
    const duration = performance.now() - metric.start;
    const memoryEnd = performance.memory?.usedJSHeapSize || 0;
    const memoryUsed = memoryEnd - metric.memoryStart;
    
    return {
      duration: Math.round(duration * 100) / 100,
      memoryUsed: Math.round(memoryUsed / 1024 / 1024 * 100) / 100 // MB
    };
  }
  
  profile(fn, label) {
    this.startTiming(label);
    const result = fn();
    const stats = this.endTiming(label);
    console.log(\`\${label}: \${stats.duration}ms, \${stats.memoryUsed}MB\`);
    return result;
  }
}

// 使用示例
const profiler = new PerformanceProfiler();
const data = profiler.profile(() => JSON.parse(largeJSON), 'JSON解析');`}
                    </pre>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">基准测试</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">简单基准测试</h4>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                        <pre className="text-xs overflow-x-auto">
{`function benchmark(fn, iterations = 1000) {
  const times = [];
  
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    fn();
    times.push(performance.now() - start);
  }
  
  const avg = times.reduce((a, b) => a + b) / times.length;
  const min = Math.min(...times);
  const max = Math.max(...times);
  
  return { avg, min, max, iterations };
}`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">结果分析</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">平均时间:</span>
                          <span className="font-mono">2.34ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">最小时间:</span>
                          <span className="font-mono">1.87ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">最大时间:</span>
                          <span className="font-mono">4.12ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">测试次数:</span>
                          <span className="font-mono">1000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                  <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-4">
                    性能优化检查清单
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">解析优化</h4>
                      <ul className="space-y-1 text-orange-700 dark:text-orange-300 text-sm">
                        <li>☐ 使用原生JSON.parse</li>
                        <li>☐ 避免重复解析</li>
                        <li>☐ 实现解析缓存</li>
                        <li>☐ 考虑流式解析</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">内存管理</h4>
                      <ul className="space-y-1 text-orange-700 dark:text-orange-300 text-sm">
                        <li>☐ 分批处理数据</li>
                        <li>☐ 及时释放引用</li>
                        <li>☐ 使用对象池</li>
                        <li>☐ 监控内存使用</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </article>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>本指南提供了JSON性能优化的完整方案，从基础概念到高级技巧，帮助您构建高性能应用。</p>
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