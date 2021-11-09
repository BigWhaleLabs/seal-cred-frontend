/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  purge: ['./public/index.html', './src/**/!(tailwind).{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-text-dimmed': 'var(--primary-text-dimmed)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        'accent-light': 'var(--accent-light)',
        'accent-dimmed': 'var(--accent-dimmed)',
        background: 'var(--background)',
        transparent: 'var(--transparent)',
        'semi-background': 'var(--semi-background)',
        border: 'var(--border)',
        error: 'var(--error)',
        'error-light': 'var(--error-light)',
        success: 'var(--success)',
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
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
}
