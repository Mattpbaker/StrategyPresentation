import { useRef, useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'

function SplitScreenReveal({ 
  children,
  direction = 'horizontal',
  delay = 0
}) {
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  const leftSpring = useSpring({
    from: { 
      transform: direction === 'horizontal' 
        ? 'translateX(-100%)' 
        : 'translateY(-100%)',
      opacity: 0
    },
    to: { 
      transform: 'translateX(0%) translateY(0%)',
      opacity: 1
    },
    delay,
    config: { tension: 200, friction: 50 }
  })

  const rightSpring = useSpring({
    from: { 
      transform: direction === 'horizontal'
        ? 'translateX(100%)'
        : 'translateY(100%)',
      opacity: 0
    },
    to: { 
      transform: 'translateX(0%) translateY(0%)',
      opacity: 1
    },
    delay: delay + 200,
    config: { tension: 200, friction: 50 }
  })

  return (
    <div style={{ display: 'flex', flexDirection: direction === 'horizontal' ? 'row' : 'column', height: '100%' }}>
      <animated.div
        ref={leftRef}
        style={{
          ...leftSpring,
          flex: 1,
          overflow: 'hidden'
        }}
      >
        {children}
      </animated.div>
      <animated.div
        ref={rightRef}
        style={{
          ...rightSpring,
          flex: 1,
          overflow: 'hidden'
        }}
      >
        {children}
      </animated.div>
    </div>
  )
}

export default SplitScreenReveal
