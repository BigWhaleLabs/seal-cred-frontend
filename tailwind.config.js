/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./public/index.html', './src/**/!(tailwind).{ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'var(--font-primary)',
      secondary: 'var(--font-secondary)',
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
        'blue-900': 'var(--blue-900)',
        'blue-800': 'var(--blue-800)',
        'blue-700': 'var(--blue-700)',
        'blue-600': 'var(--blue-600)',
        'blue-500': 'var(--blue-500)',
        'blue-400': 'var(--blue-400)',

        orange: 'var(--orange)',
        yellow: 'var(--yellow)',
        pink: 'var(--pink)',
        green: 'var(--green)',
        white: 'var(--white)',

        pink50: 'var(--shadow-pink)',
        yellow50: 'var(--shadow-yellow)',
        blue50: 'var(--shadow-blue)',
        white50: 'var(--shadow-white)',
        green50: 'var(--shadow-green)',
      },
      boxShadow: {
        '2xl': '0px 4px 44px 0px rgb(0 0 0 / 0.25)',
        lg: '0px 0px 16px 0px rgb(0 0 0 / 0.25)',
        md: '0px 0px 6px 0px rgb(0 0 0 / 0.25)',
      },
    },
  },
}
