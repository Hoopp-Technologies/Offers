/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'hsl(13, 88%, 53%)',
          'primary-hover': 'hsl(13, 88%, 48%)',
        },
        custom: {
          background: 'hsl(0, 0%, 98%)',
          foreground: 'hsl(0, 0%, 0%)',
          muted: 'hsl(0, 0%, 50%)',
          border: 'hsl(210, 17%, 91%)',
          'border-light': 'hsl(225, 20%, 93%)',
        }
      },
      fontFamily: {
        primary: ['Plus Jakarta Sans', 'sans-serif']
      },
      fontSize: {
        'xs-custom': '12px',
        'sm-custom': '14px',
      },
      borderRadius: {
        'xs-custom': '5px',
        'sm-custom': '6px',
        'md-custom': '10px',
      }
    }
  },
  plugins: [],
}