import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			footer: 'var(--footer-bg)',
  			danger: 'var(--danger)',
  			rate: 'var(--rate)',
  			placeholder: 'var(--placeholder)',
  			revenue1Graph: 'var(--revenue1-graph)',
  			revenue1Bg: 'var(--revenue1-bg)',
  			revenue2Graph: 'var(--revenue2-graph)',
  			revenue2Bg: 'var(--revenue2-bg)',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			secondaryDark: 'var(--secondary-dark)',
  			secondaryBackground: 'var(--secondary-background)',
  			border: 'hsl(var(--border))',
  			borderCard: 'var(--border-card)',
  			input: 'hsl(var(--input))',
  			category: 'var(--category)',
  			categoryIcon: 'var(--category-icon)',
  			success: 'var(--success)',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [tailwindcssAnimate, require("tailwindcss-animate")],
} satisfies Config;
