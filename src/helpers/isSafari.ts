export default navigator.vendor &&
  navigator.vendor.includes('Apple') &&
  navigator.userAgent &&
  !navigator.userAgent.includes('CriOS') &&
  !navigator.userAgent.includes('FxiOS')
