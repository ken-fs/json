import { Metadata } from 'next';
import Header from '@/components/Header';
import Link from 'next/link';
import { ArrowLeftIcon, CodeBracketIcon, ClipboardDocumentIcon, ArrowDownTrayIcon, CheckCircleIcon, ExclamationTriangleIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'JSON → Clases Java: Cómo Usar | JSON Tools',
  description: 'Genera clases Java (POJOs) desde JSON. Funcionalidades soportadas, mapeo de tipos y exportación de código.',
  keywords: 'JSON a Java,POJO,generación de código,clases Java,herramientas JSON',
  openGraph: {
    title: 'JSON → Clases Java: Cómo Usar',
    description: 'Genera clases Java desde JSON, incluyendo objetos anidados y listas genéricas. Pasos rápidos y consejos.',
    type: 'article'
  }
};

export default function JsonToJavaDocES() {
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
              JSON → Clases Java
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Convierte JSON en POJOs Java, incluyendo clases anidadas y <code>List&lt;T&gt;</code>. Ideal para maquetar modelos rápidamente.
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
              <li><a href="#collections-nested" className="text-blue-600 dark:text-blue-400 hover:underline">Colecciones y clases anidadas</a></li>
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
                    <li>• Genera clases Java basadas en los campos</li>
                    <li>• Crea getters/setters para cada campo</li>
                    <li>• Crea clases hijas para objetos anidados</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center">
                    <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                    Requisitos de entrada
                  </h3>
                  <ul className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                    <li>• JSON válido y parseable</li>
                    <li>• Arreglos inferidos por el primer elemento</li>
                    <li>• Ajusta los nombres generados a tu convención</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Inicio rápido */}
            <section id="quick-start" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Inicio rápido</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Abre <Link href="/json-to-java" className="text-blue-600 dark:text-blue-400">/json-to-java</Link></li>
                <li>Pega el JSON en el editor izquierdo</li>
                <li>Revisa las clases generadas en el panel derecho</li>
                <li>Copia <ClipboardDocumentIcon className="inline w-4 h-4" /> o descarga <ArrowDownTrayIcon className="inline w-4 h-4" /> el archivo <code>.java</code></li>
              </ol>
            </section>

            {/* Mapeo de tipos */}
            <section id="type-mapping" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Mapeo de tipos</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Primitivos</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• string → String</li>
                    <li>• entero → int; flotante → double</li>
                    <li>• boolean → boolean</li>
                    <li>• null → Object</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Complejos</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• array → List&lt;T&gt; (basado en el primer elemento)</li>
                    <li>• object → clase hija (capitalizada)</li>
                    <li>• objeto anidado → clase separada + referencia</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Colecciones y clases anidadas */}
            <section id="collections-nested" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Colecciones y clases anidadas</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Buen ejemplo</h3>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded border border-green-200 dark:border-green-800">
                    <pre className="text-sm text-green-800 dark:text-green-200 whitespace-pre-wrap">
{`{
  "items": [{ "id": 1, "name": "Book" }]
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
                    <p className="mt-2 text-xs text-yellow-700 dark:text-yellow-300">Tipos mixtos; usa Object o normaliza a tipos consistentes.</p>
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
  "id": 1,
  "name": "Book",
  "tags": ["tech"],
  "author": { "name": "Tom" }
}

Generado en Java
public class RootObject {
    private int id;
    private String name;
    private List<String> tags;
    private Author author;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
    public Author getAuthor() { return author; }
    public void setAuthor(Author author) { this.author = author; }
}

public class Author {
    private String name;
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
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
                    <li>• Valida el JSON y los nombres de campos</li>
                    <li>• Añade paquetes/anotaciones según sea necesario (p. ej., Lombok)</li>
                    <li>• Renombra clases a nombres de dominio significativos</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Limitaciones</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Arreglos mixtos inferidos por el primer elemento</li>
                    <li>• Sin gestión de paquetes/imports más allá de List</li>
                    <li>• No se generan anotaciones de serialización</li>
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
              <p>Genera POJOs rápidamente y luego ajusta modificadores, paquetes y anotaciones para producción.</p>
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
