// module.ts

import { defineNuxtModule, addComponent, createResolver, logger } from '@nuxt/kit'
import { defu } from 'defu'

export interface ModuleOptions {
  paypal: {
    clientId: string
  },
  colors: {
    primary: string,
    secondary: string,
    accent: string
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'simple-donation',
    configKey: 'simpleDonation',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    paypal: {
      clientId: ''
    },
    colors: {
      primary: '#3B82F6',   // Default blue color
      secondary: '#1E40AF', // Darker blue
      accent: '#60A5FA'     // Lighter blue
    }
  },
  setup(moduleOptions, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Merge default options with user-provided options and runtime config
    const options = defu(
      nuxt.options.runtimeConfig.public.simpleDonation,
      moduleOptions
    )

    // Validate PayPal Client ID
    if (!options.paypal.clientId) {
      logger.warn(
        'PayPal Client ID is not set. Please provide it in your nuxt.config or .env file under `public.simpleDonation.paypal.clientId`'
      )
    }

    // Expose options to public runtime config
    nuxt.options.runtimeConfig.public.simpleDonation = options

    // Add SimpleDonation component globally
    try {
      addComponent({
        name: 'SimpleDonation',
        filePath: resolve('./runtime/components/simpleDonation.vue')
      })
      logger.success('SimpleDonation component registered successfully.')
    } catch (error) {
      logger.error('Failed to register SimpleDonation component:', error)
      throw new Error('SimpleDonation component registration failed.')
    }

    // Add composables directory to auto-imports
    try {
      nuxt.hook('imports:dirs', (dirs) => {
        dirs.push(resolve('./runtime/composables'))
      })
      logger.success('Composables directory added to auto-imports.')
    } catch (error) {
      logger.error('Failed to add composables directory:', error)
      throw new Error('Composables directory registration failed.')
    }

    // Add Tailwind configuration
    nuxt.hook('tailwindcss:config', (tailwindConfig) => {
      tailwindConfig.theme.extend.colors = {
        ...tailwindConfig.theme.extend.colors,
        primary: options.colors.primary,
        secondary: options.colors.secondary,
        accent: options.colors.accent
      }
    })

    // Debugging: Log the final options if in development mode
    if (nuxt.options.dev) {
      logger.info('SimpleDonation module options:', options)
    }
  }
})