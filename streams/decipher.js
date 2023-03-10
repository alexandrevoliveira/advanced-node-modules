const crypto = require('crypto')
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
.pipe(crypto.createDecipher('aes192', 'some-secret-key'))
  .pipe(zlib.createGunzip())
  .pipe(progress)
  .pipe(fs.createWriteStream(file.slice(0, -3)))
  .on('finish', () => process.stdout.write('Done'))
  