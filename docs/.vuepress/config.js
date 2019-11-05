module.exports = {
  themeConfig: {
    nav: [
      { text: 'Hucssley', link: '/' },
      { text: 'Installation', link: '/installation/' },
      { text: 'Modules', link: '/modules/' },
      { text: 'Scales', link: '/scales/' },
      { text: 'Configuration', link: '/configuration/' },
      {
        text: 'Guides',
        ariaLabel: 'Guides Menu',
        items: [
          { text: 'Creating custom classes', link: '/creating-custom-classes/' },
          { text: 'Creating components', link: '/creating-components/' },
          { text: 'Increasing specificity', link: '/increasing-specificity/' },
          { text: 'Controlling file size', link: '/controlling-file-size/' },
        ]
      }
    ]
  }
}