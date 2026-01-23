import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

function HolographicEffect({ children, className = '' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      const element = containerRef.current
      
      const handleMouseMove = (e) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        
        const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI)
        
        element.style.background = `
          linear-gradient(${angle}deg,
            rgba(236, 72, 153, 0.3) 0%,
            rgba(139, 92, 246, 0.3) 25%,
            rgba(59, 130, 246, 0.3) 50%,
            rgba(16, 185, 129, 0.3) 75%,
            rgba(236, 72, 153, 0.3) 100%
          )
        `
      }

      element.addEventListener('mousemove', handleMouseMove)
      return () => element.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.2))',
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}
    >
      {children}
    </div>
  )
}

export default HolographicEffect
