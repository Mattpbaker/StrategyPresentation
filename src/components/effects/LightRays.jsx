import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

function LightRays({ 
  count = 5,
  color = 'rgba(255, 255, 255, 0.3)',
  angle = 45,
  speed = 1
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const rays = []
    for (let i = 0; i < count; i++) {
      const ray = document.createElement('div')
      ray.style.cssText = `
        position: absolute;
        width: 2px;
        height: 200px;
        background: linear-gradient(to bottom, transparent, ${color}, transparent);
        transform-origin: bottom center;
        transform: rotate(${angle + (i * 10)}deg);
        left: ${(i / count) * 100}%;
        top: 50%;
        opacity: 0.5;
      `
      containerRef.current.appendChild(ray)
      rays.push(ray)
    }

    rays.forEach((ray, index) => {
      gsap.to(ray, {
        rotation: `+=360`,
        duration: 3 / speed,
        repeat: -1,
        ease: 'none',
        delay: index * 0.2
      })
    })

    return () => {
      rays.forEach(ray => ray.remove())
    }
  }, [count, color, angle, speed])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  )
}

export default LightRays
