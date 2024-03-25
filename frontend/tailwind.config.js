/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "default-movie": "url('./src/assets/images/movie_default.png')"
      }
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '868px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1770px',
      // => @media (min-width: 1536px) { ... }
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 }
      },
      wiggle: {
        '0%, 100%': { transform: 'rotate(-6deg)' },
        '50%': { transform: 'rotate(6deg)' },
      }
    },
    animation: {
      fadeIn: "fadeIn 0.1s",
      wiggle: 'wiggle 0.5s ease-in-out infinite',
    }
  },

  plugins: [],
}

