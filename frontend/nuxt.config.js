export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "spa",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    "@nuxtjs/tailwindcss",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "@nuxtjs/dotenv",
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
  },
  auth: {
    autoLogout: true,
    autoRefresh: {
      enable: true,
    },
    cookie: {
      options: {
        maxAge: 7000,
      },
    },
    redirect: {
      login: "/auth/login",
      logout: "/",
    },
    strategies: {
      local: {
        _scheme: "refresh",
        token: {
          maxAge: 30,
          property: "data.token",
        },
        refreshToken: {
          maxAge: 7200,
          property: "data.token",
        },
        user: "data",
        endpoints: {
          login: {
            url: "/api/auth/login",
            method: "post",
          },
          register: {
            url: "/api/auth/register",
            method: "post",
          },
          logout: {
            url: "/api/auth/logout",
            method: "get",
          },
          user: {
            url: "/api/user",
            method: "get",
          },
        },
      },
    },
  },
  proxy: {
    "/api": {
      target: `${process.env.API_BASE_URL}/api`,
      pathRewrite: {
        "^/api": "",
      },
      secure: false,
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        })
      }
    },
  },
}
