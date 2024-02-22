# syntax=docker/dockerfile:1

# using alpine base image to avoid `sharp` memory leaks.
# @see https://sharp.pixelplumbing.com/install#linux-memory-allocator

# build
FROM node:20-alpine AS build

RUN corepack enable

RUN mkdir /app && chown -R node:node /app
WORKDIR /app

USER node

COPY --chown=node:node .npmrc package.json pnpm-lock.yaml ./
RUN sed -i "s/use-node-version/# use-node-version/" .npmrc

RUN pnpm fetch

COPY --chown=node:node ./ ./
RUN sed -i "s/use-node-version/# use-node-version/" .npmrc

ARG NUXT_PUBLIC_APP_BASE_URL
ARG NUXT_PUBLIC_BOTS
ARG NUXT_PUBLIC_MATOMO_BASE_URL
ARG NUXT_PUBLIC_MATOMO_ID
ARG NUXT_PUBLIC_REDMINE_ID

RUN pnpm install --frozen-lockfile --offline

ENV NODE_ENV=production

RUN pnpm run build

# serve
FROM node:20-alpine AS serve

RUN mkdir /app && chown -R node:node /app
WORKDIR /app

USER node

COPY --from=build --chown=node:node /app/.output ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "./server/index.mjs"]
