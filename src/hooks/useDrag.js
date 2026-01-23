import { useState, useRef, useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'

export function useDrag() {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const dragStart = useRef({ x: 0, y: 0 })
  const elementRef = useRef(null)

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 300, friction: 30 }
  }))

  const handleMouseDown = (e) => {
    setIsDragging(true)
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.current.x
      const newY = e.clientY - dragStart.current.y
      setPosition({ x: newX, y: newY })
      api.start({ x: newX, y: newY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  return {
    ref: elementRef,
    style: { x, y },
    onMouseDown: handleMouseDown,
    isDragging
  }
}

export default useDrag
