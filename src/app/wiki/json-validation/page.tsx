import { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, AcademicCapIcon, CheckCircleIcon, ExclamationTriangleIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "JSON验证与校验完整指南 - JSON Schema使用教程 | JSON Tools",
  description: "深入学习JSON数据验证：JSON Schema语法、验证规则、错误处理和最佳实践。确保数据质量的专业指南。",
  keywords: "JSON验证,JSON Schema,数据验证,JSON校验,数据质量,JSON格式验证,Schema设计",
  openGraph: {
    title: "JSON验证与校验完整指南 - JSON Schema使用教程",
    description: "学习使用JSON Schema进行数据验证的完整指南，包含实用示例和最佳实践。",
    type: "article"
  },
  other: {
    "article:author": "JSON Tools",
    "article:published_time": "2024-01-01",
    "article:modified_time": new Date().toISOString(),
    "article:section": "验证与校验",
    "article:tag": "JSON验证,JSON Schema,数据验证,校验规则"
  }
};

export default function JSONValidationPage() {
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
              <ShieldCheckIcon className="w-10 h-10 mr-4 text-purple-600" />
              JSON 验证与校验
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              使用JSON Schema确保数据质量和一致性的完整指南
            </p>
          </header>

          {/* Table of Contents */}
          <nav className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <AcademicCapIcon className="w-5 h-5 mr-2" />
              目录
            </h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#what-is-validation" className="text-blue-600 dark:text-blue-400 hover:underline">什么是JSON验证</a></li>
              <li><a href="#json-schema-basics" className="text-blue-600 dark:text-blue-400 hover:underline">JSON Schema基础</a></li>
              <li><a href="#data-types-validation" className="text-blue-600 dark:text-blue-400 hover:underline">数据类型验证</a></li>
              <li><a href="#advanced-validation" className="text-blue-600 dark:text-blue-400 hover:underline">高级验证规则</a></li>
              <li><a href="#error-handling" className="text-blue-600 dark:text-blue-400 hover:underline">错误处理策略</a></li>
              <li><a href="#practical-examples" className="text-blue-600 dark:text-blue-400 hover:underline">实用示例</a></li>
              <li><a href="#tools-libraries" className="text-blue-600 dark:text-blue-400 hover:underline">工具和库推荐</a></li>
            </ul>
          </nav>

          {/* Content */}
          <article className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* What is JSON Validation */}
            <section id="what-is-validation" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">什么是JSON验证</h2>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6 border border-blue-200 dark:border-blue-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>JSON验证</strong>是确保JSON数据符合预定义结构和规则的过程。通过验证，我们可以：
                </p>
                <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• 确保数据格式正确</li>
                  <li>• 验证必填字段存在</li>
                  <li>• 检查数据类型匹配</li>
                  <li>• 应用业务规则约束</li>
                  <li>• 提供清晰的错误信息</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    验证的好处
                  </h3>
                  <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                    <li>• 提高数据质量</li>
                    <li>• 减少运行时错误</li>
                    <li>• 增强API健壮性</li>
                    <li>• 改善用户体验</li>
                    <li>• 便于调试和维护</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                    验证时机
                  </h3>
                  <ul className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                    <li>• 客户端输入验证</li>
                    <li>• API接口数据校验</li>
                    <li>• 数据库存储前验证</li>
                    <li>• 配置文件加载时</li>
                    <li>• 数据导入导出过程</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* JSON Schema Basics */}
            <section id="json-schema-basics" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">JSON Schema基础</h2>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">基本Schema结构</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">简单Schema示例</h4>
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                      <pre className="text-sm overflow-x-auto">
{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/user.schema.json",
  "title": "User",
  "description": "用户信息结构",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "minimum": 1
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 150
    }
  },
  "required": ["id", "name", "email"],
  "additionalProperties": false
}`}
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">对应的有效JSON数据</h4>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                      <pre className="text-sm overflow-x-auto text-green-800 dark:text-green-200">
{`{
  "id": 123,
  "name": "张三",
  "email": "zhangsan@example.com",
  "age": 28
}`}
                      </pre>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 mt-4">无效JSON数据示例</h4>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                      <pre className="text-sm overflow-x-auto text-red-800 dark:text-red-200">
{`{
  "id": "abc",              // 错误：应为整数
  "name": "",               // 错误：长度不能为0
  "email": "invalid-email", // 错误：邮箱格式不正确
  "age": -5                 // 错误：年龄不能为负数
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Schema关键字说明</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">基础关键字</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">$schema</code>
                        <span className="text-gray-600 dark:text-gray-300">指定Schema版本</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">$id</code>
                        <span className="text-gray-600 dark:text-gray-300">Schema的唯一标识符</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">title</code>
                        <span className="text-gray-600 dark:text-gray-300">Schema的标题</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">description</code>
                        <span className="text-gray-600 dark:text-gray-300">Schema的描述</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">type</code>
                        <span className="text-gray-600 dark:text-gray-300">数据类型</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">约束关键字</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs font-mono">required</code>
                        <span className="text-gray-600 dark:text-gray-300">必填字段列表</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs font-mono">properties</code>
                        <span className="text-gray-600 dark:text-gray-300">对象属性定义</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs font-mono">minimum</code>
                        <span className="text-gray-600 dark:text-gray-300">数字最小值</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs font-mono">maximum</code>
                        <span className="text-gray-600 dark:text-gray-300">数字最大值</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs font-mono">minLength</code>
                        <span className="text-gray-600 dark:text-gray-300">字符串最小长度</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Types Validation */}
            <section id="data-types-validation" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">数据类型验证</h2>
              
              <div className="space-y-6">
                {[
                  {
                    type: 'string',
                    name: '字符串验证',
                    color: 'blue',
                    constraints: [
                      'minLength / maxLength - 长度限制',
                      'pattern - 正则表达式匹配',
                      'format - 预定义格式 (email, date, uri等)',
                      'enum - 枚举值限制'
                    ],
                    example: {
                      schema: `{
  "type": "string",
  "minLength": 3,
  "maxLength": 50,
  "pattern": "^[A-Za-z0-9]+$",
  "format": "email"
}`,
                      valid: `"user@example.com"`,
                      invalid: `"ab"  // 长度不足
"user@"  // 格式不正确`
                    }
                  },
                  {
                    type: 'number/integer',
                    name: '数字验证',
                    color: 'green',
                    constraints: [
                      'minimum / maximum - 值范围',
                      'exclusiveMinimum / exclusiveMaximum - 排他性范围',
                      'multipleOf - 倍数约束',
                      'integer vs number 类型区分'
                    ],
                    example: {
                      schema: `{
  "type": "integer",
  "minimum": 1,
  "maximum": 100,
  "multipleOf": 5
}`,
                      valid: `15, 25, 50`,
                      invalid: `0    // 小于最小值
150  // 超过最大值
13   // 不是5的倍数`
                    }
                  },
                  {
                    type: 'boolean',
                    name: '布尔值验证',
                    color: 'purple',
                    constraints: [
                      '只接受 true 或 false',
                      '不接受字符串 "true"/"false"',
                      '不接受数字 1/0'
                    ],
                    example: {
                      schema: `{
  "type": "boolean"
}`,
                      valid: `true, false`,
                      invalid: `"true"  // 字符串
1       // 数字
null    // 空值`
                    }
                  },
                  {
                    type: 'array',
                    name: '数组验证',
                    color: 'yellow',
                    constraints: [
                      'items - 数组元素类型',
                      'minItems / maxItems - 长度限制',
                      'uniqueItems - 唯一性约束',
                      'additionalItems - 额外元素控制'
                    ],
                    example: {
                      schema: `{
  "type": "array",
  "items": {"type": "string"},
  "minItems": 1,
  "maxItems": 5,
  "uniqueItems": true
}`,
                      valid: `["a", "b", "c"]`,
                      invalid: `[]           // 长度不足
["a", "a"]   // 不唯一
[1, 2, 3]    // 类型错误`
                    }
                  },
                  {
                    type: 'object',
                    name: '对象验证',
                    color: 'red',
                    constraints: [
                      'properties - 属性定义',
                      'required - 必填属性',
                      'additionalProperties - 额外属性控制',
                      'minProperties / maxProperties - 属性数量限制'
                    ],
                    example: {
                      schema: `{
  "type": "object",
  "properties": {
    "name": {"type": "string"}
  },
  "required": ["name"],
  "additionalProperties": false
}`,
                      valid: `{"name": "张三"}`,
                      invalid: `{}               // 缺少必填字段
{"name": "张三", "age": 25}  // 不允许额外属性`
                    }
                  }
                ].map((item) => (
                  <div key={item.type} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className={`text-xl font-semibold mb-4 text-${item.color}-600 dark:text-${item.color}-400`}>
                      {item.name} ({item.type})
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">验证约束</h4>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          {item.constraints.map((constraint, index) => (
                            <li key={index}>• {constraint}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Schema示例</h4>
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-3">
                          <pre className="text-xs overflow-x-auto">{item.example.schema}</pre>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <h5 className="text-green-600 dark:text-green-400 text-sm font-medium mb-1">✅ 有效值</h5>
                            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                              <code className="text-xs text-green-800 dark:text-green-200">{item.example.valid}</code>
                            </div>
                          </div>
                          <div>
                            <h5 className="text-red-600 dark:text-red-400 text-sm font-medium mb-1">❌ 无效值</h5>
                            <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">
                              <pre className="text-xs text-red-800 dark:text-red-200">{item.example.invalid}</pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Advanced Validation */}
            <section id="advanced-validation" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">高级验证规则</h2>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">条件验证 (if/then/else)</h3>
                  
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mb-4">
                    <pre className="text-sm overflow-x-auto">
{`{
  "type": "object",
  "properties": {
    "type": {"type": "string", "enum": ["person", "company"]},
    "name": {"type": "string"},
    "age": {"type": "integer"},
    "employees": {"type": "integer"}
  },
  "if": {
    "properties": {"type": {"const": "person"}}
  },
  "then": {
    "required": ["name", "age"],
    "not": {"required": ["employees"]}
  },
  "else": {
    "required": ["name", "employees"],
    "not": {"required": ["age"]}
  }
}`}
                    </pre>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    根据 <code>type</code> 字段的值，动态要求不同的必填字段。
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">组合验证 (allOf/anyOf/oneOf)</h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">allOf (且)</h4>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                        <pre className="text-xs">
{`{
  "allOf": [
    {"minimum": 10},
    {"maximum": 50},
    {"multipleOf": 5}
  ]
}`}
                        </pre>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                        必须同时满足所有条件
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">anyOf (或)</h4>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                        <pre className="text-xs">
{`{
  "anyOf": [
    {"type": "string"},
    {"type": "number"}
  ]
}`}
                        </pre>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                        满足任一条件即可
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">oneOf (异或)</h4>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                        <pre className="text-xs">
{`{
  "oneOf": [
    {"minimum": 0},
    {"maximum": 0}
  ]
}`}
                        </pre>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                        只能满足其中一个条件
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">自定义格式验证</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">内置格式</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs">email</code>
                          <span className="text-gray-600 dark:text-gray-300">邮箱地址</span>
                        </div>
                        <div className="flex justify-between">
                          <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs">date</code>
                          <span className="text-gray-600 dark:text-gray-300">日期 (YYYY-MM-DD)</span>
                        </div>
                        <div className="flex justify-between">
                          <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs">date-time</code>
                          <span className="text-gray-600 dark:text-gray-300">日期时间 (ISO 8601)</span>
                        </div>
                        <div className="flex justify-between">
                          <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs">uri</code>
                          <span className="text-gray-600 dark:text-gray-300">URI地址</span>
                        </div>
                        <div className="flex justify-between">
                          <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs">uuid</code>
                          <span className="text-gray-600 dark:text-gray-300">UUID标识符</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">正则表达式验证</h4>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                        <pre className="text-xs overflow-x-auto">
{`{
  "type": "string",
  "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
  "description": "YYYY-MM-DD格式的日期"
}

{
  "type": "string", 
  "pattern": "^1[3-9]\\d{9}$",
  "description": "中国手机号码"
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Error Handling */}
            <section id="error-handling" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <ExclamationTriangleIcon className="w-8 h-8 mr-3 text-orange-600" />
                错误处理策略
              </h2>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">验证错误信息结构</h3>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mb-4">
                  <pre className="text-sm overflow-x-auto">
{`{
  "valid": false,
  "errors": [
    {
      "instancePath": "/user/email",
      "schemaPath": "#/properties/user/properties/email/format",
      "keyword": "format",
      "params": {"format": "email"},
      "message": "must match format \\"email\\"",
      "data": "invalid-email"
    },
    {
      "instancePath": "/user/age",
      "schemaPath": "#/properties/user/properties/age/minimum",
      "keyword": "minimum", 
      "params": {"minimum": 0},
      "message": "must be >= 0",
      "data": -5
    }
  ]
}`}
                  </pre>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">错误信息字段说明</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <code>instancePath</code>: 错误数据的路径</li>
                      <li>• <code>schemaPath</code>: 对应的Schema路径</li>
                      <li>• <code>keyword</code>: 失败的验证关键字</li>
                      <li>• <code>params</code>: 验证参数</li>
                      <li>• <code>message</code>: 错误描述</li>
                      <li>• <code>data</code>: 实际的错误数据</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">用户友好的错误处理</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• 将技术错误转换为用户可理解的信息</li>
                      <li>• 提供修复建议</li>
                      <li>• 按字段分组显示错误</li>
                      <li>• 高亮显示错误位置</li>
                      <li>• 提供示例正确格式</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                  <h4 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">❌ 糟糕的错误信息</h4>
                  <div className="space-y-2 text-red-700 dark:text-red-300 text-sm">
                    <div className="bg-red-100 dark:bg-red-800 p-2 rounded">
                      <code>&quot;must match format &apos;email&apos;&quot;</code>
                    </div>
                    <div className="bg-red-100 dark:bg-red-800 p-2 rounded">
                      <code>&quot;data.age must be &gt;= 0&quot;</code>
                    </div>
                    <p>问题：技术术语，用户难以理解</p>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">✅ 良好的错误信息</h4>
                  <div className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                    <div className="bg-green-100 dark:bg-green-800 p-2 rounded">
                      <code>&quot;邮箱格式不正确，请输入有效的邮箱地址&quot;</code>
                    </div>
                    <div className="bg-green-100 dark:bg-green-800 p-2 rounded">
                      <code>&quot;年龄不能为负数，请输入0或正整数&quot;</code>
                    </div>
                    <p>优点：清晰明了，提供解决方案</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Practical Examples */}
            <section id="practical-examples" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">实用示例</h2>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">用户注册表单验证</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Schema定义</h4>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                        <pre className="text-xs overflow-x-auto">
{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "username": {
      "type": "string",
      "minLength": 3,
      "maxLength": 20,
      "pattern": "^[a-zA-Z0-9_]+$"
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "password": {
      "type": "string",
      "minLength": 8,
      "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)"
    },
    "confirmPassword": {
      "type": "string"
    },
    "age": {
      "type": "integer",
      "minimum": 13,
      "maximum": 120
    },
    "terms": {
      "type": "boolean",
      "const": true
    }
  },
  "required": ["username", "email", "password", "confirmPassword", "terms"]
}`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">验证示例</h4>
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-green-600 dark:text-green-400 text-sm font-medium">✅ 有效数据</h5>
                          <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                            <pre className="text-xs text-green-800 dark:text-green-200">
{`{
  "username": "user123",
  "email": "user@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "age": 25,
  "terms": true
}`}
                            </pre>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-red-600 dark:text-red-400 text-sm font-medium">❌ 无效数据</h5>
                          <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">
                            <pre className="text-xs text-red-800 dark:text-red-200">
{`{
  "username": "ab",           // 太短
  "email": "invalid-email",   // 格式错误
  "password": "123",          // 不符合复杂度要求
  "age": 12,                  // 年龄不足
  "terms": false              // 必须同意条款
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">API响应数据验证</h3>
                  
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mb-4">
                    <pre className="text-sm overflow-x-auto">
{`{
  "type": "object",
  "properties": {
    "status": {
      "type": "string",
      "enum": ["success", "error"]
    },
    "data": {
      "type": "object"
    },
    "error": {
      "type": "object",
      "properties": {
        "code": {"type": "string"},
        "message": {"type": "string"}
      }
    },
    "timestamp": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": ["status", "timestamp"],
  "if": {
    "properties": {"status": {"const": "success"}}
  },
  "then": {
    "required": ["data"],
    "not": {"required": ["error"]}
  },
  "else": {
    "required": ["error"],
    "not": {"required": ["data"]}
  }
}`}
                    </pre>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    根据状态字段动态验证响应结构，成功时包含data，失败时包含error。
                  </p>
                </div>
              </div>
            </section>

            {/* Tools and Libraries */}
            <section id="tools-libraries" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">工具和库推荐</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">验证库</h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        name: 'Ajv',
                        lang: 'JavaScript',
                        desc: '最快的JSON Schema验证器',
                        features: ['高性能', '完整的Schema支持', '自定义关键字']
                      },
                      {
                        name: 'jsonschema',
                        lang: 'Python',
                        desc: 'Python标准JSON Schema库',
                        features: ['易于使用', '详细错误信息', 'CLI工具']
                      },
                      {
                        name: 'go-jsonschema',
                        lang: 'Go',
                        desc: 'Go语言JSON Schema验证',
                        features: ['类型安全', '高性能', '零依赖']
                      }
                    ].map((tool) => (
                      <div key={tool.name} className="border-l-4 border-blue-500 pl-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900 dark:text-white">{tool.name}</span>
                          <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                            {tool.lang}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{tool.desc}</p>
                        <div className="flex flex-wrap gap-1">
                          {tool.features.map((feature) => (
                            <span key={feature} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">在线工具</h3>
                  
                  <div className="space-y-3">
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">JSON Schema Validator</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">在线验证JSON数据和Schema</p>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">JSON Schema Generator</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">从JSON数据生成Schema</p>
                    </div>
                    
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">本站JSON工具</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                          格式化、验证、转换JSON数据
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </article>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>本指南提供了JSON验证的完整知识体系，从基础概念到实际应用，帮助您确保数据质量。</p>
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