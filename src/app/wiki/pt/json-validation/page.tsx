import { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, AcademicCapIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Validação e Schema JSON - Guia de Validação de Dados | JSON Tools",
  description: "Aprenda validação de dados JSON usando JSON Schema: regras de validação, tratamento de erros e estratégias para garantir qualidade dos dados.",
  keywords: "validação JSON,JSON Schema,validação dados,qualidade dados,validação formato JSON"
};

export default function JSONValidationPortuguesePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/wiki/pt" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Voltar à Base de Conhecimento
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Voltar às Ferramentas JSON
            </Link>
          </div>

          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <AcademicCapIcon className="w-10 h-10 mr-4 text-purple-600" />
              Validação e Schema JSON
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Guia completo para validação de dados JSON usando JSON Schema e estratégias de tratamento de erros
            </p>
          </header>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
            <DocumentTextIcon className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
              Conteúdo em Desenvolvimento
            </h2>
            <p className="text-blue-700 dark:text-blue-300 mb-6">
              Estamos preparando um conteúdo abrangente sobre validação JSON e JSON Schema. 
              Em breve, você encontrará aqui informações detalhadas sobre:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 text-blue-700 dark:text-blue-300 mb-6">
              <li>• Conceitos básicos de validação JSON</li>
              <li>• Sintaxe e uso do JSON Schema</li>
              <li>• Regras de validação para tipos de dados</li>
              <li>• Estratégias de tratamento de erros</li>
              <li>• Exemplos práticos e casos de uso</li>
              <li>• Ferramentas e bibliotecas recomendadas</li>
            </ul>
            <div className="space-y-4">
              <Link href="/wiki/pt/json-guide" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mr-4">
                Ler Guia JSON Completo
              </Link>
              <Link href="/" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                Usar Ferramentas JSON
              </Link>
            </div>
          </div>

          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
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