// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/devtools'],
  ssr: true,
  app: {
    head: {
      title: "Lomba",
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { charset: "utf-8" },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: "format-detection", content: "telephone=no" },
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js' },
      ],
      link: [
        {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'},
        
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
        }
      ],
    }
    
  },
  css: [
    // "bootstrap/dist/css/bootstrap.css",
    "assets/css/main.css",
  ],
  routeRules: {
    "/api/**": {
      proxy: { to: `${process.env.API_NOCTURNAILED}/api/**` },
    },
  },
  runtimeConfig: {
    public: {
      apinocturnailed: process.env.API_NOCTURNAILED,
    },
  },
});