import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

declare global {
  interface Window {
    paypal?: any
  }
}

let paypalSdkPromise: Promise<void> | null = null
let paypalSdkUrl: string | null = null

export function usePaypal() {
  const config = useRuntimeConfig()
  const isPaypalLoaded = ref(false)

  const loadPaypalScript = (currency = 'EUR') => {
    if (typeof window === 'undefined') {
      return Promise.reject(new Error('PayPal SDK can only be loaded in the browser'))
    }

    const clientId = String(config.public.simpleDonation?.paypal?.clientId || '').trim()
    if (!clientId) {
      return Promise.reject(new Error('Missing PayPal client ID'))
    }

    const normalizedCurrency = String(currency || 'EUR').toUpperCase()
    const url = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=${encodeURIComponent(normalizedCurrency)}`

    if (window.paypal) {
      if (paypalSdkUrl && paypalSdkUrl !== url) {
        return Promise.reject(new Error('PayPal SDK is already loaded with a different client ID or currency'))
      }
      isPaypalLoaded.value = true
      paypalSdkUrl = paypalSdkUrl || url
      return Promise.resolve()
    }

    if (paypalSdkPromise) {
      if (paypalSdkUrl !== url) {
        return Promise.reject(new Error('PayPal SDK is already loading with a different client ID or currency'))
      }
      return paypalSdkPromise
    }

    paypalSdkUrl = url
    paypalSdkPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = url
      script.async = true
      script.dataset.simpleDonationSdk = 'true'
      script.onload = () => {
        if (window.paypal) {
          isPaypalLoaded.value = true
          resolve()
        } else {
          paypalSdkPromise = null
          reject(new Error('PayPal SDK loaded but is not available'))
        }
      }
      script.onerror = () => {
        paypalSdkPromise = null
        paypalSdkUrl = null
        reject(new Error('Failed to load PayPal SDK'))
      }
      document.head.appendChild(script)
    })

    return paypalSdkPromise
  }

  const initPaypal = async (currency = 'EUR') => {
    await loadPaypalScript(currency)
    isPaypalLoaded.value = true
  }

  const renderPayPalButtons = (
    container: HTMLElement,
    amount: number,
    currency: string,
    onSuccess: (details: any) => void,
    onError: (error: Error) => void,
    onCancel?: (data: any) => void
  ) => {
    if (typeof window === 'undefined' || !window.paypal) {
      onError(new Error('PayPal SDK not loaded'))
      return
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      onError(new Error('Donation amount must be a positive number'))
      return
    }

    container.innerHTML = ''

    try {
      window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal'
        },
        createOrder: (_data: any, actions: any) => actions.order.create({
          purchase_units: [{
            amount: {
              value: amount.toFixed(2),
              currency_code: currency.toUpperCase()
            }
          }]
        }),
        onApprove: async (_data: any, actions: any) => {
          try {
            const details = await actions.order.capture()
            onSuccess(details)
          } catch (error: any) {
            onError(error instanceof Error ? error : new Error(String(error)))
          }
        },
        onCancel: (data: any) => onCancel?.(data),
        onError: (error: any) => {
          onError(error instanceof Error ? error : new Error(String(error)))
        }
      }).render(container)
    } catch (error: any) {
      onError(error instanceof Error ? error : new Error(String(error)))
    }
  }

  return {
    initPaypal,
    renderPayPalButtons,
    isPaypalLoaded
  }
}
