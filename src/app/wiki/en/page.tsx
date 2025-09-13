import { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, BookOpenIcon, DocumentTextIcon, CodeBracketIcon, GlobeAltIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "JSON Tools Knowledge Base - Developer Documentation Center | JSON Tools",
  description: "Complete JSON tools knowledge base: JSON syntax guide, best practices, API documentation, tutorials and FAQ. Essential JSON learning resources for developers.",
  keywords: "JSON knowledge base,JSON documentation,JSON tutorial,API documentation,developer guide,JSON best practices",
  openGraph: {
    title: "JSON Tools Knowledge Base - Developer Documentation Center",
    description: "Complete JSON learning resources and developer documentation, covering everything from basics to advanced applications.",
    type: "website"
  }
};

export default function WikiEnglishPage() {
  const articles = [
    {
      id: 'json-guide',
      title: 'Complete JSON Guide',
      description: 'Deep dive into JSON format: syntax rules, data types, use cases and best practices',
      category: 'foundation',
      categoryName: 'Foundation',
      icon: DocumentTextIcon,
      href: '/wiki/en/json-guide',
      tags: ['Basics', 'Syntax', 'Data Format'],
      readTime: '15 min read',
      difficulty: 'beginner'
    },
    {
      id: 'json-api-best-practices',
      title: 'JSON API Best Practices',
      description: 'Principles, specifications and practical tips for designing high-quality JSON APIs',
      category: 'api',
      categoryName: 'API Design',
      icon: CodeBracketIcon,
      href: '/wiki/en/json-api-best-practices',
      tags: ['API', 'Design Patterns', 'Standards'],
      readTime: '12 min read',
      difficulty: 'intermediate'
    },
    {
      id: 'json-validation',
      title: 'JSON Validation & Schema',
      description: 'JSON Schema usage guide, validation rules and error handling strategies',
      category: 'validation',
      categoryName: 'Validation',
      icon: AcademicCapIcon,
      href: '/wiki/en/json-validation',
      tags: ['Validation', 'Schema', 'Error Handling'],
      readTime: '10 min read',
      difficulty: 'intermediate'
    },
    {
      id: 'json-performance',
      title: 'JSON Performance Optimization',
      description: 'JSON parsing optimization, memory management and big data processing techniques',
      category: 'performance',
      categoryName: 'Performance',
      icon: GlobeAltIcon,
      href: '/wiki/en/json-performance',
      tags: ['Performance', 'Optimization', 'Big Data'],
      readTime: '8 min read',
      difficulty: 'advanced'
    }
  ];

  const categories = [
    { id: 'foundation', name: 'Foundation', description: 'JSON basic concepts and syntax' },
    { id: 'api', name: 'API Design', description: 'RESTful APIs and JSON data exchange' },
    { id: 'validation', name: 'Validation', description: 'Data validation and error handling' },
    { id: 'performance', name: 'Performance', description: 'Performance tuning and best practices' }
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
        return 'Beginner';
      case 'intermediate':
        return 'Intermediate';
      case 'advanced':
        return 'Advanced';
      default:
        return 'Unknown';
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
            Back to JSON Tools
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <BookOpenIcon className="w-10 h-10 mr-4 text-blue-600" />
              JSON Tools Knowledge Base
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Complete JSON learning resources and developer documentation, from basic syntax to advanced applications, helping you become a JSON expert
            </p>
          </header>

          {/* Categories Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Knowledge Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => {
                // Find the first article in this category
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
                        {articleCount} article{articleCount !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Articles List */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">All Articles</h2>
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
                                Reading time: {article.readTime}
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
              Quick Start
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/wiki/en/json-guide"
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Getting Started</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Start learning from JSON basic syntax</p>
              </Link>
              <Link
                href="/"
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Online Tools</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Use JSON formatting and validation tools</p>
              </Link>
              <Link
                href="/wiki/en/json-api-best-practices"
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">API Design</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Learn JSON API best practices</p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}