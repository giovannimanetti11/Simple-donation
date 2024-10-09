# Simple Donation Module for Nuxt 3

This module provides a simple donation component for Nuxt 3 projects, integrating PayPal for one-time donations in EUR.

## Features

- Easy to integrate with Nuxt 3 projects
- PayPal integration for secure payments
- Customizable donation amounts
- Responsive design using Tailwind CSS
- Internationalization support (English by default)

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

Once installed and configured, you can use the `SimpleDonation` component in your Nuxt pages or components:

```vue
<template>
  <div>
    <h1>Support Our Project</h1>
    <SimpleDonation />
  </div>
</template>
```

## Configuration

You can customize the module by passing options in your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: [
    ['simple-donation', {
      paypal: {
        clientId: process.env.PAYPAL_CLIENT_ID
      },
      // Customize default donation amounts
      defaultAmounts: [5, 10, 20, 50],
      // Customize FAQ content
      faqs: [
        {
          question: "How are donations used?",
          answer: "Your donations support our ongoing development efforts."
        },
        {
          question: "Is my payment secure?",
          answer: "Yes, all transactions are processed securely through PayPal."
        }
      ],
      // Customize component text
      i18n: {
        title: "Support Our Project",
        submitButton: "Donate Now",
        // Add more text customizations as needed
      }
    }]
  ]
})
```

## Customization

### Styling

The component uses Tailwind CSS classes by default. You can override these classes by targeting the component's elements in your own CSS or by using Tailwind's `@apply` directive.

### Internationalization

While the component's default language is English, you can easily translate the text by passing custom strings through the `i18n` option in the module configuration.

## Development

To contribute to this project:

1. Clone the repository
2. Install dependencies with `npm install`
3. Run `npm run dev` to start the development server
4. Make your changes and submit a pull request

## Testing

Run the test suite with:

```bash
npm run test
```

## Building

To build the module for production:

```bash
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.