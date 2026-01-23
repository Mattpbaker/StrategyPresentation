import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './DepartmentTargetsIntroSlide.css'

function DepartmentTargetsIntroSlide({ slideIndex }) {
  const containerRef = useRef(null)
  const contentRef = useRef(null)

  // React Spring animations
  const contentSpring = useSpring({
    from: { opacity: 0, scale: 0.95 },
    to: { opacity: 1, scale: 1 },
    delay: 200,
    config: { tension: 200, friction: 50 }
  })

  const textSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    delay: 500,
    config: { tension: 200, friction: 50 }
  })

  // GSAP animations
  useEffect(() => {
    if (slideIndex === 7 && containerRef.current) {
      gsap.from(contentRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out'
      })
    }
  }, [slideIndex])

  return (
    <div className="slide-base department-targets-intro-slide" ref={containerRef}>
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#F0EEFF', '#EFF6FF']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content department-targets-intro-content">
        <animated.div 
          ref={contentRef}
          className="intro-card"
          style={contentSpring}
        >
          <div className="intro-header">
            <h1 className="intro-title">Department Targets</h1>
            <div className="intro-divider"></div>
          </div>

          <animated.div 
            className="intro-body"
            style={textSpring}
          >
            <p className="intro-description">
              Each department has specific targets aligned with our strategic priorities. 
              These targets are reviewed monthly using our RAGG rating system to ensure 
              continuous progress and alignment with our mission.
            </p>

            <div className="intro-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <p className="feature-text">Clear, measurable objectives</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                </div>
                <p className="feature-text">RAGG performance tracking</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <p className="feature-text">Monthly review cycles</p>
              </div>
            </div>
          </animated.div>
        </animated.div>
      </div>
    </div>
  )
}

export default DepartmentTargetsIntroSlide
