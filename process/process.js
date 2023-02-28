// process is an EventEmitter (Process object is an instance of EventEmitter)

process.on('exit', (code) => {
  // do one final synchronous operation before the node process terminates

  console.log(`About to exit with code: ${code}`)
})

process.on('uncaughtException', (err) => {
  // something went unhandled. Do any cleanup and exit anyway!

  console.error(err) // don't do just that.

  // FORCE exit the process too. When the process exits, the exit event handler will be invoked.
  process.exit(1)
})

// keep the event loop busy
process.stdin.resume()

// trigger a TypeError exception
console.dog()
