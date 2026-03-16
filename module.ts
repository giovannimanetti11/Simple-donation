import { defineNuxtModule, addComponent, createResolver } from '@nuxt/kit'
import { defu } from 'defu'

export interface ModuleOptions {
  paypal: {
    clientId: string
  },
  colors: {
    primary: string,
    secondary: string,
    accent: string,
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
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#60A5FA',
      background: '#FFFFFF'
    }
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Merge user options with defaults
    const moduleOptions = defu(nuxt.options.simpleDonation, options)

    // Expose options to runtime
    nuxt.options.runtimeConfig.public.simpleDonation = moduleOptions

    // Add component
    addComponent({
      name: 'SimpleDonation',
      filePath: resolve('./runtime/components/simpleDonation.vue')
    })

    // Add Tailwind configuration if @nuxtjs/tailwindcss is installed
    nuxt.hook('tailwindcss:config', (tailwindConfig) => {
      if (tailwindConfig.theme && tailwindConfig.theme.extend) {
        tailwindConfig.theme.extend.colors = {
          ...tailwindConfig.theme.extend.colors,
          simpleDonation: moduleOptions.colors
        }
      }
    })

    // Add the CSS file to Nuxt
    const cssFilePath = resolve('./runtime/styles/style.css')
    nuxt.options.css.push(cssFilePath)
  }
})