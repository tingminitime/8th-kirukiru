const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    'index.html',
    './src/**/*.{js,jsx,ts,tsx,vue,html}'
  ],
  theme: {
    extend: {
      colors: {
        myBrown: '#553529',
        myYellow: '#FFB11B',
        myGray: '#EDEDEB',
      },
      backgroundImage: {
        'navbar-logo': "url('../assets/images/Logo-Simple-white.svg')"
      },
      fontFamily: {
        'sans': ['Noto Sans TC', ...defaultTheme.fontFamily.sans],
        'mono': [...defaultTheme.fontFamily.mono, 'Noto Sans TC']
      },
    },
  },
  plugins: [],
}
