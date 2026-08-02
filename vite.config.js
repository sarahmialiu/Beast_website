const fs = require('fs')
const path = require('path')
const { defineConfig } = require('vite')
const tailwindcss = require('@tailwindcss/vite').default

const rootDir = __dirname
const htmlEntries = fs.readdirSync(rootDir)
  .filter((file) => file.endsWith('.html'))
  .filter((file) => file !== 'index.html')
  .reduce((entries, file) => {
    const name = path.basename(file, '.html')
    entries[name] = path.resolve(rootDir, file)
    return entries
  }, {})

module.exports = defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(rootDir, 'index.html'),
        ...htmlEntries,
      },
    },
  },
})