import { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, BookOpenIcon, CodeBracketIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Guía Completa de JSON - Formato de Intercambio de Datos Explicado | JSON Tools",
  description: "Guía completa sobre JSON (JavaScript Object Notation): reglas de sintaxis, tipos de datos, casos de uso y mejores prácticas. Ejemplos detallados y tutorial JSON optimizado para SEO.",
  keywords: "JSON,formato datos,API,REST,JavaScript,intercambio datos,tutorial JSON,sintaxis JSON,ejemplos JSON",
  openGraph: {
    title: "Guía Completa de JSON - Formato de Intercambio de Datos Explicado",
    description: "Guía completa sobre formato JSON: desde sintaxis básica hasta aplicaciones prácticas, incluyendo ejemplos ricos y mejores prácticas.",
    type: "article"
  },
  other: {
    "article:author": "JSON Tools",
    "article:published_time": "2024-01-01",
    "article:modified_time": new Date().toISOString()
  }
};

export default function JSONGuideSpanishPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Guía Completa de JSON
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Profundiza en JSON (JavaScript Object Notation): el formato estándar para el intercambio de datos moderno
            </p>
          </header>

          {/* Table of Contents */}
          <nav className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <BookOpenIcon className="w-5 h-5 mr-2" />
              Índice
            </h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#what-is-json" className="text-blue-600 dark:text-blue-400 hover:underline">¿Qué es JSON?</a></li>
              <li><a href="#json-syntax" className="text-blue-600 dark:text-blue-400 hover:underline">Reglas de Sintaxis JSON</a></li>
              <li><a href="#data-types" className="text-blue-600 dark:text-blue-400 hover:underline">Tipos de Datos Explicados</a></li>
              <li><a href="#use-cases" className="text-blue-600 dark:text-blue-400 hover:underline">Casos de Uso</a></li>
              <li><a href="#best-practices" className="text-blue-600 dark:text-blue-400 hover:underline">Mejores Prácticas</a></li>
              <li><a href="#common-errors" className="text-blue-600 dark:text-blue-400 hover:underline">Errores Comunes</a></li>
              <li><a href="#tools" className="text-blue-600 dark:text-blue-400 hover:underline">Herramientas JSON</a></li>
            </ul>
          </nav>

          {/* Content */}
          <article className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* What is JSON */}
            <section id="what-is-json" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <DocumentTextIcon className="w-8 h-8 mr-3 text-blue-600" />
                ¿Qué es JSON?
              </h2>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>JSON (JavaScript Object Notation)</strong> es un formato ligero y basado en texto para el intercambio de datos.
                  A pesar de tener &ldquo;JavaScript&rdquo; en su nombre, JSON es en realidad un formato de datos independiente del lenguaje,
                  con soporte nativo para análisis y generación en prácticamente todos los lenguajes de programación modernos.
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Características Principales</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Legible por Humanos</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Formato de texto claro con estructura intuitiva de pares clave-valor
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Amigable para Máquinas</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Reglas de sintaxis simples, velocidad de análisis rápida
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Independiente del Lenguaje</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Compatible con todos los principales lenguajes de programación
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Ligero</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Más conciso que XML, menor tamaño de transmisión
                  </p>
                </div>
              </div>
            </section>

            {/* JSON Syntax */}
            <section id="json-syntax" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <CodeBracketIcon className="w-8 h-8 mr-3 text-green-600" />
                Reglas de Sintaxis JSON
              </h2>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                JSON se basa en dos estructuras:
              </p>
              
              <ul className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Objetos</strong>: Una colección de pares nombre/valor (similar a diccionarios, tablas hash)</li>
                <li><strong>Arrays</strong>: Una lista ordenada de valores (similar a arrays o vectores)</li>
              </ul>

              <div className="bg-gray-800 rounded-lg p-6 mb-6 overflow-x-auto">
                <h4 className="text-white font-semibold mb-4">Ejemplo de Sintaxis Básica</h4>
                <pre className="text-green-400 text-sm">
{`{
  "nombre": "Juan Pérez",
  "edad": 30,
  "activo": true,
  "direccion": {
    "ciudad": "Madrid",
    "codigoPostal": "28001"
  },
  "aficiones": ["programación", "lectura", "viajes"],
  "conyuge": null
}`}
                </pre>
              </div>
            </section>

            {/* Quick Reference Section */}
            <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-12">
              <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                Referencia Rápida
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Tipos de Datos JSON</h3>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li>• <code>string</code> - Texto entre comillas dobles</li>
                    <li>• <code>number</code> - Números enteros o decimales</li>
                    <li>• <code>boolean</code> - true o false</li>
                    <li>• <code>null</code> - Valor nulo</li>
                    <li>• <code>object</code> - Colección de pares clave-valor</li>
                    <li>• <code>array</code> - Lista ordenada de valores</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Herramientas Relacionadas</h3>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li>• <Link href="/" className="hover:underline">Formateador JSON</Link></li>
                    <li>• <Link href="/wiki/es/json-validation" className="hover:underline">Guía de Validación JSON</Link></li>
                    <li>• <Link href="/wiki/es/json-performance" className="hover:underline">Optimización de Rendimiento</Link></li>
                    <li>• <Link href="/wiki/es/json-api-best-practices" className="hover:underline">Mejores Prácticas de API</Link></li>
                  </ul>
                </div>
              </div>
            </section>
          </article>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>Esta guía cubre los conceptos fundamentales y aplicaciones prácticas de JSON, adecuada para que principiantes aprendan y desarrolladores profesionales consulten.</p>
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