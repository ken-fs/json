import { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, CodeBracketIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, LightBulbIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Guia de Melhores Práticas para API JSON - Padrões de Design RESTful | JSON Tools",
  description: "Melhores práticas completas para design de API JSON: convenções de nomenclatura, uso de códigos de status, tratamento de erros, estratégias de paginação e otimização de performance. Guia profissional para melhorar a qualidade da API.",
  keywords: "API JSON,API RESTful,design API,melhores práticas,padrões API,REST API,design interface JSON,documentação API",
  openGraph: {
    title: "Guia de Melhores Práticas para API JSON - Padrões de Design RESTful",
    description: "Aprenda a projetar APIs JSON de alta qualidade com guia profissional, incluindo padrões completos e dicas práticas.",
    type: "article"
  },
  other: {
    "article:author": "JSON Tools",
    "article:published_time": "2024-01-01",
    "article:modified_time": new Date().toISOString(),
    "article:section": "Design de API",
    "article:tag": "API JSON,RESTful,Design API,Melhores Práticas"
  }
};

export default function JSONAPIBestPracticesPortuguesePage() {
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
              <CodeBracketIcon className="w-10 h-10 mr-4 text-green-600" />
              Melhores Práticas para API JSON
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Guia completo para projetar APIs JSON de alta qualidade, fáceis de manter e amigáveis ao usuário
            </p>
          </header>

          {/* Table of Contents */}
          <nav className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <CodeBracketIcon className="w-5 h-5 mr-2" />
              Índice
            </h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#api-design-principles" className="text-blue-600 dark:text-blue-400 hover:underline">Princípios de Design de API</a></li>
              <li><a href="#naming-conventions" className="text-blue-600 dark:text-blue-400 hover:underline">Convenções de Nomenclatura</a></li>
              <li><a href="#http-methods" className="text-blue-600 dark:text-blue-400 hover:underline">Uso de Métodos HTTP</a></li>
              <li><a href="#status-codes" className="text-blue-600 dark:text-blue-400 hover:underline">Padrões de Códigos de Status</a></li>
              <li><a href="#error-handling" className="text-blue-600 dark:text-blue-400 hover:underline">Tratamento de Erros</a></li>
              <li><a href="#pagination" className="text-blue-600 dark:text-blue-400 hover:underline">Estratégias de Paginação</a></li>
              <li><a href="#performance" className="text-blue-600 dark:text-blue-400 hover:underline">Otimização de Performance</a></li>
              <li><a href="#security" className="text-blue-600 dark:text-blue-400 hover:underline">Considerações de Segurança</a></li>
            </ul>
          </nav>

          {/* Content */}
          <article className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* API Design Principles */}
            <section id="api-design-principles" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <LightBulbIcon className="w-8 h-8 mr-3 text-yellow-600" />
                Princípios de Design de API
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    Princípios Fundamentais
                  </h3>
                  <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                    <li>• <strong>Consistência</strong>: Nomenclatura e estrutura padronizadas</li>
                    <li>• <strong>Previsibilidade</strong>: Desenvolvedores podem antecipar o comportamento da API</li>
                    <li>• <strong>Simplicidade</strong>: Evitar complexidade desnecessária</li>
                    <li>• <strong>Escalabilidade</strong>: Suporte a expansões futuras de funcionalidades</li>
                    <li>• <strong>Compatibilidade</strong>: Proteger integrações existentes</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                    Estilo de Design RESTful
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
                    Seguir o estilo arquitetural REST torna a API mais intuitiva e padronizada:
                  </p>
                  <ul className="space-y-1 text-blue-700 dark:text-blue-300 text-sm">
                    <li>• Design de URL orientado a recursos</li>
                    <li>• Uso correto de métodos HTTP</li>
                    <li>• Comunicação sem estado</li>
                    <li>• Arquitetura de sistema em camadas</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Naming Conventions */}
            <section id="naming-conventions" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Convenções de Nomenclatura</h2>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Padrões de Caminho de URL</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-green-600 dark:text-green-400 font-medium mb-2 flex items-center">
                        <CheckCircleIcon className="w-4 h-4 mr-1" />
                        Práticas Recomendadas
                      </h4>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                        <pre className="text-sm text-green-800 dark:text-green-200">
{`GET /api/v1/usuarios
GET /api/v1/usuarios/123
POST /api/v1/usuarios
PUT /api/v1/usuarios/123
DELETE /api/v1/usuarios/123

GET /api/v1/usuarios/123/pedidos
GET /api/v1/pedidos?usuario_id=123`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-red-600 dark:text-red-400 font-medium mb-2 flex items-center">
                        <XCircleIcon className="w-4 h-4 mr-1" />
                        Práticas a Evitar
                      </h4>
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
                        <pre className="text-sm text-red-800 dark:text-red-200">
{`GET /api/v1/obterUsuarios
POST /api/v1/criarUsuario
GET /api/v1/lista_usuarios
GET /api/v1/Usuarios/123/Pedidos
DELETE /api/v1/removerUsuario/123

GET /obterDadosUsuario?id=123`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Explicação das Regras de Nomenclatura</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                      <li>• Use substantivos no plural para representar coleções de recursos: <code>/usuarios</code>, <code>/pedidos</code></li>
                      <li>• Use letras minúsculas e hífens: <code>/perfis-usuario</code></li>
                      <li>• Evite verbos, deixe os métodos HTTP expressarem a operação</li>
                      <li>• Recursos aninhados devem refletir relacionamentos lógicos</li>
                      <li>• Use parâmetros de consulta para filtragem e ordenação</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Nomenclatura de Campos JSON</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-green-600 dark:text-green-400 font-medium mb-2">Recomendado: snake_case</h4>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                        <pre className="text-sm text-green-800 dark:text-green-200">
{`{
  "id_usuario": 123,
  "primeiro_nome": "João",
  "ultimo_nome": "Silva",
  "endereco_email": "usuario@exemplo.com",
  "criado_em": "2024-01-01T00:00:00Z",
  "esta_ativo": true,
  "url_imagem_perfil": "https://..."
}`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-blue-600 dark:text-blue-400 font-medium mb-2">Também aceitável: camelCase</h4>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                        <pre className="text-sm text-blue-800 dark:text-blue-200">
{`{
  "idUsuario": 123,
  "primeiroNome": "João",
  "ultimoNome": "Silva",
  "enderecoEmail": "usuario@exemplo.com",
  "criadoEm": "2024-01-01T00:00:00Z",
  "estaAtivo": true,
  "urlImagemPerfil": "https://..."
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* HTTP Methods */}
            <section id="http-methods" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Uso de Métodos HTTP</h2>
              
              <div className="space-y-4">
                {[
                  {
                    method: 'GET',
                    purpose: 'Obter recursos',
                    characteristics: 'Seguro, idempotente, cacheável',
                    examples: [
                      'GET /api/v1/usuarios - Obter lista de usuários',
                      'GET /api/v1/usuarios/123 - Obter usuário específico',
                      'GET /api/v1/usuarios?pagina=2&limite=20 - Obter com paginação'
                    ],
                    color: 'green'
                  },
                  {
                    method: 'POST',
                    purpose: 'Criar recursos',
                    characteristics: 'Não seguro, não idempotente, não cacheável',
                    examples: [
                      'POST /api/v1/usuarios - Criar novo usuário',
                      'POST /api/v1/usuarios/123/pedidos - Criar pedido para usuário',
                      'POST /api/v1/auth/login - Login de usuário'
                    ],
                    color: 'blue'
                  },
                  {
                    method: 'PUT',
                    purpose: 'Atualização completa de recursos',
                    characteristics: 'Não seguro, idempotente, não cacheável',
                    examples: [
                      'PUT /api/v1/usuarios/123 - Atualizar completamente informações do usuário',
                      'PUT /api/v1/usuarios/123/senha - Atualizar senha'
                    ],
                    color: 'yellow'
                  },
                  {
                    method: 'PATCH',
                    purpose: 'Atualização parcial de recursos',
                    characteristics: 'Não seguro, não idempotente, não cacheável',
                    examples: [
                      'PATCH /api/v1/usuarios/123 - Atualizar parcialmente informações do usuário',
                      'PATCH /api/v1/usuarios/123/status - Atualizar status do usuário'
                    ],
                    color: 'purple'
                  },
                  {
                    method: 'DELETE',
                    purpose: 'Excluir recursos',
                    characteristics: 'Não seguro, idempotente, não cacheável',
                    examples: [
                      'DELETE /api/v1/usuarios/123 - Excluir usuário',
                      'DELETE /api/v1/usuarios/123/sessoes - Excluir sessões do usuário'
                    ],
                    color: 'red'
                  }
                ].map((item) => (
                  <div key={item.method} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start space-x-4">
                      <div className={`px-3 py-1 rounded font-mono text-sm font-bold text-white bg-${item.color}-600`}>
                        {item.method}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {item.purpose}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                          Características: {item.characteristics}
                        </p>
                        <div className="space-y-1">
                          {item.examples.map((example, index) => (
                            <code key={index} className="block text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                              {example}
                            </code>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Error Handling */}
            <section id="error-handling" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <ExclamationTriangleIcon className="w-8 h-8 mr-3 text-orange-600" />
                Tratamento de Erros
              </h2>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Formato Unificado de Resposta de Erro</h3>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <pre className="text-sm overflow-x-auto">
{`{
  "erro": {
    "codigo": "VALIDACAO_FALHOU",
    "mensagem": "Falha na validação dos dados da solicitação",
    "detalhes": [
      {
        "campo": "email",
        "mensagem": "Formato de email incorreto"
      },
      {
        "campo": "senha",
        "mensagem": "Senha deve ter pelo menos 8 caracteres"
      }
    ],
    "timestamp": "2024-01-01T12:00:00Z",
    "id_solicitacao": "req_123456"
  }
}`}
                  </pre>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Explicação dos Campos de Resposta de Erro</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <code>codigo</code>: Código de erro legível por máquina</li>
                      <li>• <code>mensagem</code>: Descrição de erro legível por humanos</li>
                      <li>• <code>detalhes</code>: Informações detalhadas do erro (opcional)</li>
                      <li>• <code>timestamp</code>: Hora em que o erro ocorreu</li>
                      <li>• <code>id_solicitacao</code>: ID da solicitação para rastreamento de logs</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                  <h4 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">Tipos Comuns de Erro</h4>
                  <ul className="space-y-2 text-red-700 dark:text-red-300 text-sm">
                    <li>• <code>SOLICITACAO_INVALIDA</code> - Formato de solicitação incorreto</li>
                    <li>• <code>VALIDACAO_FALHOU</code> - Falha na validação de dados</li>
                    <li>• <code>AUTENTICACAO_NECESSARIA</code> - Requer autenticação</li>
                    <li>• <code>PERMISSAO_NEGADA</code> - Permissões insuficientes</li>
                    <li>• <code>RECURSO_NAO_ENCONTRADO</code> - Recurso não existe</li>
                    <li>• <code>LIMITE_TAXA_EXCEDIDO</code> - Excedeu limite de taxa</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">Melhores Práticas de Tratamento de Erros</h4>
                  <ul className="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
                    <li>• Fornecer descrições de erro claras</li>
                    <li>• Incluir sugestões para resolver problemas</li>
                    <li>• Usar formato de erro consistente</li>
                    <li>• Evitar exposição de informações sensíveis</li>
                    <li>• Fornecer ID de solicitação para rastreamento</li>
                    <li>• Códigos de status HTTP apropriados</li>
                  </ul>
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
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Padrões Comuns de Design de API</h3>
                  <div className="space-y-2 text-sm">
                    <code className="block bg-white dark:bg-gray-800 p-2 rounded">GET /api/v1/usuarios?pagina=1&limite=20</code>
                    <code className="block bg-white dark:bg-gray-800 p-2 rounded">GET /api/v1/usuarios?ordenar=criado_em&ordem=desc</code>
                    <code className="block bg-white dark:bg-gray-800 p-2 rounded">GET /api/v1/usuarios?filtro[status]=ativo</code>
                    <code className="block bg-white dark:bg-gray-800 p-2 rounded">GET /api/v1/usuarios?incluir=perfil,pedidos</code>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Ferramentas Relacionadas</h3>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li>• <Link href="/" className="hover:underline">Ferramenta de Formatação JSON</Link></li>
                    <li>• <Link href="/wiki/pt/json-validation" className="hover:underline">Guia de Validação JSON</Link></li>
                    <li>• <Link href="/wiki/pt/json-performance" className="hover:underline">Dicas de Otimização de Performance</Link></li>
                    <li>• Ferramentas de Geração de Documentação de API</li>
                  </ul>
                </div>
              </div>
            </section>
          </article>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>Este guia fornece padrões completos e melhores práticas para projetar APIs JSON de alta qualidade, adequado para designers de API e desenvolvedores consultarem.</p>
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