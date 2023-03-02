const { Readable } = require('stream')

const inStream = new Readable()

inStream.push('NDASNDASNDASKJDSAJNDNFWAALSLADMALDMALMDLKEMDMKA')
inStream.push(null)

inStream.pipe(process.stdout)
