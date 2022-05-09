export default function isOverflowing(el: HTMLElement) {
  const curOverflow = el.style.overflow

  if (!curOverflow || curOverflow === 'visible') el.style.overflow = 'hidden'

  const isOverflowing =
    el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight

  el.style.overflow = curOverflow

  return isOverflowing
}
