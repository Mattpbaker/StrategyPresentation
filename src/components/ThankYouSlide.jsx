import { useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { GradientMesh } from './effects'
import apolloLogo from '../assets/apollo-logo-transparent.png'
import './ThankYouSlide.css'

function ThankYouSlide({ slideIndex }) {
  const containerRef = useRef(null)

  // React Spring animations
  const logoSpring = useSpring({
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
    delay: 200,
    config: { tension: 180, friction: 40 }
  })

  const titleSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    delay: 400,
    config: { tension: 180, friction: 40 }
  })

  const subtitleSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    delay: 600,
    config: { tension: 180, friction: 40 }
  })

  return (
    <div className="thank-you-slide" ref={containerRef}>
      {/* Animated Gradient Background */}
      <GradientMesh
        colors={['#FAFAF9', '#F0EEFF', '#FDF2F8']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Decorative Accent Shapes */}
      <div className="thank-you-accent-shape thank-you-accent-shape-1" />
      <div className="thank-you-accent-shape thank-you-accent-shape-2" />

      {/* Centered Content Container */}
      <div className="thank-you-content">
        {/* Logo */}
        <animated.div
          className="thank-you-logo-wrapper"
          style={{
            opacity: logoSpring.opacity,
            transform: logoSpring.scale.to(scale => `scale(${scale})`)
          }}
        >
          <img
            src={apolloLogo}
            alt="Apollo Learning Organisation Logo"
            className="thank-you-logo-image"
          />
        </animated.div>

        {/* Title */}
        <animated.h1
          className="thank-you-title"
          style={{
            opacity: titleSpring.opacity,
            transform: titleSpring.y.to(y => `translateY(${y}px)`)
          }}
        >
          Thank You
        </animated.h1>

        {/* Subtitle */}
        <animated.p
          className="thank-you-subtitle"
          style={{
            opacity: subtitleSpring.opacity,
            transform: subtitleSpring.y.to(y => `translateY(${y}px)`)
          }}
        >
          For Listening
        </animated.p>
      </div>
    </div>
  )
}

export default ThankYouSlide
