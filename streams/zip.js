const fs = require('fs')
const zlib = require('zlib')
const { Transform } = require('stream')
const file = process.argv[2]

const progress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write('.')
    callback(null, chunk)
  }
})

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(progress)
  // .on('data', () => process.stdout.write('.')) // same as above (progress)
  .pipe(fs.createWriteStream(`${file}.gz`))
  .on('finish', () => process.stdout.write('Done'))