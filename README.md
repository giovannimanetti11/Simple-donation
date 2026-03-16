# Simple donation module for Nuxt

[![Last Commit](https://img.shields.io/github/last-commit/giovannimanetti11/Simple-donation)](https://github.com/giovannimanetti11/Simple-donation/commits/main)
[![License](https://img.shields.io/github/license/giovannimanetti11/Simple-donation)](https://github.com/giovannimanetti11/Simple-donation/blob/main/LICENSE)
[![Language](https://img.shields.io/github/languages/top/giovannimanetti11/Simple-donation)](https://github.com/giovannimanetti11/Simple-donation)
[![npm version](https://img.shields.io/npm/v/simple-donation)](https://www.npmjs.com/package/simple-donation)
[![npm downloads](https://img.shields.io/npm/dm/simple-donation)](https://www.npmjs.com/package/simple-donation)

A customizable donation component for Nuxt 3 and Nuxt 4 projects, with PayPal integration for one-time donations in EUR.

## Live demo

You can see it in action at [https://wikiherbalist.com/donazioni](https://wikiherbalist.com/donazioni).

## Features

- Compatible with Nuxt 3 and Nuxt 4
- PayPal integration for secure payments
- Customizable donation amounts
- Multilingual support: EN, IT, ES, FR, DE
- Responsive design with Tailwind CSS
- Configurable color scheme via CSS variables
- Custom FAQ sidebar
- XSS protection via DOMPurify sanitization
- Full TypeScript support

## Requirements

- Nuxt 3.x or Nuxt 4.x
- Node.js 18.x or higher

## Installation

1. Install the package:

```bash
npm install simple-donation
# or
yarn add simple-donation
```

2. Add the module to your `nuxt.config.ts` as described in the [Configuration](#configuration) section.

3. Create a `.env` file in your project root and add your PayPal client ID:

```
PAYPAL_CLIENT_ID=your_paypal_client_id_here
```

## Usage

Once installed and configured, add the component to any page or component:

```vue
<template>
  <div>
    <h1>Support our project</h1>
    <SimpleDonation />
  </div>
</template>
```

## Configuration

Configure the module in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: [
    ['simple-donation', {
      paypal: {
        clientId: process.env.PAYPAL_CLIENT_ID
      },
      colors: {
        primary: '#3B82F6',   // main buttons and highlights
        secondary: '#1E40AF', // secondary elements
        accent: '#60A5FA',    // accents and focus states
        background: '#FFFFFF' // component background
      }
    }]
  ]
})
```

## Customization

### Language

Use the `lang` prop to set the component language. Supported values: `en`, `it`, `es`, `fr`, `de`. Defaults to `en`.

```vue
<SimpleDonation lang="it" />
```

All UI labels, step names, button text, and default FAQ content will be displayed in the chosen language.

### Color scheme

The four color options available are:

- `primary`: main color for buttons and highlights
- `secondary`: used for secondary elements and hover states
- `accent`: used for accents and focus states
- `background`: background color of the component

### Custom FAQs

Pass a `faqs` prop to override the default FAQ items shown in the sidebar:

```vue
<template>
  <div>
    <SimpleDonation lang="it" :faqs="customFaqs" />
  </div>
</template>

<script setup>
const customFaqs = [
  {
    question: 'Come vengono utilizzate le donazioni?',
    answer: 'Le donazioni supportano lo sviluppo e la manutenzione del progetto.'
  },
  {
    question: 'Il sistema è sicuro?',
    answer: 'Sì, tutte le transazioni utilizzano sistemi con elevati livelli di sicurezza.'
  },
  {
    question: 'Posso fare una donazione ricorrente?',
    answer: 'Al momento supportiamo solo donazioni una tantum.'
  }
]
</script>
```

Each FAQ item needs a `question` and an `answer` property. HTML is allowed and automatically sanitized.

## Roadmap

- Multiple currencies: support for currencies other than EUR.
- Recurring donations: let donors set up a monthly contribution.
- More payment options: including cryptocurrency.
- Automatic thank-you emails to donors after each transaction.

## Contributing

Contributions are welcome. Feel free to open an issue or submit a pull request on [GitHub](https://github.com/giovannimanetti11/Simple-donation).

## License

This project is open source and available under the [MIT License](LICENSE).
