import { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, RocketLaunchIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Guia Completo de Otimização de Performance JSON - Processamento de Big Data e Gerenciamento de Memória | JSON Tools",
  description: "Aprenda otimização de performance JSON: otimização de parsing, gerenciamento de memória, processamento de big data, estratégias de compressão e técnicas práticas. Guia profissional para melhorar performance de aplicações.",
  keywords: "otimização performance JSON,parsing JSON,gerenciamento memória,processamento big data,compressão JSON,ajuste performance,técnicas otimização JSON",
  openGraph: {
    title: "Guia Completo de Otimização de Performance JSON - Processamento de Big Data e Gerenciamento de Memória",
    description: "Aprenda otimização de performance JSON com guia completo, incluindo otimização de parsing, gerenciamento de memória e técnicas práticas.",
    type: "article"
  },
  other: {
    "article:author": "JSON Tools",
    "article:published_time": "2024-01-01",
    "article:modified_time": new Date().toISOString(),
    "article:section": "Otimização de Performance",
    "article:tag": "Performance JSON,Otimização Performance,Big Data,Gerenciamento Memória"
  }
};

export default function JSONPerformancePortuguesePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center space-x-4 mb-6">
            <Link 
              href="/wiki/pt" 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Voltar à Base de Conhecimento
            </Link>
            <span className="text-gray-400">|</span>
            <Link 
              href="/" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Voltar às Ferramentas JSON
            </Link>
          </div>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <RocketLaunchIcon className="w-10 h-10 mr-4 text-orange-600" />
              Otimização de Performance JSON
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Domine técnicas de otimização de performance JSON para melhorar a velocidade de resposta e utilização de recursos das aplicações
            </p>
          </header>

          {/* Table of Contents */}
          <nav className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <ChartBarIcon className="w-5 h-5 mr-2" />
              Índice
            </h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#performance-basics" className="text-blue-600 dark:text-blue-400 hover:underline">Fundamentos de Otimização de Performance</a></li>
              <li><a href="#parsing-optimization" className="text-blue-600 dark:text-blue-400 hover:underline">Otimização de Performance de Parsing</a></li>
              <li><a href="#memory-management" className="text-blue-600 dark:text-blue-400 hover:underline">Estratégias de Gerenciamento de Memória</a></li>
              <li><a href="#large-data-handling" className="text-blue-600 dark:text-blue-400 hover:underline">Processamento de Big Data</a></li>
              <li><a href="#compression-strategies" className="text-blue-600 dark:text-blue-400 hover:underline">Estratégias de Compressão</a></li>
              <li><a href="#streaming-processing" className="text-blue-600 dark:text-blue-400 hover:underline">Processamento de Stream</a></li>
              <li><a href="#caching-strategies" className="text-blue-600 dark:text-blue-400 hover:underline">Estratégias de Cache</a></li>
              <li><a href="#performance-monitoring" className="text-blue-600 dark:text-blue-400 hover:underline">Monitoramento de Performance</a></li>
            </ul>
          </nav>

          {/* Content */}
          <article className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* Performance Basics */}
            <section id="performance-basics" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Fundamentos de Otimização de Performance</h2>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">Fatores de Impacto na Performance</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Características dos Dados</h4>
                    <ul className="space-y-1 text-blue-700 dark:text-blue-300 text-sm">
                      <li>• Tamanho do arquivo JSON</li>
                      <li>• Profundidade de aninhamento</li>
                      <li>• Comprimento de arrays</li>
                      <li>• Comprimento de strings</li>
                      <li>• Complexidade dos tipos de dados</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Fatores do Ambiente</h4>
                    <ul className="space-y-1 text-blue-700 dark:text-blue-300 text-sm">
                      <li>• Tamanho da memória disponível</li>
                      <li>• Capacidade de processamento da CPU</li>
                      <li>• Largura de banda da rede</li>
                      <li>• Performance de I/O de armazenamento</li>
                      <li>• Escolha do parser</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    Objetivos de Otimização
                  </h3>
                  <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                    <li>• Reduzir tempo de parsing</li>
                    <li>• Diminuir uso de memória</li>
                    <li>• Melhorar throughput</li>
                    <li>• Aprimorar experiência do usuário</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                    Gargalos de Performance
                  </h3>
                  <ul className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                    <li>• Parsing de arquivos grandes</li>
                    <li>• Estruturas profundamente aninhadas</li>
                    <li>• Serialização frequente</li>
                    <li>• Fragmentação de memória</li>
                  </ul>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                  <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-3">
                    Princípios de Otimização
                  </h3>
                  <ul className="space-y-2 text-orange-700 dark:text-orange-300 text-sm">
                    <li>• Medição primeiro</li>
                    <li>• Otimização direcionada</li>
                    <li>• Balanceamento de trade-offs</li>
                    <li>• Monitoramento contínuo</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Parsing Optimization */}
            <section id="parsing-optimization" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Otimização de Performance de Parsing</h2>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Escolha de Parsers de Alta Performance</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Comparação de Parsers JavaScript</h4>
                      <div className="space-y-3">
                        <div className="border-l-4 border-green-500 pl-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900 dark:text-white">JSON.parse() (nativo)</span>
                            <span className="text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded">Recomendado</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">• Velocidade de parsing mais rápida</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">• Otimização do navegador</p>
                        </div>
                        
                        <div className="border-l-4 border-blue-500 pl-4">
                          <span className="font-medium text-gray-900 dark:text-white">simdjson-js</span>
                          <p className="text-sm text-gray-600 dark:text-gray-300">• Otimização SIMD</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">• Processamento de arquivos grandes</p>
                        </div>
                        
                        <div className="border-l-4 border-purple-500 pl-4">
                          <span className="font-medium text-gray-900 dark:text-white">JSONStream</span>
                          <p className="text-sm text-gray-600 dark:text-gray-300">• Parsing de stream</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">• Amigável à memória</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Comparação de Performance (velocidade relativa)</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="w-20 text-sm">JSON.parse</span>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded">
                            <div className="bg-green-500 h-4 rounded" style={{width: '100%'}}></div>
                          </div>
                          <span className="w-12 text-sm text-right">100%</span>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="w-20 text-sm">simdjson-js</span>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded">
                            <div className="bg-blue-500 h-4 rounded" style={{width: '95%'}}></div>
                          </div>
                          <span className="w-12 text-sm text-right">95%</span>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="w-20 text-sm">JSONStream</span>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded">
                            <div className="bg-purple-500 h-4 rounded" style={{width: '80%'}}></div>
                          </div>
                          <span className="w-12 text-sm text-right">80%</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                        * Baseado em teste de benchmark com dados JSON padrão de 1MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Técnicas de Otimização de Parsing</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-green-600 dark:text-green-400 font-medium mb-2 flex items-center">
                        <CheckCircleIcon className="w-4 h-4 mr-1" />
                        Práticas Recomendadas
                      </h4>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                        <pre className="text-sm text-green-800 dark:text-green-200">
{`// Usar JSON.parse nativo
const dados = JSON.parse(jsonString);

// Evitar parsing repetido
const cache = new Map();
function parseJSON(jsonString) {
  if (cache.has(jsonString)) {
    return cache.get(jsonString);
  }
  const resultado = JSON.parse(jsonString);
  cache.set(jsonString, resultado);
  return resultado;
}

// Parsing preguiçoso
function lazyParse(jsonString) {
  let parsed = null;
  return {
    get dados() {
      if (!parsed) {
        parsed = JSON.parse(jsonString);
      }
      return parsed;
    }
  };
}`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-red-600 dark:text-red-400 font-medium mb-2 flex items-center">
                        <XCircleIcon className="w-4 h-4 mr-1" />
                        Práticas a Evitar
                      </h4>
                      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                        <pre className="text-sm text-red-800 dark:text-red-200">
{`// Evitar parsing com eval()
const dados = eval('(' + jsonString + ')');

// Evitar parsing frequente de pequenos pedaços
for (let i = 0; i < itens.length; i++) {
  const item = JSON.parse(itens[i]);
  processar(item);
}

// Evitar parsing em loops
function processarDados() {
  const dados = JSON.parse(largeJSON); // Parse a cada chamada
  return dados.itens.map(item => transformar(item));
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Memory Management */}
            <section id="memory-management" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Estratégias de Gerenciamento de Memória</h2>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Padrões de Uso de Memória</h3>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg mb-2">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1x</div>
                        <div className="text-sm text-blue-600 dark:text-blue-400">String JSON</div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Tamanho dos dados originais</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-green-100 dark:bg-green-800 p-4 rounded-lg mb-2">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">2-3x</div>
                        <div className="text-sm text-green-600 dark:text-green-400">Objeto após parsing</div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Objeto JavaScript</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded-lg mb-2">
                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">4-5x</div>
                        <div className="text-sm text-yellow-600 dark:text-yellow-400">Processo de manipulação</div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Objetos temporários + GC</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded border border-yellow-200 dark:border-yellow-800">
                    <h4 className="text-yellow-800 dark:text-yellow-200 font-medium mb-2 flex items-center">
                      <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                      Sugestão de Planejamento de Memória
                    </h4>
                    <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                      Ao processar JSON grande, reserve 5-8 vezes o tamanho do arquivo em memória disponível para lidar com picos de memória durante parsing e processamento.
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Técnicas de Otimização de Memória</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">1. Processamento em Lotes</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-green-600 dark:text-green-400 text-sm font-medium mb-2">✅ Método Recomendado</h5>
                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                            <pre className="text-xs text-green-800 dark:text-green-200">
{`function processarLote(itens, tamanhoLote = 1000) {
  for (let i = 0; i < itens.length; i += tamanhoLote) {
    const lote = itens.slice(i, i + tamanhoLote);
    processarItensLote(lote);
    
    // Liberar controle, permitir execução do GC
    if (i % (tamanhoLote * 10) === 0) {
      await new Promise(resolve => 
        setTimeout(resolve, 0)
      );
    }
  }
}`}
                            </pre>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-red-600 dark:text-red-400 text-sm font-medium mb-2">❌ Método a Evitar</h5>
                          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
                            <pre className="text-xs text-red-800 dark:text-red-200">
{`function processarTodos(itens) {
  // Processar todos os dados de uma vez
  return itens.map(item => {
    return transformacaoCustosa(item);
  });
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">2. Liberação Oportuna de Referências</h4>
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                        <pre className="text-sm overflow-x-auto">
{`function processarJSONGrande(jsonString) {
  let dados = JSON.parse(jsonString);
  
  // Limpar referência imediatamente após processamento
  const resultado = processarDados(dados);
  dados = null; // Ajudar GC na coleta
  
  return resultado;
}

// Usar WeakMap para evitar vazamentos de memória
const cache = new WeakMap();
function cacheResultado(objeto, resultado) {
  cache.set(objeto, resultado);
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Reference */}
            <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-12">
              <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                Referência Rápida
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Checklist de Otimização de Performance</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Usar JSON.parse nativo</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Evitar parsing repetido</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Implementar cache de parsing</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Considerar parsing de stream</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Ferramentas Relacionadas</h3>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li>• <Link href="/" className="hover:underline">Ferramenta de Formatação JSON</Link></li>
                    <li>• <Link href="/wiki/pt/json-validation" className="hover:underline">Guia de Validação JSON</Link></li>
                    <li>• <Link href="/wiki/pt/json-api-best-practices" className="hover:underline">Melhores Práticas de API JSON</Link></li>
                    <li>• Ferramentas de Monitoramento de Performance</li>
                  </ul>
                </div>
              </div>
            </section>
          </article>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>Este guia fornece soluções completas para otimização de performance JSON, desde conceitos básicos até técnicas avançadas, ajudando você a construir aplicações de alta performance.</p>
              <p className="mt-2">
                <Link href="/wiki/pt" className="text-blue-600 dark:text-blue-400 hover:underline mr-4">
                  Voltar à Base de Conhecimento
                </Link>
                <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Voltar à Página Inicial das Ferramentas JSON
                </Link>
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}