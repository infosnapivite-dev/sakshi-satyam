/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mockup': '768px',
      },
      width: {
        'iphone': '393px',
      },
      height: {
        'iphone': '852px',
      },
      borderRadius: {
        'iphone': '54px',
        'screen': '46px',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        wolmer: ['"Wolmer"', '"Cormorant Garamond"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

