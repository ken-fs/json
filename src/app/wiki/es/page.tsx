import { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, BookOpenIcon, DocumentTextIcon, CodeBracketIcon, GlobeAltIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Base de Conocimiento de Herramientas JSON - Centro de Documentación para Desarrolladores | JSON Tools",
  description: "Base completa de conocimiento sobre herramientas JSON: guía de sintaxis JSON, mejores prácticas, documentación de API, tutoriales y FAQ. Recursos esenciales de aprendizaje JSON para desarrolladores.",
  keywords: "base conocimiento JSON,documentación JSON,tutorial JSON,documentación API,guía desarrollador,mejores prácticas JSON",
  openGraph: {
    title: "Base de Conocimiento de Herramientas JSON - Centro de Documentación para Desarrolladores",
    description: "Recursos completos de aprendizaje JSON y documentación para desarrolladores, cubriendo desde lo básico hasta aplicaciones avanzadas.",
    type: "website"
  }
};

export default function WikiSpanishPage() {
  const articles = [
    {
      id: 'json-guide',
      title: 'Guía Completa de JSON',
      description: 'Profundiza en el formato JSON: reglas de sintaxis, tipos de datos, casos de uso y mejores prácticas',
      category: 'foundation',
      categoryName: 'Fundamentos',
      icon: DocumentTextIcon,
      href: '/wiki/es/json-guide',
      tags: ['Básico', 'Sintaxis', 'Formato de Datos'],
      readTime: '15 min de lectura',
      difficulty: 'beginner'
    },
    {
      id: 'json-api-best-practices',
      title: 'Mejores Prácticas para API JSON',
      description: 'Principios, especificaciones y consejos prácticos para diseñar APIs JSON de alta calidad',
      category: 'api',
      categoryName: 'Diseño de API',
      icon: CodeBracketIcon,
      href: '/wiki/es/json-api-best-practices',
      tags: ['API', 'Patrones de Diseño', 'Estándares'],
      readTime: '12 min de lectura',
      difficulty: 'intermediate'
    },
    {
      id: 'json-validation',
      title: 'Validación y Schema JSON',
      description: 'Guía de uso de JSON Schema, reglas de validación y estrategias de manejo de errores',
      category: 'validation',
      categoryName: 'Validación',
      icon: AcademicCapIcon,
      href: '/wiki/es/json-validation',
      tags: ['Validación', 'Schema', 'Manejo de Errores'],
      readTime: '10 min de lectura',
      difficulty: 'intermediate'
    },
    {
      id: 'json-performance',
      title: 'Optimización de Rendimiento JSON',
      description: 'Optimización de parsing JSON, gestión de memoria y técnicas de procesamiento de big data',
      category: 'performance',
      categoryName: 'Rendimiento',
      icon: GlobeAltIcon,
      href: '/wiki/es/json-performance',
      tags: ['Rendimiento', 'Optimización', 'Big Data'],
      readTime: '8 min de lectura',
      difficulty: 'advanced'
    }
  ];

  const categories = [
    { id: 'foundation', name: 'Fundamentos', description: 'Conceptos básicos y sintaxis de JSON' },
    { id: 'api', name: 'Diseño de API', description: 'APIs RESTful e intercambio de datos JSON' },
    { id: 'validation', name: 'Validación', description: 'Validación de datos y manejo de errores' },
    { id: 'performance', name: 'Rendimiento', description: 'Ajuste de rendimiento y mejores prácticas' }
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
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzado';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Volver a Herramientas JSON
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <BookOpenIcon className="w-10 h-10 mr-4 text-blue-600" />
              Base de Conocimiento de Herramientas JSON
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Recursos completos de aprendizaje JSON y documentación para desarrolladores, desde sintaxis básica hasta aplicaciones avanzadas, ayudándote a convertirte en un experto en JSON
            </p>
          </header>

          {/* Categories Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Categorías de Conocimiento</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => {
                // Encontrar el primer artículo en esta categoría
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
                        {articleCount} artículo{articleCount !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Articles List */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Todos los Artículos</h2>
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
                                Tiempo de lectura: {article.readTime}
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
              Inicio Rápido
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/wiki/es/json-guide"
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Comenzando</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Comienza aprendiendo la sintaxis básica de JSON</p>
              </Link>
              <Link
                href="/"
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Herramientas en Línea</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Usa herramientas de formateo y validación JSON</p>
              </Link>
              <Link
                href="/wiki/es/json-api-best-practices"
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Diseño de API</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Aprende las mejores prácticas para API JSON</p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}