# Changelog

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
