# syntax=docker/dockerfile:1

ARG NODE_VERSION=26
ARG PNPM_VERSION=12.18.0
# Keep this version aligned with @playwright/test in pnpm-lock.yaml.
ARG PLAYWRIGHT_VERSION=1.65.0

FROM node:${NODE_VERSION} AS node

FROM mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-resolute

ARG PNPM_VERSION

COPY --from=node /usr/local/ /usr/local/
RUN npm install --global "pnpm@${PNPM_VERSION}"
