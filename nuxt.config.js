export default {
  head: {
    titleTemplate: 'Fam Properties | %s',
    meta: [
      { property: 'og:image', content: 'https://famproperties.com/assets/famproperties/images/logo/fam-logo-grey.png' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:site', content: '@nuxt_js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicons.ico' },
      { rel: 'dns-prefetch', href: 'https://fam-erp.com' },
      { rel: 'preconnect', href: 'https://fam-erp.com' }
    ]
  },

  loading: {
    color: '#e9222f'
  },

  manifest: {
    name: 'Fam Properties',
    short_name: 'Fam Properties',
    description: 'Fam Properties Mobile Application',
    theme_color: '#2F495E',
    start_url: '/'
  },

  devModules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    "@nuxtjs/google-gtag",
  ],

  axios: {
    // baseURL: 'https://api.hackerwebapp.com'
    baseURL: 'https://fam-erp.com'
  },

  plugins: [
    //{ src: '~/plugins/filters', ssr: true },
    //{ src: '~/plugins/plugins.js', ssr: false },
    { src: "~/plugins/tracking.js", ssr: false }
  ],
  // some third party css
  css: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'nuxt-onsenui-module'
  ],
  "google-gtag": {
    id: "UA-96163372-1", // required
    debug: true, // enable to track in dev mode
    // optional you can add more configuration like [AdWords](https://developers.google.com/adwords-remarketing-tag/#configuring_the_global_site_tag_for_multiple_accounts)
    additionalAccounts: [
      {
        id: "AW-1011239912" // required if you are adding additional accounts
      }
    ]
  },
  render: {
    http2: {
      push: true
    },
    static: {
      maxAge: '1y',
      setHeaders(res, path) {
        if (path.includes('sw.js')) {
          res.setHeader('Cache-Control', `public, max-age=${15 * 60}`)
        }
      }
    }
  }
}
