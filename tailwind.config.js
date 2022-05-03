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
      colors: {
        'blue-900': 'var(--blue-900)',
        'blue-800': 'var(--blue-800)',
        'blue-700': 'var(--blue-700)',
        'blue-600': 'var(--blue-600)',
        'blue-500': 'var(--blue-500)',
        'blue-400': 'var(--blue-400)',

        orange: 'var(--orange)',
        pink: 'var(--pink)',
        yellow: 'var(--yellow)',
        green: 'var(--green)',
        white: 'var(--white)',
      },
      dropShadow: {
        orange: 'var(--shadow-indent) var(--shadow-orange)',
        pink: 'var(--shadow-indent) var(--shadow-pink)',
        yellow: 'var(--shadow-indent) var(--shadow-yellow)',
        blue: 'var(--shadow-indent) var(--shadow-blue)',
        white: 'var(--shadow-indent) var(--shadow-white)',
        green: 'var(--shadow-indent) var(--shadow-green)',
      },
    },
  },
}
