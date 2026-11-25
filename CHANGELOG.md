# Changelog

## 1.4.1

- Build and test against Nuxt 4.7.0 (`nuxt` and `@nuxt/kit` 4.7.0).
- Upgrade `isomorphic-dompurify` from 2.x to 4.9.0.
- Raise the minimum Node.js version to `^22.22.3 || ^24.15.0 || >=26.0.0`, as required by Nuxt 4.7 and `isomorphic-dompurify` 4.
- Update dev tooling: TypeScript 6.0.3, ESLint 10.15.0, `eslint-plugin-vue` 10.12.1, `@typescript-eslint/parser` 8.74.0, Tailwind CSS 4.3.5.
- Regenerate the lockfile so it installs on Windows, macOS and Linux.
- Fix the step label hover color: `hover:text-primary` was used but never defined.
- Enable Tailwind CSS 4 in the playground (`@tailwindcss/vite`), so the build also generates the component utility classes.
- README: document the Tailwind CSS requirement and setup, the `currency`, `amounts` and `defaultAmount` module options, and what CI actually checks.

## 1.4.0

- Fix the npm package by including `translations.ts`.
- Refresh the lockfile and add a real Nuxt build playground.
- Apply configured colors through CSS custom properties.
- Add configurable currencies, suggested amounts and default amount.
- Add `success`, `error` and `cancel` events plus optional built-in alerts.
- Reject invalid custom donation amounts before creating a PayPal order.
- Avoid PayPal button container collisions across multiple widgets.
- Make FAQ sanitization SSR-safe.
- Deduplicate PayPal SDK loading and reject incompatible duplicate SDK configurations.
