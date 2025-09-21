import { Metadata } from 'next';
import Header from '@/components/Header';
import Link from 'next/link';
import { ArrowLeftIcon, CodeBracketIcon, ClipboardDocumentIcon, ArrowDownTrayIcon, CheckCircleIcon, ExclamationTriangleIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'JSON → Interfaces TypeScript: Cómo Usar | JSON Tools',
  description: 'Genera interfaces TypeScript a partir de JSON. Funcionalidades soportadas, mapeo de tipos y pasos rápidos en la app JSON Tools.',
  keywords: 'JSON a TypeScript,interfaces TS,generación de código,tipos TypeScript,herramientas JSON',
  openGraph: {
    title: 'JSON → Interfaces TypeScript: Cómo Usar',
    description: 'Genera interfaces TypeScript desde JSON con tipos anidados y arreglos. Guía rápida y consejos.',
    type: 'article'
  }
};

export default function JsonToTypeScriptDocES() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navegación */}
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

          {/* Encabezado */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
              <CodeBracketIcon className="w-10 h-10 mr-3 text-blue-600" />
              JSON → Interfaces TypeScript
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Convierte JSON en interfaces TypeScript limpias. Soporta objetos anidados, arreglos e inferencia básica de tipos.
            </p>
          </header>

          {/* Índice */}
          <nav className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <CodeBracketIcon className="w-5 h-5 mr-2" />
              Índice
            </h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">Visión general</a></li>
              <li><a href="#quick-start" className="text-blue-600 dark:text-blue-400 hover:underline">Inicio rápido</a></li>
              <li><a href="#type-mapping" className="text-blue-600 dark:text-blue-400 hover:underline">Mapeo de tipos</a></li>
              <li><a href="#arrays-nested" className="text-blue-600 dark:text-blue-400 hover:underline">Arreglos y objetos anidados</a></li>
              <li><a href="#examples" className="text-blue-600 dark:text-blue-400 hover:underline">Ejemplo</a></li>
              <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">Consejos y limitaciones</a></li>
              <li><a href="#related" className="text-blue-600 dark:text-blue-400 hover:underline">Herramientas relacionadas</a></li>
            </ul>
          </nav>

          {/* Contenido */}
          <article className="prose prose-lg max-w-none dark:prose-invert">
            {/* Visión general */}
            <section id="overview" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <LightBulbIcon className="w-8 h-8 mr-3 text-yellow-600" />
                Visión general
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    Qué hace
                  </h3>
                  <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                    <li>• Genera interfaces TS a partir de JSON</li>
                    <li>• Conversión en tiempo real</li>
                    <li>• Interfaces hijas para objetos anidados</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center">
                    <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                    Requisitos de entrada
                  </h3>
                  <ul className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                    <li>• JSON válido y parseable</li>
                    <li>• Arreglo de nivel superior soportado (basado en el primer elemento)</li>
                    <li>• Arreglos heterogéneos requieren ajustes manuales</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Inicio rápido */}
            <section id="quick-start" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Inicio rápido</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Abre <Link href="/json-to-typescript" className="text-blue-600 dark:text-blue-400">/json-to-typescript</Link></li>
                <li>Pega el JSON en el editor izquierdo</li>
                <li>Revisa las interfaces generadas en el panel derecho</li>
                <li>Copia <ClipboardDocumentIcon className="inline w-4 h-4" /> o descarga <ArrowDownTrayIcon className="inline w-4 h-4" /></li>
              </ol>
            </section>

            {/* Mapeo de tipos */}
            <section id="type-mapping" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Mapeo de tipos</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Primitivos</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• string → string</li>
                    <li>• number → number</li>
                    <li>• boolean → boolean</li>
                    <li>• null → null</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Complejos</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• array → T[] (basado en el primer elemento)</li>
                    <li>• object → interfaz hija con nombre</li>
                    <li>• objeto anidado → interfaz separada + referencia</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Arreglos y objetos anidados */}
            <section id="arrays-nested" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Arreglos y objetos anidados</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Buen ejemplo</h3>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded border border-green-200 dark:border-green-800">
                    <pre className="text-sm text-green-800 dark:text-green-200 whitespace-pre-wrap">
{`{
  "users": [{ "id": 1, "name": "A" }]
}`}
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Requiere atención</h3>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded border border-yellow-200 dark:border-yellow-800">
                    <pre className="text-sm text-yellow-800 dark:text-yellow-200 whitespace-pre-wrap">
{`{
  "values": [1, "two", true]
}`}
                    </pre>
                    <p className="mt-2 text-xs text-yellow-700 dark:text-yellow-300">Tipos mixtos; ajusta a una unión o normaliza los datos.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Ejemplo */}
            <section id="examples" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Ejemplo</h2>
              <pre className="whitespace-pre-wrap">
{`JSON de entrada
{
  "name": "Alice",
  "age": 28,
  "active": true,
  "address": { "city": "Paris" },
  "tags": ["dev", "ts"]
}

Interfaces generadas
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

            {/* Consejos y limitaciones */}
            <section id="tips" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <LightBulbIcon className="w-8 h-8 mr-3 text-yellow-600" />
                Consejos y limitaciones
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recomendado</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Valida el JSON antes de convertir</li>
                    <li>• Renombra interfaces a nombres de dominio</li>
                    <li>• Añade opcionales (?) cuando corresponda</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Limitaciones</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Arreglos mixtos inferidos por el primer elemento</li>
                    <li>• Sin detección automática de opcionales/uniones</li>
                    <li>• Esquemas complejos pueden requerir ajustes</li>
                  </ul>
                </div>
              </div>
            </section>
          </article>

          {/* Herramientas relacionadas */}
          <section id="related" className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-12">
            <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Herramientas relacionadas</h2>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li>• <Link href="/" className="hover:underline">Herramientas de Formato JSON</Link></li>
              <li>• <Link href="/wiki/es/json-guide" className="hover:underline">Guía Completa de JSON</Link></li>
              <li>• <Link href="/wiki/es/json-validation" className="hover:underline">Guía de Validación JSON</Link></li>
              <li>• <Link href="/wiki/es/json-performance" className="hover:underline">Optimización de Rendimiento</Link></li>
            </ul>
          </section>

          {/* Pie de página */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>Usa el conversor para arrancar tipos rápido, luego refina según tu dominio.</p>
              <p className="mt-2">
                <Link href="/wiki/es" className="text-blue-600 dark:text-blue-400 hover:underline mr-4">Volver a la Base de Conocimiento</Link>
                <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">Volver a Herramientas JSON</Link>
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
