export default function () {
  if (typeof navigator === 'object' && navigator.hardwareConcurrency) return
  // if there is no accessibility to navigator object or concurrency set it to default number
  Object.defineProperties(window.navigator, {
    hardwareConcurrency: {
      value: 2,
      writable: true,
    },
  })
}
