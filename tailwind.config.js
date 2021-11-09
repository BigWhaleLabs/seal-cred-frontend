/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  purge: ['./public/index.html', './src/**/!(tailwind).{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-text-dimmed': 'var(--primary-text-dimmed)',
        secondary: 'var(--secondary)',
        'primary-text-dimmed': 'var(--primary-text-dimmed)',
        accent: 'var(--accent)',
        'accent-light': 'var(--accent-light)',
        'accent-dimmed': 'var(--accent-dimmed)',
        background: 'var(--background)',
        border: 'var(--border)',
        error: 'var(--error)',
        'error-light': 'var(--error-light)',
        success: 'var(--success)',
        black: 'var(--black)',
        white: 'var(--white)',
        dark: 'var(--dark)',
        'semi-dark': 'var(semi-dark)',
        'semi-light': 'var(--semi-light)',
        light: 'var(--light)',
      },
      borderRadius: {
        avatar: '6rem',
        DEFAULT: '1rem',
      },
      width: {
        chart: '108px',
        time: '95px',
        glass: '107px',
      },
      fontWeight: {
        medium: 'var(--font-medium)',
        bold: 'var(--font-bold)',
        normal: 'var(--font-normal)',
      },
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
}
