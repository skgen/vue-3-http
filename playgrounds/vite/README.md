
<p align="center">
  <h1 align="center">Vue 3 CSR App</h1>
  <p align="center">
     <strong>Vue 3 - TypeScript</strong> starter for client side rendering apps
  </p>
</p>
<br/>
<p align="center">
    <a href="https://vuejs.org">
    <img src="https://img.shields.io/badge/Vue3-41B883?logo=vuedotjs&logoColor=364659" />
    </a>
    <a href="https://vitejs.dev">
    <img src="https://img.shields.io/badge/Vite-9e54f3?logo=vite&logoColor=f6c84c" />
    </a>
    <a href="https://www.typescriptlang.org">
    <img src="https://img.shields.io/badge/TypeScript-4377c0?logo=typescript&logoColor=ffffff" />
    </a>
    <a href="https://eslint.org">
    <img src="https://img.shields.io/badge/ESLint-4f38bc?logo=eslint&logoColor=ffffff" />
    </a>
    <a href="https://stylelint.io">
    <img src="https://img.shields.io/badge/StyleLint-black?logo=stylelint&logoColor=ffffff" />
    </a>
</p>

<br/>
<br/>

## Table of contents

- [Recommended IDE Setup](#recommended-ide-setup)
- [Managing .env](#env)
- [Project Setup](#project-setup)
  - [Compile and Hot-Reload for Development](#project-setup-dev)
  - [Type-Check, Compile and Minify for Production](#project-setup-build)
  - [Lint with ESLint & Stylelint](#project-setup-lint)
- [Folder Architecture](#folder-architecture)

<h2 id="recommended-ide-setup">Recommended IDE Setup</h2>

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

<h2 id="env">Create <code>.env.local</code> file based on <code>.env</code></h2>

Update `VITE_APP_PORT` to fit the project number.
*e.g.: **PUX012**, `VITE_APP_PORT=3012`*

<h2 id="project-setup">Project Setup</h2>

```sh
yarn install
```

<h3 id="project-setup-dev">Compile and Hot-Reload for Development</h3>  

```sh
yarn dev
```

<h3 id="project-setup-build"> Type-Check, Compile and Minify for Production</h3>

```sh
yarn build
```

<h3 id="project-setup-lint"> Lint with <a href="https://eslint.org">ESLint</a> & <a href="https://stylelint.io">Stylelint</a></h3>

```sh
yarn lint
```

<h2 id="folder-architecture">Folder Architecture</h2>

### `/i18n` Translations

To create new translation languages, simply create a new file matching locale code
**e.g.:** `fr|en|en-GB|en-US.json`

Re run `yarn dev` to force compiler to parse again i18n files & detect locales
> Locales are automatically detected thanks to **@intlify/unplugin-vue-i18n** at build time & when server starts, they are then stored in-memory and served throught an import alias handled by **vite**

### `/public` Public resources

> Public resources **are not compiled** at build time whereas asset ones are, for deeper explanations : check [this](https://vitejs.dev/guide/assets.html) 

#### `/public/fonts`
Every fonts used in the project

#### `/public/images`
Public served images

#### `/public/meta`
Meta assets like a *favicon* or any other *manifest*, *apple*|*android* icons ... They are usually included in some `<header />` `<meta />` tags

### `/src` Application code

#### `/src/main.ts`

This is the entry point of the app.

#### `/src/App.vue`

This is the top level component of the app.

#### `/src/@types`
Contains all the implicit types declarations like external JS libraries types definitions or global types

#### `/src/assets`
*files:* `.scss` `.{png|jpg}`
Every compiled assets ending up in the final bundle/chunks of the app (usuallt contains some images & style)

#### `/src/app`
>#module-folder-reference

The `/src/app` folder represents the folder structure of a **module**.
The ***app*** is the **global module**.

##### `/src/app/components`
*files:* `.vue`

This folder contains each **`Vue` component** of a module.
Components are meant to store basic logic. For complex ones, you'd better export it into a *hook.*

##### `/src/app/composables`
*files:* `.ts`

This folder contains each **`Vue` hook** of a module.
Hooks store reusable logic of a module.

##### `/src/app/contexts`
*files:* `.ts`, `.vue`

This folder contains each **context** of a module.
A *context* is a complex architecture allowing developers to interact between components through a complex component tree.
It takes benefit from the **provide/inject** `Vue` feature, helps developers to structure their logic, & prevent errors with a simple syntax.

You can see an example [here](https://gitlab.com/patriarche/vuejs-3/vue-3-csr-app/-/snippets/2528922).

###### `/src/app/contexts/{contextName}`

A context is composed of **4 parts** :

- A definition file (mandatory / pure Typescript) : It defines the inject key and data structure
- A hook file (mandatory / `Vue` hook) : It consumes the context in a safe way (preventing injection errors) in a component *script*
- A Provider file (mandatory / `Vue` component) : It injects the context through the component tree
- A Consumer file (optionnal / `Vue` component) : It consumes the context in a safe way (preventing injection errors) in a component *template*

##### `/src/app/lib`
*files:* `.ts`

This folder contains all the classic algorithm logic (helpers, tweens, classic http calls, ...) of a module.

##### `/src/app/models`
*files:* `.ts`

This folder contains each **model** of a module.
A model is composed of a data validator (with **Zod**) and a typescript type.

##### `/src/app/stores`
*files:* `.ts`

This folder contains each **store** of a module.
> i.e: [store documentation](https://pinia.vuejs.org/)

##### `/src/app/views`
*files:* `.vue`

This folder contains each **view** of a module.
A view represents the entry point of a *route*.

##### `/src/app/routes.ts`

This file contains each **route** of a module. It is imported in the **router**.

#### `/src/modules`

This folder contains the **modules** of the application. This folder is composed of multiple child folders representing each individual standalone part of the application.
A **module** folder is a mirror of `/src/app` folder structure.

#####`/src/modules/{moduleName}`

Everything inside a **module** is scoped to the module, and therefore **it's forbidden to use module code outside of its folder**.
This limits side effects & ensure modules integrity.

#### `/src/plugins`

This folder contains the **plugins** of the application
> i.e: [plugin documentation](https://vuejs.org/guide/reusability/plugins.html)