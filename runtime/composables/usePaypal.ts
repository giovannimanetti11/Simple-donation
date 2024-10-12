import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

export function usePaypal() {
  const config = useRuntimeConfig()
  const isPaypalLoaded = ref(false)

  // Function to load the PayPal SDK script
  const loadPaypalScript = () => {
    return new Promise<void>((resolve, reject) => {
      // Check if PayPal is already loaded
      if (window.paypal) {
        isPaypalLoaded.value = true
        resolve()
        return
      }

      // Create and append the PayPal script
      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=${config.public.simpleDonation.paypal.clientId}&currency=EUR`
      script.async = true
      script.onload = () => {
        if (window.paypal) {
          isPaypalLoaded.value = true
          console.log('PayPal SDK loaded successfully')
          resolve()
        } else {
          reject(new Error('PayPal SDK loaded but not available'))
        }
      }
      script.onerror = (error) => {
        console.error('Failed to load PayPal SDK', error)
        reject(new Error('Failed to load PayPal SDK'))
      }
      document.body.appendChild(script)
    })
  }

  // Function to initialize PayPal
  const initPaypal = async () => {
    if (!isPaypalLoaded.value) {
      try {
        await loadPaypalScript()
      } catch (error) {
        console.error('Error initializing PayPal SDK:', error)
        throw error
      }
    }
  }

  // Function to render PayPal buttons
  const renderPayPalButtons = (amount: number, onSuccess: Function, onError: Function) => {
    if (typeof window === 'undefined' || !window.paypal) {
      console.error('PayPal SDK not loaded')
      onError(new Error('PayPal SDK not loaded'))
      return
    }

    try {
      const container = document.getElementById('paypal-button-container')
      if (container) {
        container.innerHTML = ''
      } else {
        throw new Error('PayPal button container not found')
      }

      window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount.toFixed(2),
                currency_code: 'EUR'
              }
            }]
          })
        },
        onApprove: async (data: any, actions: any) => {
          console.log('Payment approved. Capturing order...')
          try {
            const details = await actions.order.capture()
            console.log('Transaction completed:', details)
            onSuccess(details)
          } catch (error: any) {
            console.error('Error capturing order:', error)
            if (error.details && error.details[0].issue === 'TRANSACTION_REFUSED') {
              console.error('Transaction refused. Please check your sandbox account configuration.')
              onError(new Error('Transaction refused. Please check your sandbox account configuration.'))
            } else {
              onError(error)
            }
          }
        },
        onError: (err: any) => {
          console.error('PayPal error:', err)
          if (err.message.includes('TRANSACTION_REFUSED')) {
            onError(new Error('Transaction refused. Please check your sandbox account configuration.'))
          } else {
            onError(err)
          }
        }
      }).render('#paypal-button-container')
    } catch (error) {
      console.error('Error rendering PayPal buttons:', error)
      onError(error)
    }
  }

  return {
    initPaypal,
    renderPayPalButtons
  }
}