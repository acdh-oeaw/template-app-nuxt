# development documentation

## prerequisites

- [node.js 26.x](https://nodejs.org/en/download)
- [pnpm 12.x](https://pnpm.io/installation)

> [!TIP]
>
> you can use `pnpm` to install the required node.js version with `pnpm runtime set node 26`

## environment variables

set required environment variables in `.env.local`:

```bash
cp .env.local.example .env.local
```

| environment variable                     | required | default    | description                    |
| ---------------------------------------- | -------- | ---------- | ------------------------------ |
| NUXT_PUBLIC_APP_BASE_URL                 | true     |            | deployment base url            |
| NUXT_PUBLIC_APP_BOTS                     | true     | "disabled" | indexing by web crawlers       |
| NUXT_PUBLIC_APP_GOOGLE_SITE_VERIFICATION | false    |            | google search console property |
| NUXT_PUBLIC_APP_IMPRINT_SERVICE_BASE_URL | true     |            | acdh imprint service base url  |
| NUXT_PUBLIC_APP_MATOMO_BASE_URL          | false    |            | acdh matomo analytics base url |
| NUXT_PUBLIC_APP_MATOMO_ID                | false    |            | acdh matomo analytics id       |
| NUXT_PUBLIC_APP_SERVICE_ID               | true     |            | acdh service id                |

also, set environment variables required by [validation](./.github/workflows/validate.yml) and
[deployment](./.github/workflows/build-deploy.yml) github actions. use
["variables"](https://github.com/acdh-oeaw/template-app-nuxt/settings/variables/actions) for every
environment variable prefixed with `NUXT_PUBLIC_`, and
["secrets"](https://github.com/acdh-oeaw/template-app-nuxt/settings/secrets/actions) for all others.

## local development

install dependencies:

```bash
pnpm install
```

run a development server on <http://localhost:3000>:

```bash
pnpm run dev
```

## how to test

generate a production build and run end-to-end tests with:

```bash
pnpm run build
pnpm run test:e2e
```

visual snapshots should be generated on Ubuntu 26.04 with the same browser versions and x86-64
architecture as CI. with Docker Engine (or Docker Desktop) and Docker Compose v2 installed, run:

```bash
pnpm run test:e2e:update-snapshots
```

this builds an Ubuntu 26.04 Playwright image with node.js 26, installs dependencies from the lockfile,
builds the app, and updates the visual snapshots in `e2e/snapshots`. the source is mounted read-only
and copied into a temporary container directory, including local `.env` files. host dependencies and
build output are isolated. snapshots, `playwright-report`, and `test-results` are written back to the
checkout. the container is removed after the run.

the test Compose configuration lives in [`e2e/docker/compose.yaml`](../e2e/docker/compose.yaml),
alongside the test Dockerfile and runner script. app service configurations can live separately;
the test commands select their Compose file explicitly.

use the same `.env.local` values as CI for imprint and analytics settings. the container sets the
base URL to `http://localhost:3000` and disables bots and custom imprints to match validation.

to run all end-to-end tests without updating snapshots, or to pass Playwright options:

```bash
pnpm run test:e2e:docker
pnpm run test:e2e:update-snapshots --project chromium
```

open the saved HTML report with `pnpm exec playwright show-report playwright-report/html`.

the container defaults to user/group `1000:1000` so snapshots are not owned by root. on Linux with
different IDs, prefix the command with `DOCKER_UID=$(id -u) DOCKER_GID=$(id -g)`. the Playwright image
version in [`e2e/docker/Dockerfile`](../e2e/docker/Dockerfile) must match `@playwright/test` in
`pnpm-lock.yaml`; keep them in sync when upgrading Playwright. x86-64 emulation on ARM hosts can make
these commands slower.

both Dockerfiles declare `NODE_VERSION` and `PNPM_VERSION` build arguments at the top; the test Dockerfile also accepts
`PLAYWRIGHT_VERSION` (without the `v` prefix). Compose forwards environment variables with those names
and uses the Dockerfile defaults when they are unset. to use the active pnpm version and the locked
Playwright version without editing Dockerfiles:

```bash
PNPM_VERSION=$(pnpm --version) \
PLAYWRIGHT_VERSION=$(pnpm list @playwright/test --lockfile-only --json | node -pe 'JSON.parse(require("node:fs").readFileSync(0, "utf8"))[0].devDependencies["@playwright/test"].version') \
pnpm run test:e2e:update-snapshots
```

for a production image, pass `docker build --build-arg PNPM_VERSION="$(pnpm --version)" ...`.

## how to deploy

- ask a sysadmin to create a new acdh kubernetes project.
- create a new namespace in that project via [rancher](https://rancher.acdh-dev.oeaw.ac.at), and set
  the `KUBE_NAMESPACE` github variable to that namespace.
- adjust the [`app_name`](./.github/workflows/build-deploy.yml#L36), which will be the name of the
  deployment in the above namespace.
- set the `PUBLIC_URL` github variable to the application's public url (e.g.
  "https://my-app.acdh-dev.oeaw.ac.at"), and set the `KUBE_INGRESS_BASE_DOMAIN` to the public url's
  base domain (e.g. "acdh-dev.oeaw.ac.at").
- when deploying to a production domain (i.e. a domain not ending in "acdh-dev.oeaw.ac.at"), set
  `HELM_UPGRADE_EXTRA_ARGS` to
  `--set 'ingress.annotations.cert-manager\.io/cluster-issuer=acdh-prod'` for "acdh.oeaw.ac.at"
  domains, or to `--set 'ingress.annotations.cert-manager\.io/cluster-issuer=letsencrypt-prod'` for
  any other non-oeaw domains, and ensure `KUBE_INGRESS_BASE_DOMAIN` is set correctly.
- create a service issue in the acdh [redmine](https://redmine.acdh.oeaw.ac.at) issue tracker, and
  set the `SERVICE_ID` github variable to the issue number. this should match the
  `NUXT_PUBLIC_APP_SERVICE_ID` variable in your `.env.local` file.
- ensure required build args (prefixed with `NUXT_PUBLIC_`) are referenced in both the
  [`Dockerfile`](./Dockerfile), as well as the [validation](./.github/workflows/validate.yml) and
  [deployment](./.github/workflows/build-deploy.yml) pipelines, and set as
  [github variables](https://github.com/acdh-oeaw/template-app-nuxt/settings/variables/actions).
- ensure required runtime environment variables are referenced in the
  [validation](./.github/workflows/validate.yml) and
  [deployment](./.github/workflows/build-deploy.yml) pipelines, and set as
  [github secrets](https://github.com/acdh-oeaw/template-app-nuxt/settings/secrets/actions). github
  secrets need to be prefixed with `K8S_SECRET_` to be automatically copied to the runtime
  environment. in case you need secrets in the docker build context, you can
  [mount a secret in the Dockerfile](https://docs.docker.com/build/building/secrets/).
- the `NUXT_PUBLIC_APP_BOTS` variable defaults to "disabled", which signals to web crawlers that the
  website should not be indexed. when deploying to a production domain (i.e. a domain not ending in
  "acdh-dev.oeaw.ac.at") this should be set to "enabled".
- to enable runtime override of public `runtimeConfig` build values through runtime env vars note
  the
  [naming conventions](https://nuxt.com/docs/guide/going-further/runtime-config#environment-variables).

> [!IMPORTANT]
>
> this is a feature exclusive to nuxt 3. for most deployment scenarios it is not needed, but it can
> be useful for deploying multiple instances from a single build.

- ensure both the github repository, and the
  [package registry](https://github.com/orgs/acdh-oeaw/packages/container/my-app/settings) is set to
  public.

if everything is set up correctly, every git push to the `main` branch will create a new deployment
if the validation pipeline passes.

you can reference the [template repository](https://github.com/acdh-oeaw/template-app-nuxt) for a
working setup.
