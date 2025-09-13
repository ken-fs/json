import { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, CodeBracketIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Mejores Prácticas para API JSON - Guía de Diseño RESTful | JSON Tools",
  description: "Aprende a diseñar APIs JSON de alta calidad: convenciones de nomenclatura, códigos de estado, manejo de errores y optimización de rendimiento.",
  keywords: "API JSON,API RESTful,diseño API,mejores prácticas,estándares API,REST API"
};

export default function JSONAPIBestPracticesSpanishPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/wiki/es" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Volver a la Base de Conocimiento
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Volver a Herramientas JSON
            </Link>
          </div>

          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <CodeBracketIcon className="w-10 h-10 mr-4 text-green-600" />
              Mejores Prácticas para API JSON
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Guía completa para diseñar APIs JSON de alta calidad, fáciles de mantener y amigables para el usuario
            </p>
          </header>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
            <DocumentTextIcon className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
              Contenido en Desarrollo
            </h2>
            <p className="text-blue-700 dark:text-blue-300 mb-6">
              Estamos preparando contenido completo sobre mejores prácticas para APIs JSON. 
              Próximamente encontrarás información detallada sobre:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 text-blue-700 dark:text-blue-300 mb-6">
              <li>• Principios de diseño de API RESTful</li>
              <li>• Convenciones de nomenclatura y estructura</li>
              <li>• Uso correcto de métodos HTTP</li>
              <li>• Códigos de estado y manejo de errores</li>
              <li>• Estrategias de paginación y filtrado</li>
              <li>• Optimización de rendimiento y seguridad</li>
            </ul>
            <div className="space-y-4">
              <Link href="/wiki/es/json-guide" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mr-4">
                Leer Guía Completa de JSON
              </Link>
              <Link href="/" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                Usar Herramientas JSON
              </Link>
            </div>
          </div>

          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p className="mt-2">
                <Link href="/wiki/es" className="text-blue-600 dark:text-blue-400 hover:underline mr-4">
                  Volver a la Base de Conocimiento
                </Link>
                <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Volver a Herramientas JSON
                </Link>
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}