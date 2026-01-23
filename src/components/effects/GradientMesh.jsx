import { useRef, useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'

function GradientMesh({ 
  colors = ['#EC4899', '#8B5CF6', '#3B82F6'],
  intensity = 0.5,
  speed = 1
}) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = window.innerWidth
    const height = window.innerHeight
    
    canvas.width = width
    canvas.height = height

    let time = 0
    let lastFrameTime = performance.now()
    const targetFPS = 30 // Reduce from 60fps to 30fps for better performance
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime) => {
      const elapsed = currentTime - lastFrameTime
      
      if (elapsed >= frameInterval) {
        time += 0.01 * speed
        ctx.clearRect(0, 0, width, height)

        // Create gradient mesh
        const gradient1 = ctx.createRadialGradient(
          width / 2 + Math.sin(time) * 100,
          height / 2 + Math.cos(time) * 100,
          0,
          width / 2,
          height / 2,
          width
        )
        gradient1.addColorStop(0, colors[0])
        gradient1.addColorStop(0.5, colors[1])
        gradient1.addColorStop(1, colors[2])

        ctx.fillStyle = gradient1
        ctx.globalAlpha = intensity
        ctx.fillRect(0, 0, width, height)
        
        lastFrameTime = currentTime
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate(performance.now())

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [colors, intensity, speed])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  )
}

export default GradientMesh
