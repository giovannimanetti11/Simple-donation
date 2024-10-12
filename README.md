# Simple donation module for Nuxt 3

This module provides a customizable donation component for Nuxt 3 projects, integrating PayPal for one-time donations in EUR.

## Features

- Easy integration with Nuxt 3 projects
- PayPal integration for secure payments
- Customizable donation amounts
- Responsive design using Tailwind CSS
- Customizable color scheme

## Installation

1. Install the package:

```bash
npm install simple-donation
# or
yarn add simple-donation
```

2. Add the module to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: [
    ['simple-donation', {
      paypal: {
        clientId: process.env.PAYPAL_CLIENT_ID
      },
      colors: {
        primary: '#3B82F6',   // Default blue color
        secondary: '#1E40AF', // Darker blue
        accent: '#60A5FA'     // Lighter blue
      }
    }]
  ]
})
```

3. Create a `.env` file in your project root and add your PayPal client ID:

```
PAYPAL_CLIENT_ID=your_paypal_client_id_here
```

## Usage

After installation and configuration, you can use the `SimpleDonation` component in your Nuxt pages or components:

```vue
<template>
  <div>
    <h1>Support Our Project</h1>
    <SimpleDonation />
  </div>
</template>
```

## Configuration

The module is configured directly in your `nuxt.config.ts`. You can customize the PayPal client ID and the color scheme:

```typescript
export default defineNuxtConfig({
  modules: [
    ['simple-donation', {
      paypal: {
        clientId: process.env.PAYPAL_CLIENT_ID
      },
      colors: {
        primary: '#3B82F6',   // Custom primary color
        secondary: '#1E40AF', // Custom secondary color
        accent: '#60A5FA'     // Custom accent color
      }
    }]
  ]
})
```

## Customization

### Color Customization

You can customize the color scheme of the donation component by modifying the `colors` object in the module configuration. The available color options are:

- `primary`: the main color used for buttons and highlights
- `secondary`: used for secondary elements and hover states
- `accent`: used for accents and focus states

### FAQ Customization

You can customize the FAQs displayed in the donation component's sidebar by passing a faqs prop to the SimpleDonation component. Here's an example of how to do this in a Vue component:

```vue
<template>
  <div>
    <h1>Support Our Project</h1>
    <SimpleDonation :faqs="customFaqs" />
  </div>
</template>

<script setup>
const customFaqs = [
  {
    question: 'How are donations used?',
    answer: 'Donations are used to support the development and maintenance of our project.'
  },
  {
    question: 'Is this system secure?',
    answer: 'Yes, all transactions use systems with high levels of security.',
  },
  {
    question: 'Can I make a recurring donation?',
    answer: 'Currently, we only support one-time donations, but we are working on implementing recurring donations in the future.',
  }
]
</script>
```

Each FAQ item should be an object with question and answer properties. The component will automatically render these custom FAQs instead of the default ones.

## Development

- Run `npm run dev` to start the playground in development mode.
- Run `npm run build` to build the playground.

## Contributing

Contributions are welcome! Feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).