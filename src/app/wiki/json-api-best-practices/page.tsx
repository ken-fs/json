import { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, CodeBracketIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, LightBulbIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "JSON API最佳实践指南 - RESTful API设计规范 | JSON Tools",
  description: "完整的JSON API设计最佳实践：命名规范、状态码使用、错误处理、分页策略和性能优化。提升API质量的专业指南。",
  keywords: "JSON API,RESTful API,API设计,最佳实践,API规范,REST API,JSON接口设计,API文档",
  openGraph: {
    title: "JSON API最佳实践指南 - RESTful API设计规范",
    description: "学习设计高质量JSON API的专业指南，包含完整的规范和实用技巧。",
    type: "article"
  },
  other: {
    "article:author": "JSON Tools",
    "article:published_time": "2024-01-01",
    "article:modified_time": new Date().toISOString(),
    "article:section": "API设计",
    "article:tag": "JSON API,RESTful,API设计,最佳实践"
  }
};

export default function JSONAPIBestPracticesPage() {
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
              <CodeBracketIcon className="w-10 h-10 mr-4 text-green-600" />
              JSON API 最佳实践
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              设计高质量、易维护、用户友好的JSON API的完整指南
            </p>
          </header>

          {/* Table of Contents */}
          <nav className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <CodeBracketIcon className="w-5 h-5 mr-2" />
              目录
            </h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#api-design-principles" className="text-blue-600 dark:text-blue-400 hover:underline">API设计原则</a></li>
              <li><a href="#naming-conventions" className="text-blue-600 dark:text-blue-400 hover:underline">命名规范</a></li>
              <li><a href="#http-methods" className="text-blue-600 dark:text-blue-400 hover:underline">HTTP方法使用</a></li>
              <li><a href="#status-codes" className="text-blue-600 dark:text-blue-400 hover:underline">状态码规范</a></li>
              <li><a href="#error-handling" className="text-blue-600 dark:text-blue-400 hover:underline">错误处理</a></li>
              <li><a href="#pagination" className="text-blue-600 dark:text-blue-400 hover:underline">分页策略</a></li>
              <li><a href="#performance" className="text-blue-600 dark:text-blue-400 hover:underline">性能优化</a></li>
              <li><a href="#security" className="text-blue-600 dark:text-blue-400 hover:underline">安全考虑</a></li>
            </ul>
          </nav>

          {/* Content */}
          <article className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* API Design Principles */}
            <section id="api-design-principles" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <LightBulbIcon className="w-8 h-8 mr-3 text-yellow-600" />
                API设计原则
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    核心原则
                  </h3>
                  <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                    <li>• <strong>一致性</strong>：统一的命名和结构规范</li>
                    <li>• <strong>可预测性</strong>：开发者能够预期API行为</li>
                    <li>• <strong>简洁性</strong>：避免不必要的复杂性</li>
                    <li>• <strong>可扩展性</strong>：支持未来功能扩展</li>
                    <li>• <strong>向后兼容</strong>：保护现有集成</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                    RESTful设计风格
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
                    遵循REST架构风格，使API更加直观和标准化：
                  </p>
                  <ul className="space-y-1 text-blue-700 dark:text-blue-300 text-sm">
                    <li>• 资源导向的URL设计</li>
                    <li>• 正确使用HTTP方法</li>
                    <li>• 无状态通信</li>
                    <li>• 分层系统架构</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Naming Conventions */}
            <section id="naming-conventions" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">命名规范</h2>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">URL路径规范</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-green-600 dark:text-green-400 font-medium mb-2 flex items-center">
                        <CheckCircleIcon className="w-4 h-4 mr-1" />
                        推荐做法
                      </h4>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                        <pre className="text-sm text-green-800 dark:text-green-200">
{`GET /api/v1/users
GET /api/v1/users/123
POST /api/v1/users
PUT /api/v1/users/123
DELETE /api/v1/users/123

GET /api/v1/users/123/orders
GET /api/v1/orders?user_id=123`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-red-600 dark:text-red-400 font-medium mb-2 flex items-center">
                        <XCircleIcon className="w-4 h-4 mr-1" />
                        避免的做法
                      </h4>
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
                        <pre className="text-sm text-red-800 dark:text-red-200">
{`GET /api/v1/getUsers
POST /api/v1/createUser
GET /api/v1/user_list
GET /api/v1/Users/123/Orders
DELETE /api/v1/removeUser/123

GET /getUserData?id=123`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">命名规则说明</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                      <li>• 使用复数名词表示资源集合：<code>/users</code>、<code>/orders</code></li>
                      <li>• 使用小写字母和连字符：<code>/user-profiles</code></li>
                      <li>• 避免动词，让HTTP方法表达操作</li>
                      <li>• 嵌套资源应该反映逻辑关系</li>
                      <li>• 使用查询参数进行过滤和排序</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">JSON字段命名</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-green-600 dark:text-green-400 font-medium mb-2">推荐：snake_case</h4>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                        <pre className="text-sm text-green-800 dark:text-green-200">
{`{
  "user_id": 123,
  "first_name": "张三",
  "last_name": "李",
  "email_address": "user@example.com",
  "created_at": "2024-01-01T00:00:00Z",
  "is_active": true,
  "profile_image_url": "https://..."
}`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-blue-600 dark:text-blue-400 font-medium mb-2">也可以：camelCase</h4>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                        <pre className="text-sm text-blue-800 dark:text-blue-200">
{`{
  "userId": 123,
  "firstName": "张三",
  "lastName": "李",
  "emailAddress": "user@example.com",
  "createdAt": "2024-01-01T00:00:00Z",
  "isActive": true,
  "profileImageUrl": "https://..."
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* HTTP Methods */}
            <section id="http-methods" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">HTTP方法使用</h2>
              
              <div className="space-y-4">
                {[
                  {
                    method: 'GET',
                    purpose: '获取资源',
                    characteristics: '安全、幂等、可缓存',
                    examples: [
                      'GET /api/v1/users - 获取用户列表',
                      'GET /api/v1/users/123 - 获取特定用户',
                      'GET /api/v1/users?page=2&limit=20 - 分页获取'
                    ],
                    color: 'green'
                  },
                  {
                    method: 'POST',
                    purpose: '创建资源',
                    characteristics: '非安全、非幂等、不可缓存',
                    examples: [
                      'POST /api/v1/users - 创建新用户',
                      'POST /api/v1/users/123/orders - 为用户创建订单',
                      'POST /api/v1/auth/login - 用户登录'
                    ],
                    color: 'blue'
                  },
                  {
                    method: 'PUT',
                    purpose: '完整更新资源',
                    characteristics: '非安全、幂等、不可缓存',
                    examples: [
                      'PUT /api/v1/users/123 - 完整更新用户信息',
                      'PUT /api/v1/users/123/password - 更新密码'
                    ],
                    color: 'yellow'
                  },
                  {
                    method: 'PATCH',
                    purpose: '部分更新资源',
                    characteristics: '非安全、非幂等、不可缓存',
                    examples: [
                      'PATCH /api/v1/users/123 - 部分更新用户信息',
                      'PATCH /api/v1/users/123/status - 更新用户状态'
                    ],
                    color: 'purple'
                  },
                  {
                    method: 'DELETE',
                    purpose: '删除资源',
                    characteristics: '非安全、幂等、不可缓存',
                    examples: [
                      'DELETE /api/v1/users/123 - 删除用户',
                      'DELETE /api/v1/users/123/sessions - 删除用户会话'
                    ],
                    color: 'red'
                  }
                ].map((item) => (
                  <div key={item.method} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start space-x-4">
                      <div className={`px-3 py-1 rounded font-mono text-sm font-bold text-white bg-${item.color}-600`}>
                        {item.method}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {item.purpose}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                          特性：{item.characteristics}
                        </p>
                        <div className="space-y-1">
                          {item.examples.map((example, index) => (
                            <code key={index} className="block text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                              {example}
                            </code>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Status Codes */}
            <section id="status-codes" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">状态码规范</h2>
              
              <div className="space-y-6">
                {[
                  {
                    category: '2xx 成功',
                    color: 'green',
                    codes: [
                      { code: '200', name: 'OK', usage: 'GET、PUT、PATCH请求成功' },
                      { code: '201', name: 'Created', usage: 'POST请求成功创建资源' },
                      { code: '204', name: 'No Content', usage: 'DELETE请求成功，无返回内容' }
                    ]
                  },
                  {
                    category: '4xx 客户端错误',
                    color: 'red',
                    codes: [
                      { code: '400', name: 'Bad Request', usage: '请求参数错误或格式不正确' },
                      { code: '401', name: 'Unauthorized', usage: '未认证或认证失败' },
                      { code: '403', name: 'Forbidden', usage: '已认证但无权限访问' },
                      { code: '404', name: 'Not Found', usage: '资源不存在' },
                      { code: '422', name: 'Unprocessable Entity', usage: '请求格式正确但数据验证失败' }
                    ]
                  },
                  {
                    category: '5xx 服务器错误',
                    color: 'yellow',
                    codes: [
                      { code: '500', name: 'Internal Server Error', usage: '服务器内部错误' },
                      { code: '502', name: 'Bad Gateway', usage: '网关错误' },
                      { code: '503', name: 'Service Unavailable', usage: '服务暂时不可用' }
                    ]
                  }
                ].map((category) => (
                  <div key={category.category} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className={`text-xl font-semibold mb-4 text-${category.color}-600 dark:text-${category.color}-400`}>
                      {category.category}
                    </h3>
                    <div className="space-y-3">
                      {category.codes.map((item) => (
                        <div key={item.code} className="flex items-start space-x-4">
                          <span className={`px-2 py-1 rounded font-mono text-sm font-bold text-white bg-${category.color}-600 min-w-[3rem] text-center`}>
                            {item.code}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">{item.usage}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Error Handling */}
            <section id="error-handling" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <ExclamationTriangleIcon className="w-8 h-8 mr-3 text-orange-600" />
                错误处理
              </h2>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">统一错误响应格式</h3>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <pre className="text-sm overflow-x-auto">
{`{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "请求数据验证失败",
    "details": [
      {
        "field": "email",
        "message": "邮箱格式不正确"
      },
      {
        "field": "password",
        "message": "密码长度至少8位"
      }
    ],
    "timestamp": "2024-01-01T12:00:00Z",
    "request_id": "req_123456"
  }
}`}
                  </pre>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">错误响应字段说明</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <code>code</code>: 机器可读的错误代码</li>
                      <li>• <code>message</code>: 人类可读的错误描述</li>
                      <li>• <code>details</code>: 详细错误信息（可选）</li>
                      <li>• <code>timestamp</code>: 错误发生时间</li>
                      <li>• <code>request_id</code>: 请求ID，便于日志追踪</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                  <h4 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">常见错误类型</h4>
                  <ul className="space-y-2 text-red-700 dark:text-red-300 text-sm">
                    <li>• <code>INVALID_REQUEST</code> - 请求格式错误</li>
                    <li>• <code>VALIDATION_FAILED</code> - 数据验证失败</li>
                    <li>• <code>AUTHENTICATION_REQUIRED</code> - 需要认证</li>
                    <li>• <code>PERMISSION_DENIED</code> - 权限不足</li>
                    <li>• <code>RESOURCE_NOT_FOUND</code> - 资源不存在</li>
                    <li>• <code>RATE_LIMIT_EXCEEDED</code> - 超出限流</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">错误处理最佳实践</h4>
                  <ul className="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
                    <li>• 提供清晰的错误描述</li>
                    <li>• 包含解决问题的建议</li>
                    <li>• 使用一致的错误格式</li>
                    <li>• 避免暴露敏感信息</li>
                    <li>• 提供请求ID便于追踪</li>
                    <li>• 适当的HTTP状态码</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Quick Reference */}
            <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-12">
              <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                快速参考
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3">常用API设计模式</h3>
                  <div className="space-y-2 text-sm">
                    <code className="block bg-white dark:bg-gray-800 p-2 rounded">GET /api/v1/users?page=1&limit=20</code>
                    <code className="block bg-white dark:bg-gray-800 p-2 rounded">GET /api/v1/users?sort=created_at&order=desc</code>
                    <code className="block bg-white dark:bg-gray-800 p-2 rounded">GET /api/v1/users?filter[status]=active</code>
                    <code className="block bg-white dark:bg-gray-800 p-2 rounded">GET /api/v1/users?include=profile,orders</code>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3">相关工具</h3>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li>• <Link href="/" className="hover:underline">JSON格式化工具</Link></li>
                    <li>• <Link href="/wiki/json-validation" className="hover:underline">JSON验证指南</Link></li>
                    <li>• <Link href="/wiki/json-performance" className="hover:underline">性能优化技巧</Link></li>
                    <li>• API文档生成工具</li>
                  </ul>
                </div>
              </div>
            </section>
          </article>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>本指南提供了设计高质量JSON API的完整规范和最佳实践，适合API设计者和开发者参考。</p>
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