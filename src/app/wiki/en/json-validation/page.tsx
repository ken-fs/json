import { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, AcademicCapIcon, CheckCircleIcon, ExclamationTriangleIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Complete JSON Validation & Schema Guide - JSON Schema Tutorial | JSON Tools",
  description: "Deep dive into JSON data validation: JSON Schema syntax, validation rules, error handling, and best practices. Professional guide to ensure data quality.",
  keywords: "JSON validation,JSON Schema,data validation,JSON verification,data quality,JSON format validation,schema design,validation rules",
  openGraph: {
    title: "Complete JSON Validation & Schema Guide - JSON Schema Tutorial",
    description: "Learn to use JSON Schema for data validation with comprehensive guide, including practical examples and best practices.",
    type: "article"
  },
  other: {
    "article:author": "JSON Tools",
    "article:published_time": "2024-01-01",
    "article:modified_time": new Date().toISOString(),
    "article:section": "Validation",
    "article:tag": "JSON Validation,JSON Schema,Data Validation,Validation Rules"
  }
};

export default function JSONValidationEnglishPage() {
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
              <ShieldCheckIcon className="w-10 h-10 mr-4 text-purple-600" />
              JSON Validation & Schema
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Complete guide to using JSON Schema to ensure data quality and consistency
            </p>
          </header>

          {/* Table of Contents */}
          <nav className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <AcademicCapIcon className="w-5 h-5 mr-2" />
              Table of Contents
            </h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#what-is-validation" className="text-blue-600 dark:text-blue-400 hover:underline">What is JSON Validation?</a></li>
              <li><a href="#json-schema-basics" className="text-blue-600 dark:text-blue-400 hover:underline">JSON Schema Fundamentals</a></li>
              <li><a href="#data-types-validation" className="text-blue-600 dark:text-blue-400 hover:underline">Data Type Validation</a></li>
              <li><a href="#advanced-validation" className="text-blue-600 dark:text-blue-400 hover:underline">Advanced Validation Rules</a></li>
              <li><a href="#error-handling" className="text-blue-600 dark:text-blue-400 hover:underline">Error Handling Strategies</a></li>
              <li><a href="#practical-examples" className="text-blue-600 dark:text-blue-400 hover:underline">Practical Examples</a></li>
              <li><a href="#tools-libraries" className="text-blue-600 dark:text-blue-400 hover:underline">Recommended Tools & Libraries</a></li>
            </ul>
          </nav>

          {/* Content */}
          <article className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* What is JSON Validation */}
            <section id="what-is-validation" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">What is JSON Validation?</h2>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6 border border-blue-200 dark:border-blue-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>JSON validation</strong> is the process of ensuring that JSON data conforms to a predefined structure and rules. Through validation, we can:
                </p>
                <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Ensure correct data format</li>
                  <li>• Verify existence of required fields</li>
                  <li>• Check data type matching</li>
                  <li>• Apply business rule constraints</li>
                  <li>• Provide clear error information</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    Benefits of Validation
                  </h3>
                  <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                    <li>• Improve data quality</li>
                    <li>• Reduce runtime errors</li>
                    <li>• Increase API robustness</li>
                    <li>• Enhance user experience</li>
                    <li>• Facilitate debugging and maintenance</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                    Validation Scenarios
                  </h3>
                  <ul className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                    <li>• Client input validation</li>
                    <li>• API interface data verification</li>
                    <li>• Pre-database storage validation</li>
                    <li>• Configuration file loading</li>
                    <li>• Data import/export processes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* JSON Schema Basics */}
            <section id="json-schema-basics" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">JSON Schema Fundamentals</h2>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Schema Structure</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Simple Schema Example</h4>
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                      <pre className="text-sm overflow-x-auto">
{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/user.schema.json",
  "title": "User",
  "description": "User information structure",
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
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Corresponding Valid JSON Data</h4>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                      <pre className="text-sm overflow-x-auto text-green-800 dark:text-green-200">
{`{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 28
}`}
                      </pre>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 mt-4">Invalid JSON Data Example</h4>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                      <pre className="text-sm overflow-x-auto text-red-800 dark:text-red-200">
{`{
  "id": "abc",              // Error: should be integer
  "name": "",               // Error: length cannot be 0
  "email": "invalid-email", // Error: incorrect email format
  "age": -5                 // Error: age cannot be negative
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Schema Keywords Explanation</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Basic Keywords</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">$schema</code>
                        <span className="text-gray-600 dark:text-gray-300">Specifies schema version</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">$id</code>
                        <span className="text-gray-600 dark:text-gray-300">Unique schema identifier</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">title</code>
                        <span className="text-gray-600 dark:text-gray-300">Schema title</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">description</code>
                        <span className="text-gray-600 dark:text-gray-300">Schema description</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">type</code>
                        <span className="text-gray-600 dark:text-gray-300">Data type</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Constraint Keywords</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs font-mono">required</code>
                        <span className="text-gray-600 dark:text-gray-300">List of required fields</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs font-mono">properties</code>
                        <span className="text-gray-600 dark:text-gray-300">Object property definitions</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs font-mono">minimum</code>
                        <span className="text-gray-600 dark:text-gray-300">Minimum number value</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs font-mono">maximum</code>
                        <span className="text-gray-600 dark:text-gray-300">Maximum number value</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs font-mono">minLength</code>
                        <span className="text-gray-600 dark:text-gray-300">Minimum string length</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Types Validation */}
            <section id="data-types-validation" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Data Type Validation</h2>
              
              <div className="space-y-6">
                {[
                  {
                    type: 'string',
                    name: 'String Validation',
                    color: 'blue',
                    constraints: [
                      'minLength / maxLength - Length restrictions',
                      'pattern - Regular expression matching',
                      'format - Predefined formats (email, date, uri, etc.)',
                      'enum - Enumerated value restrictions'
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
                      invalid: `"ab"  // Insufficient length
"user@"  // Incorrect format`
                    }
                  },
                  {
                    type: 'number/integer',
                    name: 'Number Validation',
                    color: 'green',
                    constraints: [
                      'minimum / maximum - Value range',
                      'exclusiveMinimum / exclusiveMaximum - Exclusive range',
                      'multipleOf - Multiple restrictions',
                      'Distinction between integer vs number'
                    ],
                    example: {
                      schema: `{
  "type": "integer",
  "minimum": 1,
  "maximum": 100,
  "multipleOf": 5
}`,
                      valid: `15, 25, 50`,
                      invalid: `0    // Below minimum value
150  // Exceeds maximum value
13   // Not multiple of 5`
                    }
                  },
                  {
                    type: 'boolean',
                    name: 'Boolean Validation',
                    color: 'purple',
                    constraints: [
                      'Only accepts true or false',
                      'Does not accept strings "true"/"false"',
                      'Does not accept numbers 1/0'
                    ],
                    example: {
                      schema: `{
  "type": "boolean"
}`,
                      valid: `true, false`,
                      invalid: `"true"  // String
1       // Number
null    // Null value`
                    }
                  },
                  {
                    type: 'array',
                    name: 'Array Validation',
                    color: 'yellow',
                    constraints: [
                      'items - Array element types',
                      'minItems / maxItems - Length restrictions',
                      'uniqueItems - Uniqueness constraint',
                      'additionalItems - Additional element control'
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
                      invalid: `[]           // Insufficient length
["a", "a"]   // Not unique
[1, 2, 3]    // Type error`
                    }
                  },
                  {
                    type: 'object',
                    name: 'Object Validation',
                    color: 'red',
                    constraints: [
                      'properties - Property definitions',
                      'required - Required properties',
                      'additionalProperties - Additional property control',
                      'minProperties / maxProperties - Property count restrictions'
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
                      valid: `{"name": "John"}`,
                      invalid: `{}               // Missing required field
{"name": "John", "age": 25}  // Additional properties not allowed`
                    }
                  }
                ].map((item) => (
                  <div key={item.type} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className={`text-xl font-semibold mb-4 text-${item.color}-600 dark:text-${item.color}-400`}>
                      {item.name} ({item.type})
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Validation Constraints</h4>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          {item.constraints.map((constraint, index) => (
                            <li key={index}>• {constraint}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Schema Example</h4>
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-3">
                          <pre className="text-xs overflow-x-auto">{item.example.schema}</pre>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <h5 className="text-green-600 dark:text-green-400 text-sm font-medium mb-1">✅ Valid Values</h5>
                            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                              <code className="text-xs text-green-800 dark:text-green-200">{item.example.valid}</code>
                            </div>
                          </div>
                          <div>
                            <h5 className="text-red-600 dark:text-red-400 text-sm font-medium mb-1">❌ Invalid Values</h5>
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

            {/* Error Handling */}
            <section id="error-handling" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <ExclamationTriangleIcon className="w-8 h-8 mr-3 text-orange-600" />
                Error Handling Strategies
              </h2>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Validation Error Information Structure</h3>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
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
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Error Information Fields</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <code>instancePath</code>: Path to erroneous data</li>
                      <li>• <code>schemaPath</code>: Corresponding schema path</li>
                      <li>• <code>keyword</code>: Failed validation keyword</li>
                      <li>• <code>params</code>: Validation parameters</li>
                      <li>• <code>message</code>: Error description</li>
                      <li>• <code>data</code>: Actual erroneous data</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">User-Friendly Error Handling</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• Convert technical errors to user-understandable information</li>
                      <li>• Provide repair suggestions</li>
                      <li>• Group errors by field</li>
                      <li>• Highlight error locations</li>
                      <li>• Provide correct format examples</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                  <h4 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">❌ Poor Error Information</h4>
                  <div className="space-y-2 text-red-700 dark:text-red-300 text-sm">
                    <div className="bg-red-100 dark:bg-red-800 p-2 rounded">
                      <code>&quot;must match format &apos;email&apos;&quot;</code>
                    </div>
                    <div className="bg-red-100 dark:bg-red-800 p-2 rounded">
                      <code>&quot;data.age must be &gt;= 0&quot;</code>
                    </div>
                    <p>Problem: Technical terminology, difficult for users to understand</p>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">✅ Good Error Information</h4>
                  <div className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                    <div className="bg-green-100 dark:bg-green-800 p-2 rounded">
                      <code>&quot;Email format is incorrect, please enter a valid email address&quot;</code>
                    </div>
                    <div className="bg-green-100 dark:bg-green-800 p-2 rounded">
                      <code>&quot;Age cannot be negative, please enter 0 or a positive integer&quot;</code>
                    </div>
                    <p>Advantage: Clear and understandable, provides solutions</p>
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
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3">JSON Validation Checklist</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Define complete schema</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Specify required fields</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Configure type constraints</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Implement user-friendly error handling</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Related Tools</h3>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li>• <Link href="/" className="hover:underline">JSON Formatting Tools</Link></li>
                    <li>• <Link href="/wiki/en/json-guide" className="hover:underline">Complete JSON Guide</Link></li>
                    <li>• <Link href="/wiki/en/json-performance" className="hover:underline">Performance Optimization Techniques</Link></li>
                    <li>• Schema Generation Tools</li>
                  </ul>
                </div>
              </div>
            </section>
          </article>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>This guide provides comprehensive knowledge about JSON validation, from basic concepts to practical applications, helping you ensure data quality.</p>
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