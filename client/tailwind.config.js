/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
      colors: {
        'custom-bg': '#000000',
        'custom-bg2' : '#FDFEFE',
        'jet': 'hsl(0, 0%, 20%)',
        'white': 'hsl(0, 0%, 100%)',
        'black': 'hsl(0, 0%, 0%)',
        'onyx-1': 'hsl(0, 0%, 24%)',
        'onyx-2': 'hsl(0, 0%, 25%)',
        'gray-web': 'hsl(0, 0%, 48%)',
        'light-gray': 'hsl(0, 0%, 80%)',
        'davys-gray': 'hsl(0, 0%, 33%)',
        'field-drab': '#46CDD0',
        'red-crayola': 'hsl(356, 73%, 58%)',
        'golden-puppy': '#46CDD0',
        'quick-silver': 'hsl(0, 0%, 63%)',
        'sonic-silver': 'hsl(0, 0%, 44%)',
        'eerie-black-1': 'hsl(0, 0%, 15%)',
        'eerie-black-2': 'hsl(0, 0%, 7%)',
        'rich-black-fogra-39': 'hsl(0, 0%, 2%)',
      }

    },
  },
  variants: {
    extend: {
      width: ['responsive'],
    }
  },
  plugins: [],
}

