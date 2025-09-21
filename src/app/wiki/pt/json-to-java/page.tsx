import { Metadata } from 'next';
import Header from '@/components/Header';
import Link from 'next/link';
import { ArrowLeftIcon, CodeBracketIcon, ClipboardDocumentIcon, ArrowDownTrayIcon, CheckCircleIcon, ExclamationTriangleIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'JSON → Classes Java: Como Usar | JSON Tools',
  description: 'Gere classes Java (POJOs) a partir de JSON. Recursos suportados, mapeamento de tipos e exportação de código.',
  keywords: 'JSON para Java,POJO,geração de código,classes Java,ferramentas JSON',
  openGraph: {
    title: 'JSON → Classes Java: Como Usar',
    description: 'Gere classes Java a partir de JSON, incluindo objetos aninhados e listas genéricas. Passos rápidos e dicas.',
    type: 'article'
  }
};

export default function JsonToJavaDocPT() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navegação */}
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

          {/* Cabeçalho */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
              <CodeBracketIcon className="w-10 h-10 mr-3 text-blue-600" />
              JSON → Classes Java
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Converta JSON em POJOs Java, incluindo classes aninhadas e <code>List&lt;T&gt;</code>. Perfeito para criar modelos rapidamente.
            </p>
          </header>

          {/* Sumário */}
          <nav className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <CodeBracketIcon className="w-5 h-5 mr-2" />
              Sumário
            </h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">Visão Geral</a></li>
              <li><a href="#quick-start" className="text-blue-600 dark:text-blue-400 hover:underline">Como começar</a></li>
              <li><a href="#type-mapping" className="text-blue-600 dark:text-blue-400 hover:underline">Mapeamento de tipos</a></li>
              <li><a href="#collections-nested" className="text-blue-600 dark:text-blue-400 hover:underline">Coleções e Classes Aninhadas</a></li>
              <li><a href="#examples" className="text-blue-600 dark:text-blue-400 hover:underline">Exemplo</a></li>
              <li><a href="#tips" className="text-blue-600 dark:text-blue-400 hover:underline">Dicas e limitações</a></li>
              <li><a href="#related" className="text-blue-600 dark:text-blue-400 hover:underline">Ferramentas Relacionadas</a></li>
            </ul>
          </nav>

          {/* Conteúdo */}
          <article className="prose prose-lg max-w-none dark:prose-invert">
            {/* Visão Geral */}
            <section id="overview" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <LightBulbIcon className="w-8 h-8 mr-3 text-yellow-600" />
                Visão Geral
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    O que faz
                  </h3>
                  <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                    <li>• Gera classes Java com base nos campos</li>
                    <li>• Cria getters/setters para cada campo</li>
                    <li>• Cria classes filhas para objetos aninhados</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center">
                    <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                    Requisitos de entrada
                  </h3>
                  <ul className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                    <li>• JSON válido e parseável</li>
                    <li>• Arrays inferidos pelo tipo do primeiro elemento</li>
                    <li>• Ajuste nomes gerados para seu padrão de projeto</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Como começar */}
            <section id="quick-start" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Como começar</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Abra <Link href="/json-to-java" className="text-blue-600 dark:text-blue-400">/json-to-java</Link></li>
                <li>Cole o JSON no editor da esquerda</li>
                <li>Revise as classes geradas no painel direito</li>
                <li>Copie <ClipboardDocumentIcon className="inline w-4 h-4" /> ou baixe <ArrowDownTrayIcon className="inline w-4 h-4" /> o arquivo <code>.java</code></li>
              </ol>
            </section>

            {/* Mapeamento de tipos */}
            <section id="type-mapping" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Mapeamento de tipos</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Primitivos</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• string → String</li>
                    <li>• inteiro → int; ponto flutuante → double</li>
                    <li>• boolean → boolean</li>
                    <li>• null → Object</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Complexos</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• array → List&lt;T&gt; (baseado no primeiro elemento)</li>
                    <li>• object → classe filha (capitalizada)</li>
                    <li>• objeto aninhado → classe separada + referência</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Coleções e Classes Aninhadas */}
            <section id="collections-nested" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Coleções e Classes Aninhadas</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Bom Exemplo</h3>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded border border-green-200 dark:border-green-800">
                    <pre className="text-sm text-green-800 dark:text-green-200 whitespace-pre-wrap">
{`{
  "items": [{ "id": 1, "name": "Book" }]
}`}
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Requer Atenção</h3>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded border border-yellow-200 dark:border-yellow-800">
                    <pre className="text-sm text-yellow-800 dark:text-yellow-200 whitespace-pre-wrap">
{`{
  "values": [1, "two", true]
}`}
                    </pre>
                    <p className="mt-2 text-xs text-yellow-700 dark:text-yellow-300">Tipos mistos; use Object ou normalize para tipos consistentes.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Exemplo */}
            <section id="examples" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Exemplo</h2>
              <pre className="whitespace-pre-wrap">
{`JSON de entrada
{
  "id": 1,
  "name": "Book",
  "tags": ["tech"],
  "author": { "name": "Tom" }
}

Gerado em Java
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

            {/* Dicas e limitações */}
            <section id="tips" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <LightBulbIcon className="w-8 h-8 mr-3 text-yellow-600" />
                Dicas e limitações
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recomendado</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Valide JSON e nomes de campos</li>
                    <li>• Adicione pacotes/anotações quando necessário (ex.: Lombok)</li>
                    <li>• Renomeie classes para nomes de domínio significativos</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Limitações</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Arrays mistos inferidos pelo primeiro elemento</li>
                    <li>• Sem gestão de pacotes/imports além de List</li>
                    <li>• Anotações de serialização não são geradas</li>
                  </ul>
                </div>
              </div>
            </section>
          </article>

          {/* Ferramentas Relacionadas */}
          <section id="related" className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-12">
            <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Ferramentas Relacionadas</h2>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li>• <Link href="/" className="hover:underline">Ferramentas de Formatação JSON</Link></li>
              <li>• <Link href="/wiki/pt/json-guide" className="hover:underline">Guia Completo de JSON</Link></li>
              <li>• <Link href="/wiki/pt/json-validation" className="hover:underline">Guia de Validação JSON</Link></li>
              <li>• <Link href="/wiki/pt/json-performance" className="hover:underline">Otimização de Performance</Link></li>
            </ul>
          </section>

          {/* Rodapé */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>Gere POJOs rapidamente e depois ajuste modificadores, pacotes e anotações para produção.</p>
              <p className="mt-2">
                <Link href="/wiki/pt" className="text-blue-600 dark:text-blue-400 hover:underline mr-4">Voltar à Base de Conhecimento</Link>
                <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">Voltar às Ferramentas JSON</Link>
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
