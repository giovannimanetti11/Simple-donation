import { defineNuxtModule, addComponent, createResolver } from '@nuxt/kit'
import { defu } from 'defu'

export interface ModuleOptions {
  paypal: {
    clientId: string
  }
  currency: string
  amounts: number[]
  defaultAmount: number
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'simple-donation',
    configKey: 'simpleDonation',
    compatibility: {
      nuxt: '^3.0.0 || ^4.0.0'
    }
  },
  defaults: {
    paypal: {
      clientId: ''
    },
    currency: 'EUR',
    amounts: [5, 10, 20, 50],
    defaultAmount: 20,
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#60A5FA',
      background: '#FFFFFF'
    }
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const moduleOptions = defu(nuxt.options.simpleDonation, options)

    nuxt.options.runtimeConfig.public.simpleDonation = moduleOptions

    addComponent({
      name: 'SimpleDonation',
      filePath: resolve('./runtime/components/simpleDonation.vue')
    })

    nuxt.options.css.push(resolve('./runtime/styles/style.css'))
  }
})
