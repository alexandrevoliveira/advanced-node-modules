const fs = require('fs')
const path = require('path')
const dirname = path.join(__dirname, '..', 'temp')

const files = fs.readdirSync(dirname)

files.forEach(file => {
  const filePath = path.join(dirname, file)
  fs.stat(filePath, (err, stats) => {
    if (err) throw err
    // fs.truncate is dividing the size of the file by 2
    fs.truncate(filePath, stats.size/2, (err) => {
      if (err) throw err
    })
  })
})
