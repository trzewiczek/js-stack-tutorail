import fs from 'fs'

fs.realpath('.babelrc', (err, path) => {
  if (err) {
    console.error(`!!! ${err}`)
  }
  console.log(`>>> ${path}`)
})
