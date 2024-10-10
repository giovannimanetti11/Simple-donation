# Simple donation module for Nuxt 3

This module provides a straightforward donation component for Nuxt 3 projects, integrating PayPal for one-time donations in EUR.

## Features

- Easy integration with Nuxt 3 projects
- PayPal integration for secure payments
- Customizable donation amounts
- Responsive design using Tailwind CSS

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

The module is configured directly in your `nuxt.config.ts`. Currently, the only required configuration is the PayPal client ID:

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

## Development

- Run `npm run dev` to start the playground in development mode.
- Run `npm run build` to build the playground.
- Run `npm run lint` to run ESLint.

## Contributing

Contributions are welcome! Feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
