import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

function BloomGlow({ 
  children,
  color = '#8B5CF6',
  intensity = 1,
  pulse = false
}) {
  const glowRef = useRef(null)

  useEffect(() => {
    if (pulse && glowRef.current) {
      gsap.to(glowRef.current, {
        filter: `drop-shadow(0 0 ${20 * intensity}px ${color}) drop-shadow(0 0 ${40 * intensity}px ${color})`,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      })
    }
  }, [pulse, color, intensity])

  return (
    <div
      ref={glowRef}
      style={{
        filter: `drop-shadow(0 0 ${10 * intensity}px ${color}) drop-shadow(0 0 ${20 * intensity}px ${color})`,
        transition: 'filter 0.3s ease',
        display: 'inline-block'
      }}
    >
      {children}
    </div>
  )
}

export default BloomGlow
