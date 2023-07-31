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
        "red-warning": "#D00000",
        "blue-bright": "#1731c4",
        "yellow-gold": "#efa32a",
      },
      gridTemplateColumns: {
        'kanban': 'repeat(4, 238px)',
        'custom': 'repeat($customValue, minmax(238px, 1fr))',
        
      },
      boxShadow: {
        "md2": "0 0 8px"
      },
      fontFamily: {
        sans: ['Heebo', 'Arial', 'sans-serif'],
        heading: ['Righteous', 'Georgia', 'serif'], // Use your preferred font for headers here
      },
    },
  },
  plugins: [],
}

