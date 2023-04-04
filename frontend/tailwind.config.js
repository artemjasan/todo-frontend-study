/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  content: [],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      const customComponents = {
        '.base-component': {
          '@apply text-sm text-black dark:text-white bg-gray-400 dark:bg-gray-800': {},
        },
        '.base-button': {
          '@apply text-sm focus:outline-none': {},
        },
        '.base-button:focus': {
          '@apply ring-4': {},
        },
      };
      addComponents(customComponents);
    },
  ],
};
