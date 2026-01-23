import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'

const transitions = {
  fade: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 }
  },
  slide: {
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0%)' },
    config: { tension: 200, friction: 50 }
  },
  scale: {
    from: { transform: 'scale(0.8)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
    config: { tension: 200, friction: 50 }
  },
  rotate: {
    from: { transform: 'rotateY(90deg)', opacity: 0 },
    to: { transform: 'rotateY(0deg)', opacity: 1 },
    config: { tension: 200, friction: 50 }
  },
  flip: {
    from: { transform: 'rotateX(90deg)', opacity: 0 },
    to: { transform: 'rotateX(0deg)', opacity: 1 },
    config: { tension: 200, friction: 50 }
  }
}

function PageTransition({ 
  children,
  type = 'fade',
  show = true
}) {
  const transition = transitions[type] || transitions.fade
  
  const [spring, api] = useSpring(() => ({
    ...transition.from,
    config: transition.config
  }))

  useEffect(() => {
    if (show) {
      api.start({
        ...transition.to
      })
    } else {
      api.start({
        ...transition.from
      })
    }
  }, [show, api, transition])

  return (
    <animated.div style={spring}>
      {children}
    </animated.div>
  )
}

export default PageTransition
