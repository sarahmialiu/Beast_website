const fs = require('fs')
const path = require('path')
const { defineConfig } = require('vite')
const tailwindcss = require('@tailwindcss/vite').default

const publicDir = path.resolve(__dirname, 'public')
const htmlEntries = fs.readdirSync(publicDir)
  .filter((file) => file.endsWith('.html'))
  .reduce((entries, file) => {
    const name = path.basename(file, '.html')
    entries[name] = path.resolve(publicDir, file)
    return entries
  }, {})

module.exports = defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        ...htmlEntries,
      },
    },
  },
})