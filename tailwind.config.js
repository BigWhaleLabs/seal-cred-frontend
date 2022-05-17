/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./public/index.html', './src/**/!(tailwind).{ts,tsx}'],
  theme: {
    fontFamily: {
      primary: ['"Space Grotesk"', 'sans-serif'],
    },
    extend: {
      maxHeight: {
        card: '508px',
        'badges-list': '21.25rem',
      },
      keyframes: {
        'pulse-horizontal': {
          '0%, 100%': { transform: 'translateX(8px)' },
          '50%': { transform: 'translateX(0px)' },
        },
      },
      fontSize: {
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      lineHeight: {
        5: '18px',
        6: '21px',
        8: '31px',
        11: '51px',
      },
      screens: {
        fold: '280px',
        tiny: '360px',
        sm: '450px',
        md: '600px',
      },
      animation: {
        'pulse-horizontal': 'pulse-horizontal 2s ease-in-out infinite',
      },
      colors: {
        accent: '#fed823',
        primary: '#15a1fc',
        secondary: '#ff7bed',
        tertiary: '#01feb6',
        white: '#efecd6',

        'primary-dark': '#0d0030',
        'primary-light': '#bff5fa',
        'primary-dimmed': '#3a00d6',
        'primary-semi-dimmed': '#4b61d5',
        'primary-background': '#1a0259',

        'accent-semi-transparent': 'rgba(254, 216, 35, 0.4)',
        'primary-semi-transparent': 'rgba(21, 161, 252, 0.5)',
        'secondary-semi-transparent': 'rgba(255, 123, 237, 0.5)',
        'tertiary-semi-transparent': 'rgba(1, 254, 182, 0.4)',
        'white-semi-transparent': 'rgba(239, 236, 214, 0.4)',
      },
      boxShadow: {
        '2xl': '0px 4px 44px 0px rgb(0 0 0 / 0.25)',
        lg: '0px 0px 16px 0px rgb(0 0 0 / 0.25)',
        md: '0px 0px 6px 0px rgb(0 0 0 / 0.25)',
        button: '0px 0px 26px rgb(0 0 0 / 1)',
      },
      height: {
        card: '508px',
        'mobile-card': '365px',
        'noisy-rectangle': '11px',
      },
      width: {
        card: '398px',
        'thin-card': '187px',
        'thin-mobile': '172px',
        'mobile-card': '92%',
      },
      dropShadow: {
        accent: '0px 0px 10px #fed823',
        secondary: '0px 0px 10px #ff7bed',
        tertiary: '0px 0px 10px #01fed6',
        white: '0px 0px 10px #efecd6',
      },
      padding: {
        small: '15.5px',
      },
      margin: {
        7.5: '7.5px',
        8.5: '8.5px',
      },
      backgroundImage: {
        noise: 'url("/img/noise50.png")',
      },
    },
  },
}
