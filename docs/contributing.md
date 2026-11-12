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

| environment variable                     | required | default    | description                                 |
| ---------------------------------------- | -------- | ---------- | ------------------------------------------- |
| NUXT_PUBLIC_APP_BASE_URL                 | true     |            | deployment base url                         |
| NUXT_PUBLIC_APP_BOTS                     | false    | "disabled" | indexing by web crawlers                    |
| NUXT_PUBLIC_APP_GOOGLE_SITE_VERIFICATION | false    |            | google search console property              |
| NUXT_PUBLIC_APP_IMPRINT_SERVICE_BASE_URL | true     |            | acdh imprint service base url               |
| NUXT_PUBLIC_APP_MATOMO_BASE_URL          | false    |            | acdh matomo analytics base url              |
| NUXT_PUBLIC_APP_MATOMO_ID                | false    |            | acdh matomo analytics id                    |
| NUXT_PUBLIC_APP_SERVICE_ID               | false    |            | acdh service id; empty uses generic imprint |

also, set environment variables required by [validation](./.github/workflows/validate.yml) and
[deployment](./.github/workflows/build-deploy.yml) github actions. use
["variables"](https://github.com/acdh-oeaw/template-app-nuxt/settings/variables/actions) for every
environment variable prefixed with `NUXT_PUBLIC_`, and
["secrets"](https://github.com/acdh-oeaw/template-app-nuxt/settings/secrets/actions) for all others.

Application runtime settings are declared in
[`shared/config/runtime-config.ts`](../shared/config/runtime-config.ts). Add public settings to
`publicRuntimeConfigSchema` and server-only settings to `privateRuntimeConfigSchema`, alongside their
defaults in `nuxt.config.ts`. Nuxt and module configuration is preserved separately.

Use `useValidatedRuntimeConfig()` in app components, composables, and plugins. Plugins that use it
must declare `dependsOn: ["validated-runtime-config"]`. In Nitro handlers, import the server utility
from `~/server/utils/use-validated-runtime-config` and pass the request event. Server middleware
validates once per request; SSR reuses that result, and the browser validates public settings once
when the app starts. Validation errors identify invalid keys without including their values.

Matomo and service IDs accept numeric or string inputs and are normalized to strings. Empty IDs
are allowed; analytics is disabled when its URL or ID is empty. Non-empty IDs must be positive
integers. An empty service ID requests the imprint service's generic disclosure.

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

`pnpm test` checks runtime configuration validation. The e2e server starts the built output directly
and removes `NUXT_PUBLIC_APP_*` runtime overrides, so it tests the embedded build defaults used by
Docker. To exercise analytics locally, set a Matomo URL and ID before both building and testing;
the browser test intercepts tracking requests. CI supplies test defaults when analytics settings
are absent, so the analytics regression is always exercised.

visual tests run in the same Ubuntu 26.04 x86-64 Playwright container locally and in CI.
ordinary runs never create or update baselines. with Docker Engine (or Docker Desktop) and Docker
Compose v2 installed, use:

```bash
pnpm run test:e2e:docker
pnpm run test:e2e:update-snapshots
pnpm run test:e2e:update-snapshots --project chromium
```

the snapshot command updates changed and missing visual baselines in `e2e/snapshots`. the Docker
command accepts other Playwright options as well. x86-64 emulation on ARM hosts can make runs slower.

the test Compose configuration lives in [`e2e/docker/compose.yaml`](../e2e/docker/compose.yaml),
alongside the test Dockerfile and runner script. app service configurations can live separately;
the test commands select their Compose file explicitly.

the source is mounted read-only and copied into a temporary container directory, including local
`.env` files. dependencies and build output stay isolated. snapshots, `playwright-report`, and
`test-results` are written back to the checkout. the container is removed after the run. the wrapper
uses the current user's UID/GID; `DOCKER_UID` and `DOCKER_GID` can override them.

use the same imprint and analytics settings as CI in `.env.local` or the shell environment. shell
values are forwarded to the container. the container sets the base URL to `http://localhost:3000`
and disables bots and custom imprints to match validation.

open the saved HTML report with `pnpm exec playwright show-report playwright-report/html`.

for an authoritative run on GitHub Actions, install and authenticate the GitHub CLI, commit all
changes, and push the current branch to `origin`, then run:

```bash
pnpm run test:e2e:update-snapshots:ci
```

this dispatches the validation workflow with snapshot updates enabled, waits for it to succeed, and
replaces local baselines with its snapshot artifact. it requires a clean checkout and checks that
`origin` matches HEAD. failed runs, missing downloads, empty artifacts, and local changes during the
run leave existing baselines intact. review and commit downloaded changes. the workflow must first
be present on the repository's default branch for GitHub to allow manual dispatch. snapshot artifacts
are retained for seven days; manual snapshot runs do not deploy the app.

Docker versions are resolved automatically by [`scripts/docker-versions.ts`](../scripts/docker-versions.ts).
Node and pnpm use the exact minimum versions from `package.json`'s `devEngines` fields; Playwright
uses its resolved version from `pnpm-lock.yaml`. inspect them with `pnpm run docker:versions`.
Both Dockerfiles declare their version arguments at the top and have no duplicated version defaults.
The local wrapper supplies all arguments automatically; `NODE_VERSION`, `PNPM_VERSION`, and
`PLAYWRIGHT_VERSION` environment variables can override the test image versions.

production image builds receive `NODE_VERSION` and `PNPM_VERSION` automatically in the deployment
workflow. direct `docker build` calls must pass those two build arguments explicitly. for example:

```bash
docker_versions=$(node scripts/docker-versions.ts)
docker build \
  --build-arg NODE_VERSION="$(printf '%s' "$docker_versions" | jq -r .NODE_VERSION)" \
  --build-arg PNPM_VERSION="$(printf '%s' "$docker_versions" | jq -r .PNPM_VERSION)" \
  --build-arg NUXT_PUBLIC_APP_BASE_URL=http://localhost:3000 \
  --build-arg NUXT_PUBLIC_APP_IMPRINT_SERVICE_BASE_URL=https://imprint.acdh.oeaw.ac.at \
  .
```

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

- ensure both the github repository, and the
  [package registry](https://github.com/orgs/acdh-oeaw/packages/container/my-app/settings) is set to
  public.

if everything is set up correctly, every git push to the `main` branch will create a new deployment
if the validation pipeline passes.

you can reference the [template repository](https://github.com/acdh-oeaw/template-app-nuxt) for a
working setup.
