/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./public/index.html', './src/**/!(tailwind).{ts,tsx}'],
  theme: {
    fontFamily: {
      primary: ['"Space Grotesk"', 'sans-serif'],
    },
    extend: {
      borderWidth: {
        1: '1px',
      },
      maxHeight: {
        508: '508px',
        85: '21.25rem',
      },
      maxWidth: {
        400: '400px',
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
        3: '14px',
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
        'blue-900': '#0d0030',
        'blue-800': '#1a0259',
        'blue-700': '#3a00d6',
        'blue-600': '#4b61d5',
        'blue-500': '#15a1fc',
        'blue-400': '#bff5fa',

        orange: '#f1962e',
        yellow: '#fed823',
        pink: '#ff7bed',
        green: '#01feb6',
        white: '#efecd6',

        pink50: 'rgba(255, 123, 237, 0.5)',
        yellow50: 'rgba(254, 216, 35, 0.4)',
        blue50: 'rgba(21, 161, 252, 0.5)',
        white50: 'rgba(239, 236, 214, 0.4)',
        green50: 'rgba(1, 254, 182, 0.4)',
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
        2.75: '11px',
      },
      width: {
        card: '398px',
        'thin-card': '187px',
        'thin-mobile': '172px',
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
        yellow: '0px 0px 10px #fed823',
        pink: '0px 0px 10px #ff7bed',
        green: '0px 0px 10px #01fed6',
        white: '0px 0px 10px #efecd6',
      },
      padding: {
        3.875: '15.5px',
      },
      margin: {
        '-5': '-1.25rem',
        1.875: '7.5px',
        2.125: '8.5px',
      },
    },
  },
}
