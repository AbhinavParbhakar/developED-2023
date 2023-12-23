import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-small-screen': "url('/hero_banner_lg.png')"
      },
      keyframes: {
        fade_in: {
          '0%': {
            opacity: '0'
          },
          '25%': { opacity: '0.25' },
          '50%': { opacity: '0.5' },
          '75%': { opacity: '0.75' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        'fade-primary': 'fade_in 2s',
        'fade-secondary': 'fade_in 4s'
      }
    },
  },
  plugins: [require("daisyui")],
}
export default config
