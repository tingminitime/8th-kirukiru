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
      },
      backgroundImage: {
        'navbar-logo': "url('../assets/images/Logo-Simple-white.svg')",
        'menu-toggle': "url('@img/icon-menu-toggle.svg')",
      },
      fontFamily: {
        'sans': ['Noto Sans TC', ...defaultTheme.fontFamily.sans],
        'mono': [...defaultTheme.fontFamily.mono, 'Noto Sans TC']
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('flowbite/plugin'),
  ],
}
