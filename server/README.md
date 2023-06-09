### Hi there! 👋

> A time capsule api that allows the user to relive precious moments of their lives. With this API users can register using github's OAuth, after that, they will have access to a CRUD to manage all their memories.
>
> The database choice was SQLite, based on the simplicity. It doesn't require a lot of server setup or optimization to get good performance. And also simple syntax, which can make SQL code development and maintenance easier.
>
> The objective of this project was to improve my backend skills. In addition to CRUD for memory management, the main part is authentication done with github's OAuth, allowing the user to have a personalized time-line, being able to share his/her memories and having many features that can be included in the API.
> 

## What is inside?

- [Node](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Fastify](https://www.fastify.io/)
- [Fastify JWT](https://github.com/fastify/fastify-jwt)
- [Fastify Multipart](https://github.com/fastify/fastify-multipart)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [GitHub OAuth](https://docs.github.com/pt/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)
- [Zod](https://zod.dev/)

## Getting Started

### Install dependencies:

```bash
pnpm install
```

or

```bash
yarn
```

or

```bash
npm install
```

### Run development server

```bash
pnpm dev
```

or

```bash
yarn dev
```

or

```bash
npm run dev
```

### 🔥 Your server started at http://localhost:3333

## Structure

```
└── src
    ├── lib
    ├── routes
```

| Folder            | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| **lib**           | Configuration of libraries used in the project                |
| **routes**        | Routes for manage the habits                                  |

## Commands

- `dev`: run development server

## 💻 Web

[Time-capsule Web](https://github.com/arthurlbo/time-capsule/tree/main/web)

## 📱 Mobile version

[Time-capsule App](https://github.com/arthurlbo/time-capsule/tree/main/mobile)

<p align="center">Made with 🤍 by Arthur</p>
