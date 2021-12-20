import { useEffect, useState } from 'react'

export default function usePopUp() {
  const [showPopup, setShowPopup] = useState(false)
  useEffect(() => {
    showPopup
      ? document.querySelector('body')?.classList.add('overflow-hidden')
      : document.querySelector('body')?.classList.remove('overflow-hidden')
  }, [showPopup])

  const togglePopup = (state?: boolean): void => {
    setShowPopup(state || !showPopup)
  }

  return {
    showPopup,
    togglePopup,
  }
}
