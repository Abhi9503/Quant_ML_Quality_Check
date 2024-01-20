/* @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",       // Include all TypeScript files in the src folder and its subfolders
    "./src/components/**/*.tsx",  // Include all TypeScript files in the components folder and its subfolders
    "./src/pages/**/*.tsx",       // Include all TypeScript files in the pages folder and its subfolders
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  jit: true,
};
