# 📝 TodoList API

API RESTful para gerenciamento de tarefas (To-Do List) construída com Node.js, TypeScript, Express e PostgreSQL.

Este projeto foi desenvolvido como parte do meu aprendizado em Node.js, vindo de um background em Java/Spring Boot.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Express** - Framework web minimalista
- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - ORM TypeScript-first
- **Docker** - Containerização do banco de dados
- **Vitest** - Framework de testes unitários
- **ESLint + Prettier** - Linting e formatação de código

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas, separando responsabilidades:

```
src/
├── controllers/     # Orquestração HTTP (req/res)
├── services/        # Lógica de negócio
├── repositories/    # Acesso ao banco de dados
├── routes/          # Definição de endpoints
├── db/              # Configuração do banco e schemas
├── errors/          # Erros customizados
└── middlewares/     # Middlewares (error handler, etc)
```

### Fluxo de Requisição

```
HTTP Request → Routes → Controller → Service → Repository → Database
```

## 📋 Pré-requisitos

- Node.js (v18+)
- Docker e Docker Compose
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/todolist-api.git
cd todolist-api
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Suba o banco de dados com Docker:

```bash
docker-compose up -d
```

5. Execute as migrations:

```bash
npx drizzle-kit migrate
```

6. Inicie o servidor:

```bash
npm run dev
```

A API estará rodando em `http://localhost:3000`

## 🧪 Testes

Execute os testes unitários:

```bash
npm test
```

Execute os testes em modo watch:

```bash
npm run test:watch
```

## 📡 Endpoints

### Tarefas

| Método | Endpoint     | Descrição               |
| ------ | ------------ | ----------------------- |
| GET    | `/todos`     | Lista todas as tarefas  |
| GET    | `/todos/:id` | Busca uma tarefa por ID |
| POST   | `/todos`     | Cria uma nova tarefa    |
| PUT    | `/todos/:id` | Atualiza uma tarefa     |
| DELETE | `/todos/:id` | Deleta uma tarefa       |

### Exemplo de Requisição

**POST /todos**

```json
{
  "title": "Estudar Node.js",
  "description": "Aprender Express e Drizzle ORM"
}
```

**Resposta**

```json
{
  "id": 1,
  "title": "Estudar Node.js",
  "description": "Aprender Express e Drizzle ORM",
  "createdAt": "2025-11-01T01:51:35.829Z",
  "isFinished": false
}
```

## 🗂️ Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor em modo desenvolvimento
npm test             # Executa os testes
npm run test:watch   # Executa os testes em modo watch
npm run lint         # Verifica problemas de linting
npm run lint:fix     # Corrige problemas de linting
npm run format       # Verifica formatação do código
npm run format:fix   # Formata o código
```

## 🎯 Próximos Passos

- [ ] Implementar autenticação JWT
- [ ] Adicionar documentação com Swagger/OpenAPI
- [ ] Implementar validação de dados com Zod
- [ ] Adicionar testes de integração
- [ ] Implementar paginação nos endpoints
- [ ] Adicionar filtros e ordenação
- [ ] Deploy em produção

## 📚 Aprendizados

Este projeto me permitiu entender:

- Diferenças entre Node.js/Express e Java/Spring Boot
- Arquitetura de APIs RESTful em TypeScript
- ORMs modernos (Drizzle vs JPA/Hibernate)
- Testes unitários com mocks
- Configuração de linting e formatação
- Migrations e gerenciamento de banco de dados

## 📝 Licença

Este projeto está sob a licença MIT.

---
