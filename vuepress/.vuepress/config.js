module.exports = {
  title: "vue-bootstrap",
  description: "Bootstrap components in Vue.js",
  base: '/',
  dest: 'docs',
  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://stackpath.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css'
      }
    ]
  ],
  themeConfig: {
    displayAllHeaders: true,
    activeHeaderLinks: false,
    searchPlaceholder: 'Press / to search',
    lastUpdated: false, // string | boolean
    sidebarDepth: 0,
    repo: 'tectonic/vue-bootstrap',
    nav: [
      { text: 'Home', link: '/', target: '_self' },
    ],
    sidebar: {
      '/': require('./sidebar')
    },
  },
};
