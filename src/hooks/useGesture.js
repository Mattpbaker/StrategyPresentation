import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'

export function useGesture(elementRef) {
  const [{ x, y, scale, rotateZ }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    rotateZ: 0,
    config: { tension: 300, friction: 30 }
  }))

  useEffect(() => {
    if (!elementRef.current) return

    let startX = 0
    let startY = 0
    let isDown = false

    const handleTouchStart = (e) => {
      isDown = true
      const touch = e.touches[0]
      startX = touch.clientX
      startY = touch.clientY
    }

    const handleTouchMove = (e) => {
      if (!isDown) return
      const touch = e.touches[0]
      const deltaX = touch.clientX - startX
      const deltaY = touch.clientY - startY
      
      api.start({
        x: deltaX,
        y: deltaY,
        scale: 1.1
      })
    }

    const handleTouchEnd = () => {
      isDown = false
      api.start({
        x: 0,
        y: 0,
        scale: 1
      })
    }

    const element = elementRef.current
    element.addEventListener('touchstart', handleTouchStart)
    element.addEventListener('touchmove', handleTouchMove)
    element.addEventListener('touchend', handleTouchEnd)

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [elementRef, api])

  return {
    style: {
      transform: x.to((x, y, scale, rotateZ) => 
        `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotateZ}deg)`
      )
    }
  }
}

export default useGesture
