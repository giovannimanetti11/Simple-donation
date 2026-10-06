export default defineNuxtConfig({
  modules: [
    ['../module', {
      paypal: { clientId: 'test-client-id' },
      currency: 'EUR',
      amounts: [5, 10, 20, 50],
      defaultAmount: 20
    }]
  ]
})
