import { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, BoltIcon, ChartBarIcon, CpuChipIcon, ServerIcon, ClockIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Optimización de Rendimiento JSON - Guía de Mejores Prácticas | JSON Tools",
  description: "Aprende técnicas avanzadas de optimización de rendimiento JSON: parsing eficiente, compresión, streaming y estrategias para manejar datos masivos con mejor rendimiento.",
  keywords: "rendimiento JSON,optimización JSON,parsing JSON,compresión JSON,streaming JSON,big data JSON"
};

export default function JSONPerformanceSpanishPage() {
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
              <BoltIcon className="w-10 h-10 mr-4 text-yellow-600" />
              Optimización de Rendimiento JSON
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Guía completa para optimizar el rendimiento de JSON: técnicas de parsing, compresión y manejo eficiente de datos masivos
            </p>
          </header>

          <article className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* Quick Performance Tips */}
            <section className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-12">
              <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-4 flex items-center">
                <BoltIcon className="w-6 h-6 mr-2" />
                Consejos Rápidos de Rendimiento
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">Optimización Básica</h3>
                  <ul className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                    <li>• Minimizar estructura JSON innecesaria</li>
                    <li>• Usar nombres de campo cortos y descriptivos</li>
                    <li>• Evitar anidación profunda (&gt;5 niveles)</li>
                    <li>• Comprimir respuestas HTTP (gzip/brotli)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">Técnicas Avanzadas</h3>
                  <ul className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                    <li>• Implementar streaming para datos grandes</li>
                    <li>• Usar parsers incrementales</li>
                    <li>• Aplicar paginación y filtrado</li>
                    <li>• Optimizar estructuras de datos</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* JSON Parsing Optimization */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <CpuChipIcon className="w-8 h-8 mr-3 text-blue-600" />
                Optimización del Parsing JSON
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Parsing Síncrono vs Asíncrono
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Síncrono (Datos Pequeños)</h4>
                      <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
{`// Parsing directo para objetos pequeños
const data = JSON.parse(jsonString);
console.log(data);`}
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Asíncrono (Datos Grandes)</h4>
                      <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
{`// Parsing no bloqueante
setTimeout(() => {
  const data = JSON.parse(largeJsonString);
  callback(data);
}, 0);`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Parsers de Alto Rendimiento
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">JavaScript Nativo</h4>
                      <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
{`// Parser nativo más rápido
const data = JSON.parse(jsonString);`}
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Parser Streaming</h4>
                      <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
{`// Usando librería de streaming
const parser = new StreamingJsonParser();
parser.onValue = (value) => processValue(value);`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
                  Mejores Prácticas para Parsing
                </h3>
                <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                  <li>• <strong>Validar entrada:</strong> Verificar formato antes del parsing</li>
                  <li>• <strong>Manejo de errores:</strong> Usar try-catch para capturar errores</li>
                  <li>• <strong>Límites de memoria:</strong> Establecer límites para prevenir sobrecarga</li>
                  <li>• <strong>Parsing incremental:</strong> Procesar datos en fragmentos para archivos grandes</li>
                </ul>
              </div>
            </section>

            {/* Memory Management */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <ServerIcon className="w-8 h-8 mr-3 text-green-600" />
                Gestión de Memoria
              </h2>
              
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Técnicas de Optimización de Memoria
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Liberación de Referencias</h4>
                      <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
{`// Liberar referencias después del uso
let largeData = JSON.parse(jsonString);
processData(largeData);
largeData = null; // Liberar memoria`}
                      </pre>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Procesamiento por Chunks</h4>
                      <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
{`// Procesar en fragmentos pequeños
const processChunk = (chunk) => {
  const data = JSON.parse(chunk);
  // Procesar inmediatamente
  return processData(data);
};`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
                    Estrategias de Gestión de Memoria
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Streaming</h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Procesar datos sin cargar todo en memoria
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Lazy Loading</h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Cargar datos solo cuando se necesiten
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Paginación</h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Dividir datos grandes en páginas manejables
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Big Data Handling */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <ChartBarIcon className="w-8 h-8 mr-3 text-purple-600" />
                Manejo de Datos Masivos
              </h2>
              
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Estrategias para Archivos JSON Grandes
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">1. Streaming JSON</h4>
                      <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-sm overflow-x-auto">
{`// Ejemplo de streaming JSON
const fs = require('fs');
const JSONStream = require('JSONStream');

fs.createReadStream('large-data.json')
  .pipe(JSONStream.parse('*'))
  .on('data', (item) => {
    // Procesar cada item individualmente
    processItem(item);
  })
  .on('end', () => {
    console.log('Procesamiento completado');
  });`}
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">2. Paginación de API</h4>
                      <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-sm overflow-x-auto">
{`// Implementar paginación efectiva
const fetchPagedData = async (page = 1, limit = 100) => {
  const response = await fetch(
    \`/api/data?page=\${page}&limit=\${limit}\`
  );
  return response.json();
};

// Procesamiento por lotes
let page = 1;
let hasMore = true;

while (hasMore) {
  const data = await fetchPagedData(page, 100);
  processData(data.items);
  hasMore = data.hasNext;
  page++;
}`}
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">3. Compresión de Datos</h4>
                      <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-sm overflow-x-auto">
{`// Compresión en servidor (Express.js)
const compression = require('compression');
app.use(compression({
  level: 6,           // Nivel de compresión
  threshold: 1024,    // Comprimir archivos > 1KB
  filter: (req, res) => {
    return req.headers['x-no-compression'] 
      ? false 
      : compression.filter(req, res);
  }
}));`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4">
                    Técnicas de Optimización para Big Data
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Cliente</h4>
                      <ul className="space-y-1 text-sm text-purple-700 dark:text-purple-300">
                        <li>• Virtual scrolling para listas largas</li>
                        <li>• Lazy loading de componentes</li>
                        <li>• Debouncing para búsquedas</li>
                        <li>• Caché inteligente de datos</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Servidor</h4>
                      <ul className="space-y-1 text-sm text-purple-700 dark:text-purple-300">
                        <li>• Indexación de bases de datos</li>
                        <li>• Respuestas comprimidas (gzip/brotli)</li>
                        <li>• CDN para distribución global</li>
                        <li>• Caché de resultados frecuentes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Performance Monitoring */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <ClockIcon className="w-8 h-8 mr-3 text-red-600" />
                Monitoreo de Rendimiento
              </h2>
              
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Herramientas de Medición
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Performance API</h4>
                      <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
{`// Medir tiempo de parsing
performance.mark('parse-start');
const data = JSON.parse(jsonString);
performance.mark('parse-end');

performance.measure(
  'json-parse', 
  'parse-start', 
  'parse-end'
);

const measure = performance.getEntriesByName('json-parse')[0];
console.log(\`Parsing tomó \${measure.duration}ms\`);`}
                      </pre>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Memory Usage</h4>
                      <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
{`// Monitorear uso de memoria
const measureMemory = () => {
  if (performance.memory) {
    return {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit
    };
  }
  return null;
};

console.log('Memoria:', measureMemory());`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
                    Métricas Clave de Rendimiento
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Tiempo de Parsing</h4>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        Medir cuánto tarda en procesar JSON
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Uso de Memoria</h4>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        Monitorear consumo de RAM
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Tiempo de Respuesta</h4>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        Latencia de red y procesamiento
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Best Practices Summary */}
            <section className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Resumen de Mejores Prácticas
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Optimización de Estructura
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Minimizar anidación profunda</li>
                    <li>• Usar nombres de campo descriptivos pero cortos</li>
                    <li>• Evitar datos redundantes</li>
                    <li>• Normalizar estructuras cuando sea posible</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Optimización de Transmisión
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Implementar compresión HTTP</li>
                    <li>• Usar CDN para distribución global</li>
                    <li>• Aplicar caché apropiado</li>
                    <li>• Implementar paginación efectiva</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 text-center">
                  <strong>Recuerda:</strong> La optimización prematura puede ser contraproducente. 
                  Mide primero, optimiza después, y siempre considera el equilibrio entre rendimiento y legibilidad del código.
                </p>
              </div>
            </section>
          </article>

          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>Esta guía proporciona técnicas esenciales para optimizar el rendimiento de JSON en aplicaciones modernas, desde parsing básico hasta manejo de datos masivos.</p>
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