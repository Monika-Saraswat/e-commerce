// tailwind.config.js
module.exports = {
  content: [
    './views/**/*.ejs', // Adjust the path based on where your EJS files are located
    './public/**/*.html', // If you have HTML files in the public directory
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
