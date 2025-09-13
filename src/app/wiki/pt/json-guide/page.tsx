import { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, BookOpenIcon, CodeBracketIcon, DocumentTextIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Guia Completo do JSON - Formato de Troca de Dados Explicado | JSON Tools",
  description: "Guia abrangente sobre JSON (JavaScript Object Notation): regras de sintaxe, tipos de dados, casos de uso e melhores práticas. Exemplos detalhados e tutorial JSON otimizado para SEO.",
  keywords: "JSON,formato dados,API,REST,JavaScript,troca dados,tutorial JSON,sintaxe JSON,exemplos JSON",
  openGraph: {
    title: "Guia Completo do JSON - Formato de Troca de Dados Explicado",
    description: "Guia abrangente sobre formato JSON: desde sintaxe básica até aplicações práticas, incluindo exemplos ricos e melhores práticas.",
    type: "article"
  },
  other: {
    "article:author": "JSON Tools",
    "article:published_time": "2024-01-01",
    "article:modified_time": new Date().toISOString()
  }
};

export default function JSONGuidePortuguesePage() {
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Guia Completo do JSON
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Mergulhe profundamente no JSON (JavaScript Object Notation): o formato padrão para troca de dados moderna
            </p>
          </header>

          {/* Table of Contents */}
          <nav className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <BookOpenIcon className="w-5 h-5 mr-2" />
              Índice
            </h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#what-is-json" className="text-blue-600 dark:text-blue-400 hover:underline">O que é JSON?</a></li>
              <li><a href="#json-syntax" className="text-blue-600 dark:text-blue-400 hover:underline">Regras de Sintaxe JSON</a></li>
              <li><a href="#data-types" className="text-blue-600 dark:text-blue-400 hover:underline">Tipos de Dados Explicados</a></li>
              <li><a href="#use-cases" className="text-blue-600 dark:text-blue-400 hover:underline">Casos de Uso</a></li>
              <li><a href="#best-practices" className="text-blue-600 dark:text-blue-400 hover:underline">Melhores Práticas</a></li>
              <li><a href="#common-errors" className="text-blue-600 dark:text-blue-400 hover:underline">Erros Comuns</a></li>
              <li><a href="#tools" className="text-blue-600 dark:text-blue-400 hover:underline">Ferramentas JSON</a></li>
            </ul>
          </nav>

          {/* Content */}
          <article className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* What is JSON */}
            <section id="what-is-json" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <DocumentTextIcon className="w-8 h-8 mr-3 text-blue-600" />
                O que é JSON?
              </h2>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>JSON (JavaScript Object Notation)</strong> é um formato leve e baseado em texto para intercâmbio de dados.
                  Apesar de ter &ldquo;JavaScript&rdquo; no nome, JSON é na verdade um formato de dados independente de linguagem,
                  com suporte nativo para análise e geração em praticamente todas as linguagens de programação modernas.
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Características Principais</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Legível por Humanos</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Formato de texto claro com estrutura intuitiva de pares chave-valor
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Amigável a Máquinas</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Regras de sintaxe simples, velocidade de análise rápida
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Independente de Linguagem</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Suportado por todas as principais linguagens de programação
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Leve</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Mais conciso que XML, tamanho de transmissão menor
                  </p>
                </div>
              </div>
            </section>

            {/* JSON Syntax */}
            <section id="json-syntax" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <CodeBracketIcon className="w-8 h-8 mr-3 text-green-600" />
                Regras de Sintaxe JSON
              </h2>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                JSON é construído sobre duas estruturas:
              </p>
              
              <ul className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Objetos</strong>: Uma coleção de pares nome/valor (similar a dicionários, tabelas hash)</li>
                <li><strong>Arrays</strong>: Uma lista ordenada de valores (similar a arrays ou vetores)</li>
              </ul>

              <div className="bg-gray-800 rounded-lg p-6 mb-6 overflow-x-auto">
                <h4 className="text-white font-semibold mb-4">Exemplo de Sintaxe Básica</h4>
                <pre className="text-green-400 text-sm">
{`{
  "nome": "João Silva",
  "idade": 30,
  "ativo": true,
  "endereco": {
    "cidade": "São Paulo",
    "cep": "01000-000"
  },
  "hobbies": ["programação", "leitura", "viagens"],
  "conjuge": null
}`}
                </pre>
              </div>
            </section>

            {/* Quick Reference Section */}
            <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-12">
              <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                Referência Rápida
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Tipos de Dados JSON</h3>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li>• <code>string</code> - Texto entre aspas duplas</li>
                    <li>• <code>number</code> - Números inteiros ou decimais</li>
                    <li>• <code>boolean</code> - true ou false</li>
                    <li>• <code>null</code> - Valor nulo</li>
                    <li>• <code>object</code> - Coleção de pares chave-valor</li>
                    <li>• <code>array</code> - Lista ordenada de valores</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Ferramentas Relacionadas</h3>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li>• <Link href="/" className="hover:underline">Formatador JSON</Link></li>
                    <li>• <Link href="/wiki/pt/json-validation" className="hover:underline">Guia de Validação JSON</Link></li>
                    <li>• <Link href="/wiki/pt/json-performance" className="hover:underline">Otimização de Performance</Link></li>
                    <li>• <Link href="/wiki/pt/json-api-best-practices" className="hover:underline">Melhores Práticas de API</Link></li>
                  </ul>
                </div>
              </div>
            </section>
          </article>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>Este guia cobre os conceitos fundamentais e aplicações práticas do JSON, adequado para iniciantes aprenderem e desenvolvedores profissionais consultarem.</p>
              <p className="mt-2">
                <Link href="/wiki/pt" className="text-blue-600 dark:text-blue-400 hover:underline mr-4">
                  Voltar à Base de Conhecimento
                </Link>
                <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Voltar às Ferramentas JSON
                </Link>
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}