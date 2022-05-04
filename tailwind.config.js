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
      keyframes: {
        'pulse-horizontal': {
          '0%, 100%': { transform: 'translateX(8px)' },
          '50%': { transform: 'translateX(0px)' },
        },
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

        'pink-100': '#FF7BED',
        'yellow-100': '#FED823',
        'blue-200': '#1A0259',

        orange: '#f1962e',
        yellow: '#fed823',
        pink: '#ff7bed',
        green: '#01feb6',
        white: '#efecd6',

        pink50: 'rgba(255, 123, 237, 0.5)',
        yellow50: 'rgba(254, 216, 35, 0.4)',
        blue50: 'rgba(21, 161, 252, 0.5)',
        white50: 'rgba(239, 236, 214, 0.3)',
        green50: 'rgba(1, 254, 182, 0.4)',
      },
      boxShadow: {
        '2xl': '0px 4px 44px 0px rgb(0 0 0 / 0.25)',
        lg: '0px 0px 16px 0px rgb(0 0 0 / 0.25)',
        md: '0px 0px 6px 0px rgb(0 0 0 / 0.25)',
      },
      height: {
        card: '508px',
        'mobile-proofing-card': '276px',
        'mobile-badging-card': '365px',
      },
      width: {
        card: '398px',
        'mobile-card': '343px',
      },
    },
  },
}
