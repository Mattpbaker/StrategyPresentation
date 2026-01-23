import { useRef, useEffect, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'

function MorphingTransition({ 
  fromShape = 'circle',
  toShape = 'square',
  duration = 1000,
  color = '#8B5CF6',
  size = 200
}) {
  const [currentShape, setCurrentShape] = useState(fromShape)
  const pathRef = useRef(null)

  const getShapePath = (shape) => {
    const center = size / 2
    switch (shape) {
      case 'circle':
        return `M ${center},${center} m -${center},0 a ${center},${center} 0 1,0 ${size},0 a ${center},${center} 0 1,0 -${size},0`
      case 'square':
        return `M 0,0 L ${size},0 L ${size},${size} L 0,${size} Z`
      case 'triangle':
        return `M ${center},0 L ${size},${size} L 0,${size} Z`
      case 'diamond':
        return `M ${center},0 L ${size},${center} L ${center},${size} L 0,${center} Z`
      default:
        return `M ${center},${center} m -${center},0 a ${center},${center} 0 1,0 ${size},0 a ${center},${center} 0 1,0 -${size},0`
    }
  }

  const { d } = useSpring({
    d: getShapePath(currentShape),
    config: { tension: 200, friction: 50 }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape(prev => prev === fromShape ? toShape : fromShape)
    }, duration)

    return () => clearInterval(interval)
  }, [fromShape, toShape, duration])

  return (
    <svg width={size} height={size} style={{ margin: '0 auto' }}>
      <animated.path
        ref={pathRef}
        d={d}
        fill={color}
        opacity={0.8}
      />
    </svg>
  )
}

export default MorphingTransition
