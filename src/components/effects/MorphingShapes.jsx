import { useRef, useEffect, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'

function MorphingShape({ 
  from = 'circle',
  to = 'square',
  duration = 2000,
  color = '#8B5CF6',
  size = 100
}) {
  const shapeRef = useRef(null)
  const [currentShape, setCurrentShape] = useState(from)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape(prev => prev === from ? to : from)
    }, duration)

    return () => clearInterval(interval)
  }, [from, to, duration])

  const getShapePath = (shape) => {
    switch (shape) {
      case 'circle':
        return `M ${size/2},${size/2} m -${size/2},0 a ${size/2},${size/2} 0 1,0 ${size},0 a ${size/2},${size/2} 0 1,0 -${size},0`
      case 'square':
        return `M 0,0 L ${size},0 L ${size},${size} L 0,${size} Z`
      case 'triangle':
        return `M ${size/2},0 L ${size},${size} L 0,${size} Z`
      case 'star':
        return `M ${size/2},0 L ${size*0.6},${size*0.4} L ${size},${size*0.4} L ${size*0.7},${size*0.6} L ${size*0.8},${size} L ${size/2},${size*0.75} L ${size*0.2},${size} L ${size*0.3},${size*0.6} L 0,${size*0.4} L ${size*0.4},${size*0.4} Z`
      default:
        return `M ${size/2},${size/2} m -${size/2},0 a ${size/2},${size/2} 0 1,0 ${size},0 a ${size/2},${size/2} 0 1,0 -${size},0`
    }
  }

  const { d } = useSpring({
    d: getShapePath(currentShape),
    config: { tension: 200, friction: 50 }
  })

  return (
    <svg width={size} height={size} ref={shapeRef}>
      <animated.path
        d={d}
        fill={color}
        style={{ transition: 'all 0.3s ease' }}
      />
    </svg>
  )
}

export default MorphingShape
