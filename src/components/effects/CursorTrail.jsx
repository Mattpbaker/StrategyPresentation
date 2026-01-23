import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

function CursorTrail({ color = '#8B5CF6', size = 20, count = 10 }) {
  const trailRef = useRef([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      
      trailRef.current.forEach((dot, index) => {
        if (dot) {
          gsap.to(dot, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3 + (index * 0.05),
            ease: 'power2.out',
            delay: index * 0.02
          })
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          ref={el => trailRef.current[i] = el}
          style={{
            position: 'absolute',
            width: size - (i * 1.5),
            height: size - (i * 1.5),
            borderRadius: '50%',
            background: color,
            opacity: 1 - (i / count),
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            willChange: 'transform'
          }}
        />
      ))}
    </div>
  )
}

export default CursorTrail
