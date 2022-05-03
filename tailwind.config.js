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
      },
      dropShadow: {
        pink: '0px 4px 44px rgba(255, 123, 237, 0.5)',
        yellow: '0px 4px 44px rgba(254, 216, 35, 0.4)',
        blue: '0px 4px 44px rgba(21, 161, 252, 0.5)',
        white: '0px 4px 44px rgba(239, 236, 214, 0.3)',
        green: '0px 4px 44px rgba(1, 254, 182, 0.4)',
      },
    },
  },
}
