const { defineConfig } = require('vite')
const tailwindcss = require('@tailwindcss/vite').default
const path = require('path')

module.exports = defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        academicsFirstYear: path.resolve(__dirname, 'academics_firstyear.html'),
        academicsCourses: path.resolve(__dirname, 'academics_courses.html'),
        academicsTeaching: path.resolve(__dirname, 'academics_teaching.html'),
        quals: path.resolve(__dirname, 'quals.html'),
        dissertation: path.resolve(__dirname, 'dissertation.html'),
        faqs: path.resolve(__dirname, 'faqs.html'),
        directory: path.resolve(__dirname, 'directory.html'),
        forms: path.resolve(__dirname, 'forms.html'),
        movingToCa: path.resolve(__dirname, 'movingtoca.html'),
        // add every other .html file in your project here
      },
    },
  },
})