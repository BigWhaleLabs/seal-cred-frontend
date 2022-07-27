export default function (callback: () => void) {
  window.addEventListener('beforeunload', callback)
}
