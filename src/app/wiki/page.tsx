import { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, BookOpenIcon, DocumentTextIcon, CodeBracketIcon, GlobeAltIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "JSON工具知识库 - 开发者文档中心 | JSON Tools",
  description: "JSON工具完整知识库：包含JSON语法指南、最佳实践、API文档、教程和常见问题解答。开发者必备的JSON学习资源。",
  keywords: "JSON知识库,JSON文档,JSON教程,API文档,开发者指南,JSON最佳实践",
  openGraph: {
    title: "JSON工具知识库 - 开发者文档中心",
    description: "完整的JSON学习资源和开发者文档，涵盖从基础到高级的所有内容。",
    type: "website"
  }
};

export default function WikiPage() {
  const articles = [
    {
      id: 'json-guide',
      title: 'JSON完全指南',
      description: '深入了解JSON格式：语法规则、数据类型、应用场景和最佳实践',
      category: 'foundation',
      categoryName: '基础知识',
      icon: DocumentTextIcon,
      href: '/wiki/cn/json-guide',
      tags: ['基础', '语法', '数据格式'],
      readTime: '15分钟',
      difficulty: 'beginner'
    },
    {
      id: 'json-api-best-practices',
      title: 'JSON API最佳实践',
      description: '设计高质量JSON API的原则、规范和实用技巧',
      category: 'api',
      categoryName: 'API设计',
      icon: CodeBracketIcon,
      href: '/wiki/cn/json-api-best-practices',
      tags: ['API', '设计模式', '规范'],
      readTime: '12分钟',
      difficulty: 'intermediate'
    },
    {
      id: 'json-validation',
      title: 'JSON验证与校验',
      description: 'JSON Schema使用指南，数据验证规则和错误处理',
      category: 'validation',
      categoryName: '验证与校验',
      icon: AcademicCapIcon,
      href: '/wiki/cn/json-validation',
      tags: ['验证', 'Schema', '错误处理'],
      readTime: '10分钟',
      difficulty: 'intermediate'
    },
    {
      id: 'json-performance',
      title: 'JSON性能优化',
      description: 'JSON解析性能优化、内存管理和大数据处理技巧',
      category: 'performance',
      categoryName: '性能优化',
      icon: GlobeAltIcon,
      href: '/wiki/cn/json-performance',
      tags: ['性能', '优化', '大数据'],
      readTime: '8分钟',
      difficulty: 'advanced'
    },
    {
      id: 'json-to-typescript',
      title: 'JSON 转 TypeScript 接口',
      description: '从 JSON 一键生成 TypeScript 接口，支持嵌套对象与数组',
      category: 'conversion',
      categoryName: '格式转换',
      icon: CodeBracketIcon,
      href: '/wiki/cn/json-to-typescript',
      tags: ['代码生成', 'TypeScript', '接口'],
      readTime: '5分钟',
      difficulty: 'beginner'
    },
    {
      id: 'json-to-java',
      title: 'JSON 转 Java 类',
      description: '从 JSON 生成 Java POJO 类，包括嵌套对象与集合',
      category: 'conversion',
      categoryName: '格式转换',
      icon: CodeBracketIcon,
      href: '/wiki/cn/json-to-java',
      tags: ['代码生成', 'Java', '类型'],
      readTime: '5分钟',
      difficulty: 'beginner'
    }
  ];

  const categories = [
    { id: 'foundation', name: '基础知识', description: 'JSON基础概念和语法' },
    { id: 'api', name: 'API设计', description: 'RESTful API和JSON数据交换' },
    { id: 'validation', name: '验证与校验', description: '数据验证和错误处理' },
    { id: 'performance', name: '性能优化', description: '性能调优和最佳实践' },
    { id: 'conversion', name: '格式转换', description: '格式转换与代码生成' }
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
        return '初级';
      case 'intermediate':
        return '中级';
      case 'advanced':
        return '高级';
      default:
        return '未知';
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
            返回JSON工具
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <BookOpenIcon className="w-10 h-10 mr-4 text-blue-600" />
              JSON工具知识库
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              完整的JSON学习资源和开发者文档，从基础语法到高级应用，助您成为JSON专家
            </p>
          </header>

          {/* Categories Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">知识分类</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => {
                // 找到该分类的第一篇文章
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
                        {articleCount} 篇文章
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Articles List */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">所有文章</h2>
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
                                阅读时间: {article.readTime}
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
              快速开始
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/wiki/cn/json-guide"
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">新手入门</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">从JSON基础语法开始学习</p>
              </Link>
              <Link
                href="/"
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">在线工具</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">使用JSON格式化和验证工具</p>
              </Link>
              <Link
                href="/wiki/cn/json-api-best-practices"
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">API设计</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">学习JSON API最佳实践</p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
