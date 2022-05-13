import { useEffect, useRef, useState } from 'react'
import Colors from 'models/Colors'

export default function useSphereAnimation(color: Colors) {
  const [sphereStatus, setSphereStatus] = useState({ x: 0, y: 0, zkText: '' })

  // Animation breakpoints
  const animStart = 1300
  const changeToZk = 1700
  const superOrb = 2000
  const leftAndRight = 2238
  const animEnd = 2700

  const prevSphereStatus = useRef(sphereStatus)
  useEffect(() => {
    prevSphereStatus.current = sphereStatus
  }, [sphereStatus])

  useEffect(() => {
    const handleScroll = () => {
      const prevStatus = prevSphereStatus.current
      const y = window.scrollY + window.innerHeight

      if (y > animStart && y < animEnd) {
        if (y > changeToZk) {
          setSphereStatus({ ...prevStatus, y: y - animStart, zkText: 'ZK' })
        } else {
          setSphereStatus({ ...prevStatus, y: y - animStart, zkText: '' })
        }

        if (y > superOrb) {
          color === Colors.green
            ? setSphereStatus({ ...prevStatus, y: y - animStart, x: 85 })
            : color === Colors.pink
            ? setSphereStatus({ ...prevStatus, y: y - animStart, x: -82 })
            : undefined
        } else {
          setSphereStatus({ ...prevStatus, y: y - animStart, x: 0 })
        }

        if (y > leftAndRight) {
          color === Colors.green
            ? setSphereStatus({ ...prevStatus, y: y - animStart, x: 85 })
            : color === Colors.pink
            ? setSphereStatus({ ...prevStatus, y: y - animStart, x: -85 })
            : undefined
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.addEventListener('scroll', handleScroll)
  }, [color])

  return sphereStatus
}
