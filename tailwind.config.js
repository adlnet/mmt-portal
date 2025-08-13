/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/flowbite-react/lib/esm/**/*.js',
    "./node_modules/flowbite/**/*.js",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        'dark-blue': '#010E42',
        'purple': '#562990',
        'blue-custom':'#135F9B',
        'gray-custom': '#6B7280',
        'black-10': 'rgba(17, 24, 39, .1)',
        'red': '#902929',
        'light-purple': '#F4F1FA',
        'brown': '#90472B',
        'peach': '#FEECDC',
        'indigo': '#4A4B8E',
        'indigo-base':'#C5C5E3',
        'accent-yellow-minimal':'#F9F9ED',
        'accent-yellow-light':'#F2E8A7',
        'gray-primary': '#343C48',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}