/** @type {import('tailwindcss').Config} */ // JS DOC comment for type hints.
module.exports = {
  // Important. If you want to use styles in other directories.
  // Be sure that you include a pattern here.
  // This property specifies which files or patterns
  // should be processed by Tailwind CSS.
  content: [`./src/pages/*.{js,jsx,ts,tsx}`],
  // Used to extend or customize the default design system.
  theme: {
    extend: {},
  },
  // This property allows you to include third-party plugins that
  // extend the functionality of Tailwind CSS.
  plugins: [],
}
