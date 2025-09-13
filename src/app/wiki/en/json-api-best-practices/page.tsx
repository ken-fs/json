import { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, CodeBracketIcon, CheckCircleIcon, ExclamationTriangleIcon, LightBulbIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "JSON API Best Practices Guide - RESTful API Design Standards | JSON Tools",
  description: "Complete JSON API design best practices: naming conventions, status code usage, error handling, pagination strategies, and performance optimization. Professional guide to improve API quality.",
  keywords: "JSON API,RESTful API,API design,best practices,API standards,REST API,JSON interface design,API documentation",
  openGraph: {
    title: "JSON API Best Practices Guide - RESTful API Design Standards",
    description: "Learn to design high-quality JSON APIs with comprehensive standards and practical tips.",
    type: "article"
  },
  other: {
    "article:author": "JSON Tools",
    "article:published_time": "2024-01-01",
    "article:modified_time": new Date().toISOString(),
    "article:section": "API Design",
    "article:tag": "JSON API,RESTful,API Design,Best Practices"
  }
};

export default function JSONAPIBestPracticesEnglishPage() {
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
              <CodeBracketIcon className="w-10 h-10 mr-4 text-green-600" />
              JSON API Best Practices
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Complete guide to designing high-quality, maintainable, and user-friendly JSON APIs
            </p>
          </header>

          {/* Table of Contents */}
          <nav className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <CodeBracketIcon className="w-5 h-5 mr-2" />
              Table of Contents
            </h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#api-design-principles" className="text-blue-600 dark:text-blue-400 hover:underline">API Design Principles</a></li>
              <li><a href="#naming-conventions" className="text-blue-600 dark:text-blue-400 hover:underline">Naming Conventions</a></li>
              <li><a href="#http-methods" className="text-blue-600 dark:text-blue-400 hover:underline">HTTP Methods Usage</a></li>
              <li><a href="#status-codes" className="text-blue-600 dark:text-blue-400 hover:underline">Status Code Standards</a></li>
              <li><a href="#error-handling" className="text-blue-600 dark:text-blue-400 hover:underline">Error Handling</a></li>
              <li><a href="#pagination" className="text-blue-600 dark:text-blue-400 hover:underline">Pagination Strategies</a></li>
              <li><a href="#performance" className="text-blue-600 dark:text-blue-400 hover:underline">Performance Optimization</a></li>
              <li><a href="#security" className="text-blue-600 dark:text-blue-400 hover:underline">Security Considerations</a></li>
            </ul>
          </nav>

          {/* Content */}
          <article className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* API Design Principles */}
            <section id="api-design-principles" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <LightBulbIcon className="w-8 h-8 mr-3 text-yellow-600" />
                API Design Principles
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    Core Principles
                  </h3>
                  <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                    <li>• <strong>Consistency</strong>: Unified naming and structural standards</li>
                    <li>• <strong>Predictability</strong>: Developers can anticipate API behavior</li>
                    <li>• <strong>Simplicity</strong>: Avoid unnecessary complexity</li>
                    <li>• <strong>Scalability</strong>: Support future feature expansion</li>
                    <li>• <strong>Backward Compatibility</strong>: Protect existing integrations</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                    RESTful Design Guidelines
                  </h3>
                  <ul className="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
                    <li>• Use nouns for resources, not verbs</li>
                    <li>• Leverage HTTP methods semantically</li>
                    <li>• Design clear hierarchical resource structures</li>
                    <li>• Maintain statelessness</li>
                    <li>• Implement proper HTTP status codes</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Resource Design Examples</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">✅ Good Design</h4>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                      <pre className="text-sm text-green-800 dark:text-green-200">
{`GET    /users              # Get user list
GET    /users/123          # Get specific user
POST   /users              # Create new user
PUT    /users/123          # Update user
DELETE /users/123          # Delete user
GET    /users/123/orders   # Get user's orders`}
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">❌ Poor Design</h4>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                      <pre className="text-sm text-red-800 dark:text-red-200">
{`GET    /getUsers           # Using verbs
POST   /createUser         # Inconsistent naming
GET    /user_list          # Mixed naming styles
DELETE /deleteUser/123     # Redundant verbs
GET    /getUserOrders/123  # Overly complex`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Naming Conventions */}
            <section id="naming-conventions" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Naming Conventions</h2>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">URL Naming Standards</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Resource Naming Rules</h4>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li>• Use lowercase letters</li>
                        <li>• Use hyphens for word separation</li>
                        <li>• Use plural nouns for collections</li>
                        <li>• Use singular nouns for documents</li>
                        <li>• Avoid file extensions in URLs</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Naming Examples</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <code className="text-green-600 dark:text-green-400">/user-profiles</code>
                          <span className="text-gray-500">✅ Good</span>
                        </div>
                        <div className="flex justify-between">
                          <code className="text-red-600 dark:text-red-400">/userProfiles</code>
                          <span className="text-gray-500">❌ CamelCase</span>
                        </div>
                        <div className="flex justify-between">
                          <code className="text-green-600 dark:text-green-400">/api/v1/orders</code>
                          <span className="text-gray-500">✅ Versioned</span>
                        </div>
                        <div className="flex justify-between">
                          <code className="text-red-600 dark:text-red-400">/user_profiles</code>
                          <span className="text-gray-500">❌ Underscores</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">JSON Field Naming</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">✅ Recommended - camelCase</h4>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                        <pre className="text-sm text-green-800 dark:text-green-200">
{`{
  "userId": 123,
  "firstName": "John",
  "lastName": "Doe",
  "emailAddress": "john@example.com",
  "createdAt": "2024-01-01T00:00:00Z",
  "lastLoginDate": "2024-01-15T10:30:00Z"
}`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">❌ Avoid - snake_case</h4>
                      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                        <pre className="text-sm text-red-800 dark:text-red-200">
{`{
  "user_id": 123,
  "first_name": "John",
  "last_name": "Doe",
  "email_address": "john@example.com",
  "created_at": "2024-01-01T00:00:00Z",
  "last_login_date": "2024-01-15T10:30:00Z"
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
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">HTTP Methods Usage</h2>
              
              <div className="space-y-4">
                {[
                  {
                    method: 'GET',
                    purpose: 'Retrieve data',
                    color: 'blue',
                    characteristics: ['Safe', 'Idempotent', 'Cacheable'],
                    examples: [
                      'GET /users - Get all users',
                      'GET /users/123 - Get specific user',
                      'GET /users/123/orders - Get user orders'
                    ]
                  },
                  {
                    method: 'POST',
                    purpose: 'Create new resources',
                    color: 'green',
                    characteristics: ['Not safe', 'Not idempotent', 'Not cacheable'],
                    examples: [
                      'POST /users - Create new user',
                      'POST /users/123/orders - Create order for user',
                      'POST /auth/login - User authentication'
                    ]
                  },
                  {
                    method: 'PUT',
                    purpose: 'Update/replace entire resource',
                    color: 'yellow',
                    characteristics: ['Not safe', 'Idempotent', 'Not cacheable'],
                    examples: [
                      'PUT /users/123 - Replace entire user data',
                      'PUT /users/123/profile - Update complete profile',
                      'PUT /orders/456 - Replace order data'
                    ]
                  },
                  {
                    method: 'PATCH',
                    purpose: 'Partial resource updates',
                    color: 'orange',
                    characteristics: ['Not safe', 'Not idempotent', 'Not cacheable'],
                    examples: [
                      'PATCH /users/123 - Update user fields',
                      'PATCH /orders/456/status - Update order status',
                      'PATCH /users/123/password - Change password'
                    ]
                  },
                  {
                    method: 'DELETE',
                    purpose: 'Remove resources',
                    color: 'red',
                    characteristics: ['Not safe', 'Idempotent', 'Not cacheable'],
                    examples: [
                      'DELETE /users/123 - Delete user',
                      'DELETE /orders/456 - Cancel order',
                      'DELETE /users/123/sessions - End all sessions'
                    ]
                  }
                ].map((item) => (
                  <div key={item.method} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                      <span className={`bg-${item.color}-100 dark:bg-${item.color}-900/20 text-${item.color}-800 dark:text-${item.color}-200 px-3 py-1 rounded font-mono text-sm font-semibold mr-4`}>
                        {item.method}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.purpose}</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Characteristics</h4>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          {item.characteristics.map((char, index) => (
                            <li key={index}>• {char}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Usage Examples</h4>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          {item.examples.map((example, index) => (
                            <li key={index}>• <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">{example}</code></li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Status Codes */}
            <section id="status-codes" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Status Code Standards</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">2xx Success Codes</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-mono bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-green-800 dark:text-green-200">200 OK</span>
                      <p className="mt-1 text-green-700 dark:text-green-300">Successful GET, PUT, PATCH, DELETE</p>
                    </div>
                    <div>
                      <span className="font-mono bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-green-800 dark:text-green-200">201 Created</span>
                      <p className="mt-1 text-green-700 dark:text-green-300">Successful POST - resource created</p>
                    </div>
                    <div>
                      <span className="font-mono bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-green-800 dark:text-green-200">204 No Content</span>
                      <p className="mt-1 text-green-700 dark:text-green-300">Successful DELETE - no response body</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">4xx Client Error Codes</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-mono bg-red-100 dark:bg-red-800 px-2 py-1 rounded text-red-800 dark:text-red-200">400 Bad Request</span>
                      <p className="mt-1 text-red-700 dark:text-red-300">Invalid request syntax/parameters</p>
                    </div>
                    <div>
                      <span className="font-mono bg-red-100 dark:bg-red-800 px-2 py-1 rounded text-red-800 dark:text-red-200">401 Unauthorized</span>
                      <p className="mt-1 text-red-700 dark:text-red-300">Authentication required</p>
                    </div>
                    <div>
                      <span className="font-mono bg-red-100 dark:bg-red-800 px-2 py-1 rounded text-red-800 dark:text-red-200">403 Forbidden</span>
                      <p className="mt-1 text-red-700 dark:text-red-300">Valid request, insufficient permissions</p>
                    </div>
                    <div>
                      <span className="font-mono bg-red-100 dark:bg-red-800 px-2 py-1 rounded text-red-800 dark:text-red-200">404 Not Found</span>
                      <p className="mt-1 text-red-700 dark:text-red-300">Resource does not exist</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Error Handling */}
            <section id="error-handling" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <ExclamationTriangleIcon className="w-8 h-8 mr-3 text-orange-600" />
                Error Handling
              </h2>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Standard Error Response Format</h3>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <pre className="text-sm overflow-x-auto">
{`{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Request validation failed",
    "details": "The email field is required and must be a valid email address",
    "timestamp": "2024-01-15T10:30:00Z",
    "path": "/api/v1/users",
    "requestId": "req_123456789",
    "fields": [
      {
        "field": "email",
        "message": "Email is required",
        "code": "REQUIRED_FIELD"
      },
      {
        "field": "age",
        "message": "Age must be between 18 and 120",
        "code": "INVALID_RANGE"
      }
    ]
  }
}`}
                  </pre>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Error Response Fields</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <code>code</code>: Machine-readable error identifier</li>
                      <li>• <code>message</code>: Human-readable error description</li>
                      <li>• <code>details</code>: Additional context information</li>
                      <li>• <code>timestamp</code>: Error occurrence time</li>
                      <li>• <code>path</code>: API endpoint where error occurred</li>
                      <li>• <code>requestId</code>: Unique request identifier</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Error Handling Best Practices</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• Use consistent error response structure</li>
                      <li>• Provide actionable error messages</li>
                      <li>• Include request IDs for debugging</li>
                      <li>• Map validation errors to specific fields</li>
                      <li>• Avoid exposing sensitive information</li>
                      <li>• Log errors for monitoring and debugging</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Reference */}
            <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-12">
              <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                Quick Reference
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3">API Design Checklist</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Use RESTful resource naming</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Implement proper HTTP methods</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Return appropriate status codes</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Design consistent error responses</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Include API versioning strategy</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Related Tools</h3>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li>• <Link href="/" className="hover:underline">JSON Formatting Tools</Link></li>
                    <li>• <Link href="/wiki/en/json-guide" className="hover:underline">Complete JSON Guide</Link></li>
                    <li>• <Link href="/wiki/en/json-validation" className="hover:underline">JSON Validation Guide</Link></li>
                    <li>• <Link href="/wiki/en/json-performance" className="hover:underline">Performance Optimization</Link></li>
                  </ul>
                </div>
              </div>
            </section>
          </article>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>This guide provides comprehensive knowledge about JSON API best practices, from basic concepts to practical applications, helping you design professional-grade APIs.</p>
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