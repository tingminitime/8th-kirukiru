const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue,html}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      
      colors: {
        myBrown: '#553529',
        myYellow: '#FFB11B',
        myGray: '#EDEDEB',
        myLightBrown: '#DEDEDE',
      },
      height: {
        'nav': '72px'
      },
      backgroundImage: {
        'navbar-logo': "url('../assets/images/Logo-Simple-white.svg')",
        'menu-toggle': "url('@img/icon-menu-toggle.svg')",
        'button-publish': "url('@img/editor-publish-button.svg')",
        'upload-cover': "url('@img/upload-cover.svg')",
        'upload-image': "url('@img/upload-image.png')",
      },
      fontFamily: {
        'sans': ['Noto Sans TC', 'Helvetica Neue', ...defaultTheme.fontFamily.sans],
        'mono': [...defaultTheme.fontFamily.mono, 'Noto Sans TC']
      },
      boxShadow: {
        "nprogress": "0 0 8px #29d, 0 0 8px #29d"
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/aspect-ratio')
  ],
}
