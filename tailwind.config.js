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
        'blue-100': 'var(--blue-100)',
        'blue-200': 'var(--blue-200)',
        'blue-300': 'var(--blue-300)',
        'blue-400': 'var(--blue-400)',
        'blue-500': 'var(--blue-500)',
        'blue-600': 'var(--blue-600)',

        'accent-orange': 'var(--accent-orange)',
        'accent-yellow': 'var(--accent-yellow)',
        'accent-pink': 'var(--accent-pink)',
        'accent-green': 'var(--accent-green)',
        'accent-white': 'var(--accent-white)',
      },
      dropShadow: {
        pink: 'var(--shadow-indent) var(--shadow-pink)',
        yellow: 'var(--shadow-indent) var(--shadow-yellow)',
        blue: 'var(--shadow-indent) var(--shadow-blue)',
        white: 'var(--shadow-indent) var(--shadow-white)',
        green: 'var(--shadow-indent) var(--shadow-green)',
      },
    },
  },
}
