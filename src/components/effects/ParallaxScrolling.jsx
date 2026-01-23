import { useRef, useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'

function ParallaxLayer({ children, speed = 0.5, className = '' }) {
  const ref = useRef()

  const [{ y }, set] = useSpring(() => ({
    y: 0,
    config: { mass: 1, tension: 200, friction: 50 }
  }))

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      set({ y: scrollY * speed })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed, set])

  return (
    <animated.div
      ref={ref}
      className={className}
      style={{
        transform: y.to(y => `translateY(${y}px)`),
        willChange: 'transform'
      }}
    >
      {children}
    </animated.div>
  )
}

export default ParallaxLayer
