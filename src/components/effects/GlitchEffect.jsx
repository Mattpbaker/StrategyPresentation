import { useEffect, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'

function GlitchEffect({ children, intensity = 5, duration = 100 }) {
  const [glitch, setGlitch] = useState(false)
  const textRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), duration)
    }, 2000)

    return () => clearInterval(interval)
  }, [duration])

  useEffect(() => {
    if (glitch && textRef.current) {
      gsap.to(textRef.current, {
        x: (Math.random() - 0.5) * intensity,
        y: (Math.random() - 0.5) * intensity,
        duration: 0.05,
        repeat: 5,
        yoyo: true,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(textRef.current, { x: 0, y: 0 })
        }
      })
    }
  }, [glitch, intensity])

  const { filter } = useSpring({
    filter: glitch ? 'hue-rotate(90deg) saturate(200%)' : 'hue-rotate(0deg) saturate(100%)',
    config: { duration: 50 }
  })

  return (
    <animated.div
      ref={textRef}
      style={{
        filter,
        willChange: 'transform, filter'
      }}
    >
      {children}
    </animated.div>
  )
}

export default GlitchEffect
