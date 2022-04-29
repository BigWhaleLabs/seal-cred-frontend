/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./public/index.html', './src/**/!(tailwind).{ts,tsx}'],
  theme: {
    fontFamily: {
      secondary: 'DM Sans',
      primary: 'Poppins',
    },
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-dimmed': 'var(--primary-text-dimmed)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        'accent-light': 'var(--accent-light)',
        'accent-dimmed': 'var(--accent-dimmed)',
        background: 'var(--background)',
        'semi-background': 'var(--semi-background)',
        border: 'var(--border)',
        error: 'var(--error)',
        'error-light': 'var(--error-light)',
        success: 'var(--success)',
        'private-key': 'var(--private-key)',
      },
      fontWeight: {
        normal: 'var(--font-medium)',
      },
      borderRadius: {
        avatar: '6rem',
        DEFAULT: '1rem',
        block: '1.5rem',
      },
      boxShadow: {
        DEFAULT: '0px 64px 64px -48px var(--shadow)',
      },
      width: {
        chart: '108px',
        time: '95px',
        glass: '107px',
      },
    },
  },
}
