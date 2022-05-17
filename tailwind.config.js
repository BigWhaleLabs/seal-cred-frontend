/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./public/index.html', './src/**/!(tailwind).{ts,tsx}'],
  theme: {
    fontFamily: {
      primary: ['"Space Grotesk"', 'sans-serif'],
    },
    extend: {
      borderWidth: {
        px: '1px',
      },
      maxHeight: {
        card: '31.75rem',
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
        5: '1.125rem',
        6: '1.313rem',
        8: '1.938rem',
        11: '3.188rem',
      },
      screens: {
        fold: '17.5rem',
        tiny: '22.5rem',
        sm: '28.125rem',
        md: '37.5rem',
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

        'accent-50': 'rgba(254, 216, 35, 0.4)',
        'primary-semi-transparent': 'rgba(21, 161, 252, 0.5)',
        'secondary-50': 'rgba(255, 123, 237, 0.5)',
        'tertiary-50': 'rgba(1, 254, 182, 0.4)',
        'white-50': 'rgba(239, 236, 214, 0.4)',
      },
      boxShadow: {
        '2xl': '0px 0.25rem 2.75rem 0px rgb(0 0 0 / 0.25)',
        lg: '0px 0px 1rem 0px rgb(0 0 0 / 0.25)',
        md: '0px 0px 0.375rem 0px rgb(0 0 0 / 0.25)',
        button: '0px 0px 1.625rem rgb(0 0 0 / 1)',
      },
      height: {
        'noisy-rectangle': '0.688rem',
        'mobile-card': '22.813rem',
        card: '31.75rem',
      },
      width: {
        'thin-mobile': '10.75rem',
        'thin-card': '11.688rem',
        card: '24.875rem',
        'mobile-card': '92%',
      },
      dropShadow: {
        accent: '0px 0px 0.625rem #fed823',
        secondary: '0px 0px 0.625rem #ff7bed',
        tertiary: '0px 0px 0.625rem #01fed6',
        white: '0px 0px 0.625rem #efecd6',
      },
      padding: {
        small: '0.969rem',
      },
      margin: {
        7.5: '0.469rem',
        8.5: '0.531rem',
      },
    },
  },
}
