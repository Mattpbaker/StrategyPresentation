import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from '@react-spring/web'

export function useScrollTrigger(options = {}) {
  const {
    threshold = 0.1,
    triggerOnce = false,
    rootMargin = '0px'
  } = options

  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
    rootMargin
  })

  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [inView, hasAnimated])

  return { ref, inView: inView || hasAnimated }
}

export function useScrollAnimation(options = {}) {
  const {
    from = { opacity: 0, transform: 'translateY(50px)' },
    to = { opacity: 1, transform: 'translateY(0)' },
    delay = 0,
    config = { tension: 200, friction: 50 }
  } = options

  const { ref, inView } = useScrollTrigger()

  const [spring, api] = useSpring(() => ({
    from,
    config
  }))

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        api.start({ to })
      }, delay)
    }
  }, [inView, delay, to, api])

  return { ref, style: spring }
}

export default useScrollTrigger
