export enum UserAgent {
  Chrome,
  Safari,
  Firefox,
  Edge,
  Else,
}

export function userAgent() {
  let browserName: UserAgent

  if (navigator.vendor.match(/google/i)) {
    browserName = UserAgent.Chrome
  } else if (navigator.vendor.match(/apple/i)) {
    browserName = UserAgent.Safari
  } else if (navigator.userAgent.match(/firefox\//i)) {
    browserName = UserAgent.Firefox
  } else if (navigator.userAgent.match(/edge\//i)) {
    browserName = UserAgent.Edge
  } else {
    browserName = UserAgent.Else
  }
  return browserName
}

export function mobileCheck() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ]

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem)
  })
}
