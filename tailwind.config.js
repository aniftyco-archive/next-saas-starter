const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(({ addComponents }) => {
      const components = {
        '#__next': {
          display: 'flex',
          minHeight: '100vh',
          'flex-direction': 'column',
        },
      };
      addComponents(components);
    }),
  ],
};
