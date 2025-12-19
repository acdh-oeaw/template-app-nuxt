# app template

template repository for nuxt apps.

## development

see [documentation](./docs/contributing.md).

## template variants

- [`variant/with-commitlint`](https://github.com/acdh-oeaw/template-app-nuxt/tree/variant/with-commitlint)
  branch: enables `commitlint` and runs it as a git hook, and as part of the validation workflow in
  a github action.
- [`variant/with-nuxt-content`](https://github.com/acdh-oeaw/template-app-nuxt/tree/variant/with-nuxt-content)
  branch: includes a basic `@nuxt/content` setup. note that `@nuxt/content` v3 includes a sqlite
  database, both server- and client-side.
- [`variant/with-sentry`](https://github.com/acdh-oeaw/template-app-nuxt/tree/variant/with-sentry)
  branch: enables error reporting with [`sentry`](https://acdh.sentry.io).
- [`variant/with-single-locale`](https://github.com/acdh-oeaw/template-app-nuxt/tree/variant/with-single-locale)
  branch: adjusts the template to support a single pre-configured locale only, and removes
  internationalised routing. ui strings are still managed in the [`i18n/messages`](./i18n/messages)
  folder to make it easy to activate full i18n support later if needed.
- [`variant/with-vue-query`](https://github.com/acdh-oeaw/template-app-nuxt/tree/variant/with-vue-query)
  branch: adds [`vue-query`](https://tanstack.com/query/latest/docs/framework/vue/overview) for
  request caching and de-duplication.
- [`variant/github-pages`](https://github.com/acdh-oeaw/template-app-nuxt/tree/variant/github-pages)
  branch: generates a static build and deploys to github pages. requires enabling "github pages" in
  the [repository settings](https://github.com/acdh-oeaw/template-app-nuxt/settings/pages) (choose
  "github actions" as source, and "main" as branch).
