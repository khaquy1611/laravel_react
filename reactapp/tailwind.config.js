/** @type {import('tailwindcss').Config} */
export const darkMode = ['class']
export const content = [
  './pages/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './app/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}',
]
export const prefix = ''
export const theme = {
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px',
    },
  },
  extend: {
    colors: {
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
      'menu-border': 'rgba(255, 255, 255, 0.1)',
      'menu-color': '#a3aed1',
      'menu-active': 'rgba(255, 255, 255, .05)',
      'primary-bg': '#0088FF',
      'second-rgb': 'rgba(35,183,229,1)',
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
    keyframes: {
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
      'spin-slow': 'spin-slow 1s linear infinite',
    },
    fontSize: {
      '10px': '10px',
      '11px': '11px',
      '12px': '12px',
      '13px': '13px',
      '14px': '14px',
      '15px': '15px',
      '16px': '16px',
      '30px': '30px',
    },
    padding: {
      '15px': '15px',
    },
    width: {
      '32px': '32x',
    },
    spacing: {
      '1px': '1px',
      '2px': '2px',
      '3px': '3px',
      '4px': '4px',
      '5px': '5px',
      '6px': '6px',
      '7px': '7px',
      '8px': '8px',
      '9px': '9px',
      '10px': '10px',
      '15px': '15px',
      '20px': '20px',
    },
    translate: {
      '-100%': '-100%',
    },
  },
}
// eslint-disable-next-line no-undef
export const plugins = [require('tailwindcss-animate')]
