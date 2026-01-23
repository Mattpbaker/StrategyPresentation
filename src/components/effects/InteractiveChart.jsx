import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'

function InteractiveChart({ 
  data = [],
  type = 'bar',
  color = '#8B5CF6',
  animated = true
}) {
  const chartRef = useRef(null)
  const barsRef = useRef([])

  useEffect(() => {
    if (animated && barsRef.current.length > 0) {
      barsRef.current.forEach((bar, index) => {
        if (bar) {
          gsap.from(bar, {
            height: 0,
            duration: 1,
            delay: index * 0.1,
            ease: 'power2.out'
          })
        }
      })
    }
  }, [animated, data])

  const maxValue = Math.max(...data.map(d => d.value))

  if (type === 'bar') {
    return (
      <div ref={chartRef} style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '200px' }}>
        {data.map((item, index) => (
          <div
            key={index}
            ref={el => barsRef.current[index] = el}
            style={{
              flex: 1,
              height: `${(item.value / maxValue) * 100}%`,
              background: color,
              borderRadius: '4px 4px 0 0',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              gsap.to(e.target, { scaleY: 1.1, duration: 0.2 })
            }}
            onMouseLeave={(e) => {
              gsap.to(e.target, { scaleY: 1, duration: 0.2 })
            }}
          />
        ))}
      </div>
    )
  }

  // Line chart implementation would go here
  return null
}

export default InteractiveChart
