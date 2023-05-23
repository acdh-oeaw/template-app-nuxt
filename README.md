# Template for Nuxt 3 applications

Skeleton app for new Nuxt 3 apps developed at [ACDH-CH](https://www.oeaw.ac.at/acdh/acdh-ch-home).

## Prerequisites

You need to have **Node.js** and **pnpm** installed on your system to base your own projects on this example app.

For download and install instructions, see:

- [Node.js v18](https://nodejs.org/en/download)
- [pnpm](https://pnpm.io/installation)


## Setup

### Configure environment variables

Use file `.env.example` at the root of the repository to create a new file named `.env` to store local environment variables:

```sh
cp -n .env.example .env
```

Adapt the new file's contents to your project/dev environment.


### Install dependencies

Run the following command to install all required dependencies:

```sh
pnpm install
```

## Usage

To run the app, use:

```sh
pnpm run dev
```

You should now be able to access your application at the address provided via `NUXT_PUBLIC_APP_BASE_URL`  in your `.env` file.  The default address given in the example file is [http://localhost:3000](http://localhost:3000).
