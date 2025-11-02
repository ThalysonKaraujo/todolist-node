# 📝 TodoList API

API RESTful para gerenciamento de tarefas (To-Do List) construída com Node.js, TypeScript, Express e PostgreSQL.

Este projeto foi desenvolvido como parte do meu aprendizado em Node.js, vindo de um background em Java/Spring Boot.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Express** - Framework web minimalista
- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - ORM TypeScript-first
- **JWT** - Autenticação via JSON Web Tokens
- **bcryptjs** - Hash de senhas
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
├── middlewares/     # Middlewares (autenticação, error handler)
├── db/              # Configuração do banco e schemas
├── errors/          # Erros customizados
└── schemas/         # Validação de dados
```

### Fluxo de Requisição

```
HTTP Request → Routes → Middleware (Auth) → Controller → Service → Repository → Database
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

Adicione as seguintes variáveis no arquivo `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/todolist
JWT_SECRET=seu_secret_super_seguro_aqui
NODE_ENV=development
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

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. O token é armazenado em cookies HTTP-only para maior segurança.

### Fluxo de Autenticação

1. Usuário faz registro (`POST /auth/register`)
2. Usuário faz login (`POST /auth/login`)
3. Token JWT é retornado em um cookie
4. Token é enviado automaticamente nas próximas requisições
5. Middleware valida o token antes de acessar rotas protegidas

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

### Autenticação

| Método | Endpoint         | Descrição             | Autenticação |
| ------ | ---------------- | --------------------- | ------------ |
| POST   | `/auth/register` | Registra novo usuário | ❌           |
| POST   | `/auth/login`    | Faz login             | ❌           |

### Tarefas

| Método | Endpoint     | Descrição               | Autenticação |
| ------ | ------------ | ----------------------- | ------------ |
| GET    | `/todos`     | Lista todas as tarefas  | ✅           |
| GET    | `/todos/:id` | Busca uma tarefa por ID | ✅           |
| POST   | `/todos`     | Cria uma nova tarefa    | ✅           |
| PUT    | `/todos/:id` | Atualiza uma tarefa     | ✅           |
| DELETE | `/todos/:id` | Deleta uma tarefa       | ✅           |

### Exemplos de Requisição

**POST /auth/register**

```json
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Resposta**

```json
{
  "id": 1,
  "email": "usuario@example.com",
  "createdAt": "2025-11-02T10:30:00.000Z"
}
```

**POST /auth/login**

```json
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Resposta**

```json
{
  "id": 1,
  "email": "usuario@example.com",
  "createdAt": "2025-11-02T10:30:00.000Z"
}
```

_Nota: O token JWT é retornado automaticamente em um cookie HTTP-only._

**POST /todos** (Requer autenticação)

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
  "userId": 1,
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

## 🔒 Segurança

- Senhas são criptografadas com bcrypt (10 salt rounds)
- Tokens JWT armazenados em cookies HTTP-only
- Cookie com flag `secure` em produção (HTTPS)
- Cookie com `sameSite: 'lax'` para proteção CSRF
- Validação de token em todas as rotas protegidas

## 🎯 Próximos Passos

- [x] Implementar autenticação JWT
- [ ] Adicionar documentação com Swagger/OpenAPI
- [ ] Implementar validação de dados com Zod
- [ ] Adicionar testes de integração
- [ ] Implementar paginação nos endpoints
- [ ] Adicionar filtros e ordenação
- [ ] Implementar refresh tokens
- [ ] Adicionar logout
- [ ] Deploy em produção

## 📚 Aprendizados

Este projeto me permitiu entender:

- Diferenças entre Node.js/Express e Java/Spring Boot
- Arquitetura de APIs RESTful em TypeScript
- ORMs modernos (Drizzle vs JPA/Hibernate)
- Autenticação JWT e gerenciamento de sessões
- Hash de senhas e boas práticas de segurança
- Cookies HTTP-only vs localStorage
- Testes unitários com mocks
- Configuração de linting e formatação
- Migrations e gerenciamento de banco de dados

## 📝 Licença

Este projeto está sob a licença MIT.

---
