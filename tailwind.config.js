/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
let plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./public/index.html', './src/**/!(tailwind).{ts,tsx}'],
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addVariant }) {
      addVariant('each-new-row-in-3-cols', '&:nth-child(3n - 2)'),
        addVariant('pre-last', '&:nth-last-child(2)'),
        addVariant('each-2nd-element-in-3-cols', '&:nth-child(3n + 2)')
    }),
  ],
  theme: {
    fontFamily: {
      primary: ['"Space Grotesk"', 'sans-serif'],
    },
    extend: {
      letterSpacing: {
        arc: '1rem',
      },
      minHeight: {
        card: '31.75rem',
      },
      maxHeight: {
        'badges-list': '21.25rem',
        card: '31.75rem',
        'mobile-card': '41rem',
        'app-card': '70vh',
      },
      maxWidth: {
        100: '6.25rem',
        'app-card': '42.125rem',
      },
      keyframes: {
        'pulse-horizontal': {
          '0%, 100%': { transform: 'translateX(0.5rem)' },
          '50%': { transform: 'translateX(0rem)' },
        },
      },
      fontSize: {
        sm: '0.876rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      lineHeight: {
        3: '0.875rem',
        5: '1.125rem',
        6: '1.313rem',
        7: '1.438rem',
        8: '1.938rem',
        11: '3.188rem',
      },
      screens: {
        xxs: '17.5rem',
        xs: '22.5rem',
        sm: '28.125rem',
        md: '37.5rem',
        tablet: '55.4rem',
        smToXl: { min: '28.125rem', max: '80rem' },
      },
      borderWidth: {
        24: '1.5rem',
      },
      animation: {
        'pulse-horizontal': 'pulse-horizontal 2s ease-in-out infinite',
      },
      colors: {
        orb: 'var(--orb)',
        accent: 'var(--accent)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        'formal-accent': 'var(--formal-accent)',

        error: 'var(--error)',
        'error-dark': 'var(--error-dark)',

        'primary-dark': 'var(--primary-dark)',
        'primary-light': 'var(--primary-light)',
        'primary-dimmed': 'var(--primary-dimmed)',
        'primary-semi-dimmed': 'var(--primary-semi-dimmed)',
        'primary-background': 'var(--primary-background)',
        'primary-dark-red': 'var(--primary-dark-red)',

        'accent-light-transparent': 'var(--accent-light-transparent)',
        'accent-light-active-transparent':
          'var(--accent-light-active-transparent)',
        'secondary-light-transparent': 'var(--secondary-light-transparent)',
        'secondary-light-active-transparent':
          'var(--secondary-light-active-transparent)',

        'accent-semi-transparent': 'var(--accent-semi-transparent)',
        'primary-semi-transparent': 'var(--primary-semi-transparent)',
        'secondary-semi-transparent': 'var(--secondary-semi-transparent)',
        'tertiary-semi-transparent': 'var(--tertiary-semi-transparent)',
        'formal-accent-semi-transparent':
          'var(--formal-accent-semi-transparent)',
        'error-semi-transparent': 'var(--error-semi-transparent)',
      },
      boxShadow: {
        '2xl': '0rem 0.25rem 2.75rem 0rem rgb(0 0 0 / 0.25)',
        lg: '0rem 0rem 1rem 0rem rgb(0 0 0 / 0.25)',
        md: '0rem 0rem 0.375rem 0rem rgb(0 0 0 / 0.25)',
        button: '0rem 0rem 1.625rem rgb(0 0 0 / 1)',
        'button-active': '0rem 0rem 0.375rem rgb(0 0 0 / 1)',
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
        'full-125': '125%',
        'full-105': '105%',
        'screen-90': '90vw',
        'screen-80': '80vw',
        'screen-45': '45vw',
      },
      inset: {
        '-78': '-19.5rem',
        '-40': '-10rem',
        '-32': '-8rem',
        '-28': '-7rem',
        '-24': '-6rem',
        '-4': '-1rem',
        '-2.5': '-0.65rem',
        '-2': '-2px',
        '-1': '-1px',
      },
      rotate: {
        '-90': '-90deg',
      },
      dropShadow: {
        accent: '0rem 0rem 0.625rem var(--accent)',
        secondary: '0rem 0rem 0.625rem var(--secondary)',
        tertiary: '0rem 0rem 0.625rem var(--tertiary)',
        primary: '0rem 0rem 1.313rem var(--primary)',
        'formal-accent': '0rem 0rem 0.625rem var(--formal-accent)',
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
        '-12': '-3rem',
      },
      translate: {
        '-5.5': '-0.35rem',
        '-7': '-0.45rem',
      },
      backgroundImage: {
        noise: 'url("/img/noise50.png")',
      },
    },
  },
}
