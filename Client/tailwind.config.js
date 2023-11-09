/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "white": "#FFFFFF", 
        "white-purple": "#FDFBFF",
        "electric-blue": "#4200FF",
        "white-gray": "#E8E8E8",
        "dark": "rgba(3, 8, 34, 1)",
        "dark-med": "rgba(3, 8, 34, 0.7)",
        "dark-purple-md": "rgba(53, 25, 134, 0.6)",
        "gray": "#CBCBCB",
        "red-warning": "#D0342C",
        "blue-bright": "#3D68FE",
        "yellow-gold": "#efa32a",
        "purple": "#8C52FF",
        "orange": "#FF5100"
      },
      gridTemplateColumns: {
        'kanban': 'repeat(4, 238px)',
        'custom': 'repeat($customValue, minmax(238px, 1fr))',
        
      },
      backgroundImage: {
        'hero': "linear-gradient(to bottom, rgba(255, 255, 255, 0.95) 90%, rgba(255, 255, 255, 1)), url('/src/assets/heroBg.webp')"
      },
      boxShadow: {
        "md2": "0 0 8px"
      },
      fontFamily: {
        sans: ['Heebo', 'Arial', 'sans-serif'],
        heading: ['Righteous', 'Georgia', 'serif'], // Use your preferred font for headers here
      },
      animation: {
        'expand-right': 'expand .3s ease-in 0s 1 forwards',
        'expand-bottom': 'expandToBottom .3s ease-in 0s 1 forwards',

      },
      keyframes: {
        'expand': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'expandToBottom': {
          '0%': { height: '0px', opacity: 0 },
          '100%': { height: '100px', opacity: 1 },
        },
        shimmer: {
          "100%": {
            "transform": "translateX(100%)"
          }
        },
      },
     
    },
  },
  plugins: [],
}

