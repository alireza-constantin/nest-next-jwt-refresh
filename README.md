# nest-next-jwt

an example of jwt refresh and access token authentication

# Description

This app is built using the combination of NestJS and NextJS frameworks, providing server and client-side authentication with Passport and Jotai as state manager respectively. The home page, represented by the '/' endpoint, is a server-side component, while all authentication functions are implemented on the client-side, allowing access tokens to be safely stored on the user's browser.

Although the app is currently functioning well, there are many possibilities for improvement and optimization. With the versatility and flexibility of NestJS and NextJS, there is ample room for feature additions and UI/UX enhancements. further enhancing the app's overall performance and reliability.


## Tech Stack

**React, Nextjs, Typescript, Jotai, Prisma, TailwindCSS, S**

**DB:** Postgresql

## Run Locally

Clone the project

```bash
  git clone https://github.com/alireza-constantin/roundest-poki
```

Install dependencies

```bash
  npm install | pnpm install
```

## Create .env file

then enter your database url to these variable in .env file

```code
    DATABASE_URL=
```

Start the development server

```bash
  npm run dev:backend
  npm run dev:frontend
```