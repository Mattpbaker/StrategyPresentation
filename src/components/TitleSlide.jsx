import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { Canvas } from '@react-three/fiber'
import { GradientMesh, SmokeFog } from './effects'
import apolloLogo from '../assets/apollo-logo-transparent.png'
import './TitleSlide.css'

function TitleSlide({ slideIndex }) {
  const logoRef = useRef(null)
  const titleRef = useRef(null)

  // React Spring animations
  const logoSpring = useSpring({
    from: { opacity: 1, scale: 1 },
    to: { opacity: 1, scale: 1 },
    config: { tension: 200, friction: 50 }
  })

  // Title stays fixed - no animation
  const titleSpring = useSpring({
    opacity: 1,
    y: 0
  })

  // GSAP animations - refined for elegance (slower, subtler)
  useEffect(() => {
    if (slideIndex === 0 && logoRef.current) {
      // Kill any existing animations first to prevent conflicts
      gsap.killTweensOf(logoRef.current)

      // Subtle floating animation for logo - slower and more elegant
      gsap.to(logoRef.current, {
        y: -12,
        duration: 6, // Slower for elegance
        ease: 'sine.inOut', // Smoother easing
        repeat: -1,
        yoyo: true,
        overwrite: true
      })
    }

    return () => {
      // Cleanup on unmount
      if (logoRef.current) {
        gsap.killTweensOf(logoRef.current)
      }
    }
  }, [slideIndex])

  return (
    <div className="title-slide">
      {/* Animated Gradient Background */}
      <GradientMesh
        colors={['#FAFAF9', '#F0EEFF', '#FDF2F8']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Decorative Accent Shapes */}
      <div className="title-accent-shape title-accent-shape-1" />
      <div className="title-accent-shape title-accent-shape-2" />

      {/* Smoke Fog Effect - refined */}
      <div className="smoke-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.8} />
          <SmokeFog count={50} color="#7C3AED" opacity={0.1} speed={0.3} />
        </Canvas>
      </div>

      {/* Centered Content Container */}
      <div className="centered-content">
        {/* Logo */}
        <animated.div 
          ref={logoRef}
          className="logo-wrapper"
          style={{
            opacity: logoSpring.opacity,
            transform: logoSpring.scale.to(scale => `scale(${scale})`)
          }}
        >
          <img
            src={apolloLogo}
            alt="Apollo Learning Organisation Logo"
            className="apollo-logo-image"
            onLoad={() => console.log('Logo loaded successfully')}
            onError={(e) => console.error('Logo failed to load:', e)}
            style={{ display: 'block', visibility: 'visible' }}
          />
        </animated.div>

        {/* Title */}
        <animated.h1 
          ref={titleRef}
          className="presentation-title"
          style={{
            opacity: titleSpring.opacity
          }}
        >
          Strategy Checkpoint
        </animated.h1>
      </div>
    </div>
  )
}

export default TitleSlide
