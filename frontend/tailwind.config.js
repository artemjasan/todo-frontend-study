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
        // Base Components
        '.base-component': {
          '@apply text-sm text-black dark:text-white bg-gray-400 dark:bg-gray-800': {},
        },
        // Base Button Components and some custom styles
        '.base-button': {
          '@apply text-sm text-black dark:text-white bg-gray-300 dark:bg-gray-500': {},
        },
        '.base-button:hover': {
          '@apply ring-4': {},
        },
        // Default Button
        '.base-deafult-button': {
          '@apply base-button hover:ring-blue-400': {},
        },
        // Warning Buttonx
        '.base-warning-button': {
          '@apply base-button hover:ring-yellow-400': {},
        },
        // Danger Button
        '.base-danger-button': {
          '@apply base-button hover:ring-red-400': {},
        },
      };
      addComponents(customComponents);
    },
  ],
};
