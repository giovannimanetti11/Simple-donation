import { defineNuxtModule, addComponent, createResolver } from '@nuxt/kit'
import { defu } from 'defu'
import fs from 'fs'
import path from 'path'

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
      nuxt: '^3.0.0'
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

    // Add Tailwind configuration
    nuxt.hook('tailwindcss:config', (tailwindConfig) => {
      tailwindConfig.theme.extend.colors = {
        ...tailwindConfig.theme.extend.colors,
        simpleDonation: moduleOptions.colors
      }
    })

    // Generate CSS variables
    const cssVariables = `
:root {
  --simple-donation-primary: ${moduleOptions.colors.primary};
  --simple-donation-secondary: ${moduleOptions.colors.secondary};
  --simple-donation-accent: ${moduleOptions.colors.accent};
  --simple-donation-background: ${moduleOptions.colors.background};
}
`

    // Path to the CSS file
    const cssFilePath = resolve('./runtime/styles/style.css')

    // Read existing CSS file
    let existingCSS = ''
    if (fs.existsSync(cssFilePath)) {
      existingCSS = fs.readFileSync(cssFilePath, 'utf-8')
    }

    // Replace or append CSS variables
    const cssVariablesRegex = /:root\s*{[\s\S]*?}/
    if (cssVariablesRegex.test(existingCSS)) {
      existingCSS = existingCSS.replace(cssVariablesRegex, cssVariables.trim())
    } else {
      existingCSS = cssVariables + existingCSS
    }

    // Write updated CSS back to file
    fs.writeFileSync(cssFilePath, existingCSS)

    // Add the styles to Nuxt
    nuxt.options.css.push(cssFilePath)

    console.log('SimpleDonation module: CSS variables updated successfully.')
  }
})