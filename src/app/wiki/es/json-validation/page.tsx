import { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, AcademicCapIcon, CheckCircleIcon, ExclamationTriangleIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Guía Completa de Validación y Schema JSON - Tutorial de JSON Schema | JSON Tools",
  description: "Aprende validación de datos JSON en profundidad: sintaxis de JSON Schema, reglas de validación, manejo de errores y mejores prácticas. Guía profesional para asegurar calidad de datos.",
  keywords: "validación JSON,JSON Schema,validación datos,calidad datos,validación formato JSON,diseño schema,reglas validación",
  openGraph: {
    title: "Guía Completa de Validación y Schema JSON - Tutorial de JSON Schema",
    description: "Aprende a usar JSON Schema para validación de datos con guía completa, incluyendo ejemplos prácticos y mejores prácticas.",
    type: "article"
  },
  other: {
    "article:author": "JSON Tools",
    "article:published_time": "2024-01-01",
    "article:modified_time": new Date().toISOString(),
    "article:section": "Validación",
    "article:tag": "Validación JSON,JSON Schema,Validación Datos,Reglas Validación"
  }
};

export default function JSONValidationSpanishPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center space-x-4 mb-6">
            <Link 
              href="/wiki/es" 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Volver a la Base de Conocimiento
            </Link>
            <span className="text-gray-400">|</span>
            <Link 
              href="/" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Volver a Herramientas JSON
            </Link>
          </div>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <ShieldCheckIcon className="w-10 h-10 mr-4 text-purple-600" />
              Validación y Schema JSON
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Guía completa para usar JSON Schema para asegurar calidad y consistencia de datos
            </p>
          </header>

          {/* Table of Contents */}
          <nav className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <AcademicCapIcon className="w-5 h-5 mr-2" />
              Índice
            </h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#what-is-validation" className="text-blue-600 dark:text-blue-400 hover:underline">¿Qué es la Validación JSON?</a></li>
              <li><a href="#json-schema-basics" className="text-blue-600 dark:text-blue-400 hover:underline">Fundamentos de JSON Schema</a></li>
              <li><a href="#data-types-validation" className="text-blue-600 dark:text-blue-400 hover:underline">Validación de Tipos de Datos</a></li>
              <li><a href="#advanced-validation" className="text-blue-600 dark:text-blue-400 hover:underline">Reglas de Validación Avanzadas</a></li>
              <li><a href="#error-handling" className="text-blue-600 dark:text-blue-400 hover:underline">Estrategias de Manejo de Errores</a></li>
              <li><a href="#practical-examples" className="text-blue-600 dark:text-blue-400 hover:underline">Ejemplos Prácticos</a></li>
              <li><a href="#tools-libraries" className="text-blue-600 dark:text-blue-400 hover:underline">Herramientas y Bibliotecas Recomendadas</a></li>
            </ul>
          </nav>

          {/* Content */}
          <article className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* What is JSON Validation */}
            <section id="what-is-validation" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">¿Qué es la Validación JSON?</h2>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6 border border-blue-200 dark:border-blue-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>La validación JSON</strong> es el proceso de asegurar que los datos JSON cumplan con una estructura y reglas predefinidas. A través de la validación, podemos:
                </p>
                <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Asegurar formato correcto de datos</li>
                  <li>• Verificar existencia de campos obligatorios</li>
                  <li>• Comprobar coincidencia de tipos de datos</li>
                  <li>• Aplicar restricciones de reglas de negocio</li>
                  <li>• Proporcionar información clara de errores</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    Beneficios de la Validación
                  </h3>
                  <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                    <li>• Mejorar calidad de datos</li>
                    <li>• Reducir errores en tiempo de ejecución</li>
                    <li>• Aumentar robustez de API</li>
                    <li>• Mejorar experiencia del usuario</li>
                    <li>• Facilitar depuración y mantenimiento</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                    Momentos de Validación
                  </h3>
                  <ul className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                    <li>• Validación de entrada del cliente</li>
                    <li>• Verificación de datos de interfaz API</li>
                    <li>• Validación antes de almacenar en base de datos</li>
                    <li>• Al cargar archivos de configuración</li>
                    <li>• Proceso de importación y exportación de datos</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* JSON Schema Basics */}
            <section id="json-schema-basics" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Fundamentos de JSON Schema</h2>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Estructura Básica de Schema</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ejemplo de Schema Simple</h4>
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                      <pre className="text-sm overflow-x-auto">
{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://ejemplo.com/usuario.schema.json",
  "title": "Usuario",
  "description": "Estructura de información de usuario",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "minimum": 1
    },
    "nombre": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "edad": {
      "type": "integer",
      "minimum": 0,
      "maximum": 150
    }
  },
  "required": ["id", "nombre", "email"],
  "additionalProperties": false
}`}
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Datos JSON Válidos Correspondientes</h4>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                      <pre className="text-sm overflow-x-auto text-green-800 dark:text-green-200">
{`{
  "id": 123,
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "edad": 28
}`}
                      </pre>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 mt-4">Ejemplo de Datos JSON Inválidos</h4>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                      <pre className="text-sm overflow-x-auto text-red-800 dark:text-red-200">
{`{
  "id": "abc",              // Error: debería ser entero
  "nombre": "",             // Error: longitud no puede ser 0
  "email": "email-inválido", // Error: formato de email incorrecto
  "edad": -5                // Error: edad no puede ser negativa
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Explicación de Palabras Clave del Schema</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Palabras Clave Básicas</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">$schema</code>
                        <span className="text-gray-600 dark:text-gray-300">Especifica versión del Schema</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">$id</code>
                        <span className="text-gray-600 dark:text-gray-300">Identificador único del Schema</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">title</code>
                        <span className="text-gray-600 dark:text-gray-300">Título del Schema</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">description</code>
                        <span className="text-gray-600 dark:text-gray-300">Descripción del Schema</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">type</code>
                        <span className="text-gray-600 dark:text-gray-300">Tipo de datos</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Palabras Clave de Restricción</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs font-mono">required</code>
                        <span className="text-gray-600 dark:text-gray-300">Lista de campos obligatorios</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs font-mono">properties</code>
                        <span className="text-gray-600 dark:text-gray-300">Definición de propiedades de objeto</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs font-mono">minimum</code>
                        <span className="text-gray-600 dark:text-gray-300">Valor mínimo de número</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs font-mono">maximum</code>
                        <span className="text-gray-600 dark:text-gray-300">Valor máximo de número</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs font-mono">minLength</code>
                        <span className="text-gray-600 dark:text-gray-300">Longitud mínima de cadena</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Types Validation */}
            <section id="data-types-validation" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Validación de Tipos de Datos</h2>
              
              <div className="space-y-6">
                {[
                  {
                    type: 'string',
                    name: 'Validación de Cadenas',
                    color: 'blue',
                    constraints: [
                      'minLength / maxLength - Limitación de longitud',
                      'pattern - Coincidencia de expresiones regulares',
                      'format - Formato predefinido (email, date, uri, etc.)',
                      'enum - Limitación de valores enumerados'
                    ],
                    example: {
                      schema: `{
  "type": "string",
  "minLength": 3,
  "maxLength": 50,
  "pattern": "^[A-Za-z0-9]+$",
  "format": "email"
}`,
                      valid: `"usuario@ejemplo.com"`,
                      invalid: `"ab"  // Longitud insuficiente
"usuario@"  // Formato incorrecto`
                    }
                  },
                  {
                    type: 'number/integer',
                    name: 'Validación de Números',
                    color: 'green',
                    constraints: [
                      'minimum / maximum - Rango de valores',
                      'exclusiveMinimum / exclusiveMaximum - Rango exclusivo',
                      'multipleOf - Restricción de múltiplos',
                      'Distinción entre integer vs number'
                    ],
                    example: {
                      schema: `{
  "type": "integer",
  "minimum": 1,
  "maximum": 100,
  "multipleOf": 5
}`,
                      valid: `15, 25, 50`,
                      invalid: `0    // Menor que valor mínimo
150  // Excede valor máximo
13   // No es múltiplo de 5`
                    }
                  },
                  {
                    type: 'boolean',
                    name: 'Validación de Booleanos',
                    color: 'purple',
                    constraints: [
                      'Solo acepta true o false',
                      'No acepta cadenas "true"/"false"',
                      'No acepta números 1/0'
                    ],
                    example: {
                      schema: `{
  "type": "boolean"
}`,
                      valid: `true, false`,
                      invalid: `"true"  // Cadena
1       // Número
null    // Valor nulo`
                    }
                  },
                  {
                    type: 'array',
                    name: 'Validación de Arrays',
                    color: 'yellow',
                    constraints: [
                      'items - Tipo de elementos del array',
                      'minItems / maxItems - Limitación de longitud',
                      'uniqueItems - Restricción de unicidad',
                      'additionalItems - Control de elementos adicionales'
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
                      invalid: `[]           // Longitud insuficiente
["a", "a"]   // No único
[1, 2, 3]    // Error de tipo`
                    }
                  },
                  {
                    type: 'object',
                    name: 'Validación de Objetos',
                    color: 'red',
                    constraints: [
                      'properties - Definición de propiedades',
                      'required - Propiedades obligatorias',
                      'additionalProperties - Control de propiedades adicionales',
                      'minProperties / maxProperties - Limitación de cantidad de propiedades'
                    ],
                    example: {
                      schema: `{
  "type": "object",
  "properties": {
    "nombre": {"type": "string"}
  },
  "required": ["nombre"],
  "additionalProperties": false
}`,
                      valid: `{"nombre": "Juan"}`,
                      invalid: `{}               // Falta campo obligatorio
{"nombre": "Juan", "edad": 25}  // No permite propiedades adicionales`
                    }
                  }
                ].map((item) => (
                  <div key={item.type} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className={`text-xl font-semibold mb-4 text-${item.color}-600 dark:text-${item.color}-400`}>
                      {item.name} ({item.type})
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Restricciones de Validación</h4>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          {item.constraints.map((constraint, index) => (
                            <li key={index}>• {constraint}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ejemplo de Schema</h4>
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-3">
                          <pre className="text-xs overflow-x-auto">{item.example.schema}</pre>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <h5 className="text-green-600 dark:text-green-400 text-sm font-medium mb-1">✅ Valores Válidos</h5>
                            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                              <code className="text-xs text-green-800 dark:text-green-200">{item.example.valid}</code>
                            </div>
                          </div>
                          <div>
                            <h5 className="text-red-600 dark:text-red-400 text-sm font-medium mb-1">❌ Valores Inválidos</h5>
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
                Estrategias de Manejo de Errores
              </h2>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Estructura de Información de Error de Validación</h3>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <pre className="text-sm overflow-x-auto">
{`{
  "valido": false,
  "errores": [
    {
      "rutaInstancia": "/usuario/email",
      "rutaSchema": "#/properties/usuario/properties/email/format",
      "palabraClave": "format",
      "parametros": {"format": "email"},
      "mensaje": "debe coincidir con formato \\"email\\"",
      "datos": "email-inválido"
    },
    {
      "rutaInstancia": "/usuario/edad",
      "rutaSchema": "#/properties/usuario/properties/edad/minimum",
      "palabraClave": "minimum", 
      "parametros": {"minimum": 0},
      "mensaje": "debe ser >= 0",
      "datos": -5
    }
  ]
}`}
                  </pre>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Explicación de Campos de Información de Error</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <code>rutaInstancia</code>: Ruta de datos con error</li>
                      <li>• <code>rutaSchema</code>: Ruta correspondiente del Schema</li>
                      <li>• <code>palabraClave</code>: Palabra clave de validación fallida</li>
                      <li>• <code>parametros</code>: Parámetros de validación</li>
                      <li>• <code>mensaje</code>: Descripción del error</li>
                      <li>• <code>datos</code>: Datos reales con error</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Manejo de Errores Amigable al Usuario</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• Convertir errores técnicos en información comprensible para el usuario</li>
                      <li>• Proporcionar sugerencias de reparación</li>
                      <li>• Mostrar errores agrupados por campo</li>
                      <li>• Resaltar ubicaciones de error</li>
                      <li>• Proporcionar ejemplos de formato correcto</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                  <h4 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">❌ Información de Error Pobre</h4>
                  <div className="space-y-2 text-red-700 dark:text-red-300 text-sm">
                    <div className="bg-red-100 dark:bg-red-800 p-2 rounded">
                      <code>&quot;debe coincidir con formato &apos;email&apos;&quot;</code>
                    </div>
                    <div className="bg-red-100 dark:bg-red-800 p-2 rounded">
                      <code>&quot;data.edad debe ser &gt;= 0&quot;</code>
                    </div>
                    <p>Problema: Terminología técnica, difícil de entender para el usuario</p>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">✅ Información de Error Buena</h4>
                  <div className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                    <div className="bg-green-100 dark:bg-green-800 p-2 rounded">
                      <code>&quot;Formato de email incorrecto, por favor ingrese un email válido&quot;</code>
                    </div>
                    <div className="bg-green-100 dark:bg-green-800 p-2 rounded">
                      <code>&quot;La edad no puede ser negativa, por favor ingrese 0 o un entero positivo&quot;</code>
                    </div>
                    <p>Ventaja: Claro y comprensible, proporciona soluciones</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Reference */}
            <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-12">
              <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                Referencia Rápida
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Checklist de Validación JSON</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Definir Schema completo</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Especificar campos obligatorios</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Configurar restricciones de tipo</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Implementar manejo de errores amigable</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Herramientas Relacionadas</h3>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li>• <Link href="/" className="hover:underline">Herramientas de Formateo JSON</Link></li>
                    <li>• <Link href="/wiki/es/json-guide" className="hover:underline">Guía Completa de JSON</Link></li>
                    <li>• <Link href="/wiki/es/json-performance" className="hover:underline">Técnicas de Optimización de Rendimiento</Link></li>
                    <li>• Herramientas de Generación de Schema</li>
                  </ul>
                </div>
              </div>
            </section>
          </article>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>Esta guía proporciona un sistema completo de conocimiento sobre validación JSON, desde conceptos básicos hasta aplicaciones prácticas, ayudándote a asegurar la calidad de los datos.</p>
              <p className="mt-2">
                <Link href="/wiki/es" className="text-blue-600 dark:text-blue-400 hover:underline mr-4">
                  Volver a la Base de Conocimiento
                </Link>
                <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Volver a la Página Principal de Herramientas JSON
                </Link>
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}