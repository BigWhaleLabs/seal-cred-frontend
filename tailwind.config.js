/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./public/index.html', './src/**/!(tailwind).{ts,tsx}'],
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar-hide'),
  ],
  theme: {
    fontFamily: {
      primary: ['"Space Grotesk"', 'sans-serif'],
    },
    extend: {
      maxHeight: {
        card: '31.75rem',
        'badges-list': '21.25rem',
      },
      maxWidth: {
        100: '6.25rem',
      },
      keyframes: {
        'pulse-horizontal': {
          '0%, 100%': { transform: 'translateX(0.5rem)' },
          '50%': { transform: 'translateX(0rem)' },
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
        orb: '#ffffff',
        accent: '#fed823',
        primary: '#15a1fc',
        secondary: '#ff7bed',
        tertiary: '#01feb6',
        'formal-accent': '#efecd6',

        'primary-dark': '#0d0030',
        'primary-light': '#bff5fa',
        'primary-dimmed': '#3a00d6',
        'primary-semi-dimmed': '#4b61d5',
        'primary-background': '#1a0259',

        'accent-semi-transparent': 'rgba(254, 216, 35, 0.4)',
        'primary-semi-transparent': 'rgba(21, 161, 252, 0.5)',
        'secondary-semi-transparent': 'rgba(255, 123, 237, 0.5)',
        'tertiary-semi-transparent': 'rgba(1, 254, 182, 0.4)',
        'formal-accent-semi-transparent': 'rgba(239, 236, 214, 0.4)',
      },
      boxShadow: {
        '2xl': '0rem 0.25rem 2.75rem 0rem rgb(0 0 0 / 0.25)',
        lg: '0rem 0rem 1rem 0rem rgb(0 0 0 / 0.25)',
        md: '0rem 0rem 0.375rem 0rem rgb(0 0 0 / 0.25)',
        button: '0rem 0rem 1.625rem rgb(0 0 0 / 1)',
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
      inset: {
        '-28': '-7rem',
        '-24': '-6rem',
        '-28': '-7rem',
        '-4': '-1rem',
      },
      space: {
        '-4': '-1rem',
      },
      dropShadow: {
        accent: '0rem 0rem 0.625rem #fed823',
        secondary: '0rem 0rem 0.625rem #ff7bed',
        tertiary: '0rem 0rem 0.625rem #01fed6',
        primary: '0rem 0rem 1.313rem #0A84FF',
        'formal-accent': '0rem 0rem 0.625rem #efecd6',
      },
      padding: {
        small: '0.969rem',
        25: '6.25rem',
      },
      margin: {
        '-5': '-1.25rem',
        '-6': '-0.375rem',
        7.5: '0.469rem',
        8.5: '0.531rem',
        '-10': '-0.625rem',
      },
      backgroundImage: {
        noise: 'url("/img/noise50.png")',
      },
    },
  },
}
