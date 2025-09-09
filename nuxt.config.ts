export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxt/image', '@pinia/nuxt', '@nuxtjs/tailwindcss', '@vite-pwa/nuxt', '@nuxtjs/sitemap', 'nuxt-gtag'],
  gtag: {
    id: 'G-5W7JHS4GLB', // Replace with your Google Analytics 4 Measurement ID
  },
  plugins: ['~/plugins/fontawesome.ts'],
  css: ['~/assets/css/tailwind.css'],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Paule Sabawa - පවුලේ සභාව',
      short_name: 'පවුලේ සභාව',
      description: 'පවුලේ සභාව',
      theme_color: '#2563EB',
      background_color: 'transparent',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    client: {
      installPrompt: true, // Enable custom install prompt
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
})