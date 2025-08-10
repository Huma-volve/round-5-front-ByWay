import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}',],
  prefix: '',
  theme: {
    extend: {
      colors: {
        background: 'oklch(1 0 0)',
        footer: 'var(--footer-bg)',
        danger: 'var(--danger)',
        rate: 'var(--rate)',
        placeholder: 'var(--placeholder)',
        revenue1Graph: 'var(--revenue1-graph)',
        revenue1Bg: 'var(--revenue1-bg)',
        revenue2Graph: 'var(--revenue2-graph)',
        revenue2Bg: 'var(--revenue2-bg)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        secondaryDark: 'var(--secondary-dark)',
        secondaryBackground: 'var(--secondary-background)',
        border: 'var(--border)',
        borderCard: 'var(--border-card)',
        input: 'var(--input)',
        category: 'var(--category)',
        categoryIcon: 'var(--category-icon)',
        success: 'var(--success)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;