import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './MissionVisionSlide.css'

function MissionVisionSlide({ slideIndex }) {
  const missionRef = useRef(null)
  const visionRef = useRef(null)

  // React Spring animations
  const missionSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay: 200,
    config: { tension: 200, friction: 50 }
  })

  const visionSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay: 400,
    config: { tension: 200, friction: 50 }
  })

  return (
    <div className="slide-base mission-vision-slide">
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#F0EEFF', '#FDF2F8']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content mission-vision-content">
        <div className="slide-header">
          <h1 className="slide-title">Our Mission & Vision</h1>
        </div>

        <div className="mission-vision-grid">
          {/* Mission Section */}
          <animated.div 
            ref={missionRef}
            className="slide-card mission-section"
            style={missionSpring}
          >
            <h2 className="section-title">Our Mission</h2>
            <h3 className="section-subtitle">To learn and achieve goals</h3>
            <div className="section-divider" />
            <p className="section-text">
              Through collaboration, innovation, and shared growth, we empower each member to reach their full potential.
            </p>
          </animated.div>

          {/* Vision Section */}
          <animated.div 
            ref={visionRef}
            className="slide-card vision-section"
            style={visionSpring}
          >
            <h2 className="section-title">Our Vision</h2>
            <h3 className="section-subtitle">To be a supportive team of outstanding entrepreneurs</h3>
            <div className="section-divider" />
            <p className="section-text">
              Building a community where ambition meets opportunity, and every member thrives.
            </p>
          </animated.div>
        </div>
      </div>
    </div>
  )
}

export default MissionVisionSlide
