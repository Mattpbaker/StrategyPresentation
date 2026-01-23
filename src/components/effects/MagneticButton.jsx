import { useRef, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'

function MagneticButton({ children, className = '', onClick, ...props }) {
  const buttonRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const [{ x, y, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    config: { tension: 300, friction: 30 }
  }))

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * 0.3
    const deltaY = (e.clientY - centerY) * 0.3
    
    api.start({
      x: deltaX,
      y: deltaY,
      scale: 1.05
    })
  }

  const handleMouseLeave = () => {
    api.start({
      x: 0,
      y: 0,
      scale: 1
    })
    setIsHovered(false)
  }

  return (
    <animated.button
      ref={buttonRef}
      className={className}
      style={{
        transform: x.to((x, y, scale) => `translate(${x}px, ${y}px) scale(${scale})`),
        willChange: 'transform'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      {children}
    </animated.button>
  )
}

export default MagneticButton
