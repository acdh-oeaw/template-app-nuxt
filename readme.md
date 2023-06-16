# app template

template repository for nuxt 3 apps.

## how to run

prerequisites:

- [Node.js v18](https://nodejs.org/en/download)
- [pnpm](https://pnpm.io/installation)

set required environment variables in `.env`:

```bash
cp .env.example .env
```

adjust environment variables in `.github/workflows/validate.yml`.

install dependencies:

```bash
pnpm install
```

run a development server on [http://localhost:3000](http://localhost:3000):

```bash
pnpm run dev
```
