# syntax=docker/dockerfile:1

# Supplied from package.json and pnpm-lock.yaml by scripts/docker-versions.ts.
ARG NODE_VERSION
ARG PNPM_VERSION
ARG PLAYWRIGHT_VERSION

FROM node:${NODE_VERSION:?required} AS node

FROM mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION:?required}-resolute

ARG PNPM_VERSION

COPY --from=node /usr/local/ /usr/local/
RUN npm install --global "pnpm@${PNPM_VERSION:?required}"
