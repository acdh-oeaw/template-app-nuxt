#!/bin/sh
set -eu

# Work in a disposable copy so host dependencies and build output stay isolated.
workdir=$(mktemp -d)
tar -C /source \
  --exclude=./.git \
  --exclude=./.agents \
  --exclude=./.aws \
  --exclude=./.codex \
  --exclude=./node_modules \
  --exclude=./.pnpm-store \
  --exclude=./.nuxt \
  --exclude=./.output \
  --exclude=./.nitro \
  --exclude=./.cache \
  --exclude=./.data \
  --exclude=./dist \
  --exclude=./playwright-report \
  --exclude=./test-results \
  --exclude=./e2e/snapshots \
  -cf - . | tar -C "$workdir" -xf -

cd "$workdir"
ln -s /snapshots e2e/snapshots
pnpm install --frozen-lockfile
pnpm run build
exec pnpm run test:e2e --output=/test-results/artifacts "$@"
