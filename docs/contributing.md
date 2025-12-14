# development documentation

## prerequisites

- [node.js 24.x](https://nodejs.org/en/download)
- [pnpm 10.x](https://pnpm.io/installation)

> [!TIP]
>
> you can use `pnpm` to install the required node.js version with `pnpm env use 24 --global`

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

visual snapshot tests should be run in the template's devcontainer - or a comparable debian bookworm
based linux environment -, and can be updated with:

```bash
pnpm run test:e2e:update-snapshots
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
