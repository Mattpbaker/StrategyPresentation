import { useRef, useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'

function LiquidWave({ 
  color = '#8B5CF6',
  amplitude = 50,
  frequency = 0.02,
  speed = 0.5,
  height = 200,
  width = '100%'
}) {
  const pathRef = useRef(null)
  const waveRef = useRef({ offset: 0 })

  useEffect(() => {
    const animate = () => {
      waveRef.current.offset += speed
      if (pathRef.current) {
        const path = generateWavePath(waveRef.current.offset, amplitude, frequency, width)
        pathRef.current.setAttribute('d', path)
      }
      requestAnimationFrame(animate)
    }
    animate()
  }, [amplitude, frequency, speed, width])

  const generateWavePath = (offset, amp, freq, w) => {
    const width = typeof w === 'string' ? 1000 : w
    let path = `M 0 ${height / 2}`
    
    for (let x = 0; x <= width; x += 5) {
      const y = height / 2 + Math.sin((x * freq) + offset) * amp
      path += ` L ${x} ${y}`
    }
    
    path += ` L ${width} ${height} L 0 ${height} Z`
    return path
  }

  return (
    <div style={{ width, height, overflow: 'hidden', position: 'relative' }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', bottom: 0 }}>
        <animated.path
          ref={pathRef}
          fill={color}
          opacity={0.6}
        />
      </svg>
    </div>
  )
}

export default LiquidWave
