import { Metadata } from "next";
import { wikiMetadata, type WikiMetaInput } from '@/lib/wikiMeta';
import WikiJsonLd from '@/components/WikiJsonLd';
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, BookOpenIcon, DocumentTextIcon, CodeBracketIcon, GlobeAltIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

const META: WikiMetaInput = {
  locale: 'pt',
  title: 'Base de Conhecimento JSON: Guias, Schema e Mais',
  description: 'Dez guias sobre JSON: sintaxe e tipos, validação com Schema, design de APIs REST, performance, escape, comentários e geração de código.',
  keywords: 'JSON,ferramentas JSON,documentação JSON,tutorial JSON,validação JSON,JSON Schema,design de API,performance,geração de código,TypeScript,Java,melhores práticas',
  socialTitle: 'Base de Conhecimento JSON',
};

export const metadata: Metadata = wikiMetadata(META);


export default function WikiPortuguesePage() {
  const articles = [
    {
      id: 'json-guide',
      title: 'Guia Completo do JSON',
      description: 'Mergulhe profundamente no formato JSON: regras de sintaxe, tipos de dados, casos de uso e melhores práticas',
      category: 'foundation',
      categoryName: 'Fundamentos',
      icon: DocumentTextIcon,
      href: '/wiki/pt/json-guide',
      tags: ['Básico', 'Sintaxe', 'Formato de Dados'],
      readTime: '15 min de leitura',
      difficulty: 'beginner'
    },
    {
      id: 'json-api-best-practices',
      title: 'Melhores Práticas para API JSON',
      description: 'Princípios, especificações e dicas práticas para projetar APIs JSON de alta qualidade',
      category: 'api',
      categoryName: 'Design de API',
      icon: CodeBracketIcon,
      href: '/wiki/pt/json-api-best-practices',
      tags: ['API', 'Padrões de Design', 'Normas'],
      readTime: '12 min de leitura',
      difficulty: 'intermediate'
    },
    {
      id: 'json-validation',
      title: 'Validação e Schema JSON',
      description: 'Guia de uso do JSON Schema, regras de validação e estratégias de tratamento de erros',
      category: 'validation',
      categoryName: 'Validação',
      icon: AcademicCapIcon,
      href: '/wiki/pt/json-validation',
      tags: ['Validação', 'Schema', 'Tratamento de Erros'],
      readTime: '10 min de leitura',
      difficulty: 'intermediate'
    },
    {
      id: 'json-performance',
      title: 'Otimização de Performance JSON',
      description: 'Otimização de parsing JSON, gerenciamento de memória e técnicas de processamento de big data',
      category: 'performance',
      categoryName: 'Performance',
      icon: GlobeAltIcon,
      href: '/wiki/pt/json-performance',
      tags: ['Performance', 'Otimização', 'Big Data'],
      readTime: '8 min de leitura',
      difficulty: 'advanced'
    },
    {
      id: 'json-to-typescript',
      title: 'JSON → Interfaces TypeScript',
      description: 'Gere interfaces TypeScript a partir de JSON com tipos aninhados e arrays',
      category: 'conversion',
      categoryName: 'Conversão',
      icon: CodeBracketIcon,
      href: '/wiki/pt/json-to-typescript',
      tags: ['Codegen', 'TypeScript', 'Interfaces'],
      readTime: '5 min de leitura',
      difficulty: 'beginner'
    },
    {
      id: 'json-to-java',
      title: 'JSON → Classes Java',
      description: 'Gere classes Java (POJO) a partir de JSON, incluindo objetos aninhados',
      category: 'conversion',
      categoryName: 'Conversão',
      icon: CodeBracketIcon,
      href: '/wiki/pt/json-to-java',
      tags: ['Codegen', 'Java', 'Tipos'],
      readTime: '5 min de leitura',
      difficulty: 'beginner'
    },
    {
      id: 'json-vs-yaml',
      title: 'JSON vs YAML',
      description: 'Em qual formato um arquivo deveria estar, e o que muda ao converter entre os dois',
      category: 'conversion',
      categoryName: 'Conversão',
      icon: GlobeAltIcon,
      href: '/wiki/pt/json-vs-yaml/',
      tags: ['YAML', 'Config', 'Comparação'],
      readTime: '9 min de leitura',
      difficulty: 'beginner'
    },
    {
      id: 'json-to-csv-nested',
      title: 'JSON aninhado para CSV',
      description: 'Como o aninhamento se achata em colunas, o que acontece com arrays e onde os dados se perdem',
      category: 'conversion',
      categoryName: 'Conversão',
      icon: DocumentTextIcon,
      href: '/wiki/pt/json-to-csv-nested/',
      tags: ['CSV', 'Achatamento', 'Planilhas'],
      readTime: '10 min de leitura',
      difficulty: 'intermediate'
    },
    {
      id: 'json-escaping',
      title: 'Escape em JSON',
      description: 'Por que uma string JSON dentro de outra dobra as barras invertidas, e como recuperar os dados',
      category: 'foundation',
      categoryName: 'Fundamentos',
      icon: DocumentTextIcon,
      href: '/wiki/pt/json-escaping/',
      tags: ['Escape', 'Strings', 'Logs'],
      readTime: '8 min de leitura',
      difficulty: 'beginner'
    },
    {
      id: 'json-comments',
      title: 'JSON pode ter comentários?',
      description: 'Não. O que o parser diz se você tentar, o que JSON5 e JSONC mudam, e as quatro alternativas',
      category: 'foundation',
      categoryName: 'Fundamentos',
      icon: AcademicCapIcon,
      href: '/wiki/pt/json-comments/',
      tags: ['Sintaxe', 'JSON5', 'Config'],
      readTime: '7 min de leitura',
      difficulty: 'beginner'
    }
  ];

  const categories = [
    { id: 'foundation', name: 'Fundamentos', description: 'Conceitos básicos e sintaxe do JSON' },
    { id: 'api', name: 'Design de API', description: 'APIs RESTful e troca de dados JSON' },
    { id: 'validation', name: 'Validação', description: 'Validação de dados e tratamento de erros' },
    { id: 'performance', name: 'Performance', description: 'Ajuste de performance e melhores práticas' },
    { id: 'conversion', name: 'Conversão', description: 'Conversão de formatos e geração de código' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Iniciante';
      case 'intermediate':
        return 'Intermediário';
      case 'advanced':
        return 'Avançado';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <WikiJsonLd {...META} />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Voltar para Ferramentas JSON
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <BookOpenIcon className="w-10 h-10 mr-4 text-blue-600" />
              Base de Conhecimento de Ferramentas JSON
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Recursos completos de aprendizado JSON e documentação para desenvolvedores, desde sintaxe básica até aplicações avançadas, ajudando você a se tornar um especialista em JSON
            </p>
          </header>

          {/* Categories Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Categorias de Conhecimento</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => {
                // Encontrar o primeiro artigo nesta categoria
                const firstArticle = articles.find(article => article.category === category.id);
                const articleCount = articles.filter(article => article.category === category.id).length;
                
                return (
                  <Link key={category.id} href={firstArticle?.href || '#'}>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {category.description}
                      </p>
                      <div className="text-sm text-blue-600 dark:text-blue-400">
                        {articleCount} artigo{articleCount !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Articles List */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Todos os Artigos</h2>
            <div className="space-y-6">
              {articles.map((article) => {
                const IconComponent = article.icon;
                return (
                  <Link key={article.id} href={article.href}>
                    <article className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              {article.title}
                            </h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(article.difficulty)}`}>
                              {getDifficultyText(article.difficulty)}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {article.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                                {article.categoryName}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                Tempo de leitura: {article.readTime}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {article.tags.map((tag) => (
                                <span key={tag} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Quick Links */}
          <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
              Início Rápido
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/wiki/pt/json-guide/"
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Começando</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Comece aprendendo a sintaxe básica do JSON</p>
              </Link>
              <Link
                href="/"
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Ferramentas Online</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Use ferramentas de formatação e validação JSON</p>
              </Link>
              <Link
                href="/wiki/pt/json-api-best-practices/"
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Design de API</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Aprenda as melhores práticas para API JSON</p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
