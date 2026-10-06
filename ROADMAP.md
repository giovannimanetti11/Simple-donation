# Roadmap

Simple Donation aims to stay small, framework-friendly and safe to embed in Nuxt applications. The roadmap prioritizes payment reliability, integration hooks and accessibility before adding more payment providers.

## 1.5 — Donation flow and integrations

- Recurring PayPal donations with an explicit opt-in flow.
- Optional donor fields: allow projects to hide name and/or email collection.
- Headless and compact modes for projects that want to provide their own UI.
- Configurable PayPal button style and donation copy.
- Slots/hooks for custom summary, success and error experiences.
- Stronger client-side validation with configurable minimum and maximum amounts.
- Additional emitted metadata for analytics integrations without sending analytics from the package itself.

## 1.6 — Server-side verification

- Optional Nuxt server utilities for PayPal order verification.
- Webhook helpers for verified payment events.
- Idempotency guidance and helpers to avoid processing a payment twice.
- Clear separation between browser approval and server-verified donation state.
- Example integrations for thank-you emails and donor persistence without bundling a mail or database provider.

## Quality and compatibility

- Automated Nuxt 3 and Nuxt 4 CI matrix.
- Unit tests for amount validation, localization and configuration merging.
- Component tests for success, error and cancellation flows.
- Accessibility review: keyboard navigation, focus management, labels and live status messages.
- Package-content regression test so required runtime files cannot be omitted from npm releases.
- Security review of runtime dependencies before every release.

## Future / 2.x candidates

- Provider abstraction so PayPal is not hardwired into the component internals.
- Additional payment providers only when they can use the same small API surface without increasing setup complexity.
- Custom translation dictionaries and easier integration with application-level i18n.
- More granular theming via CSS custom properties and slots.

## Not currently prioritized

Cryptocurrency payments are not planned for the near term. Reliability, recurring donations, verified server-side events and a cleaner integration API are higher-value additions for the package.
