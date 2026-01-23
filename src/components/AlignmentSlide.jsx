import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './AlignmentSlide.css'

function AlignmentSlide({ slideIndex }) {
  const decisionRef = useRef(null)
  const learningRef = useRef(null)
  const containerRef = useRef(null)

  const decisionSteps = [
    'Issue or opportunity identified',
    'Diverse perspectives surfaced (working groups)',
    'Dissent and risks explicitly raised',
    'Decision agreed with rationale',
    'Ownership assigned'
  ]

  const learningSteps = [
    'Decisions logged in Notion',
    'Rationale recorded',
    'Actions tracked with owners',
    'Reviewed in monthly strategy sessions',
    'Updated into future strategy'
  ]

  const tools = [
    'Deep Democracy principles',
    'Working Groups',
    'Monthly Strategy Sessions'
  ]

  // React Spring animations
  const decisionSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay: 200,
    config: { tension: 180, friction: 40 } // Lighter config for better performance
  })

  const learningSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay: 350,
    config: { tension: 180, friction: 40 } // Lighter config for better performance
  })

  // GSAP animations - only run once when slide becomes visible
  useEffect(() => {
    if (slideIndex === 5 && containerRef.current) {
      const children = containerRef.current.querySelectorAll('.slide-card')
      if (children.length > 0) {
        const tl = gsap.timeline()
        tl.from(children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out'
        })
        
        return () => {
          tl.kill()
        }
      }
    }
  }, [slideIndex])

  return (
    <div className="slide-base alignment-slide" ref={containerRef}>
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#EFF6FF', '#F5F3FF']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content alignment-content">
        <div className="slide-header">
          <h1 className="slide-title">How We Decide, Learn & Stay Aligned</h1>
        </div>

        <div className="slide-grid-2">
          {/* Decision Process Section */}
          <animated.div 
            ref={decisionRef}
            className="slide-card decision-section"
            style={decisionSpring}
          >
            <h2 className="section-title">How decisions are made</h2>
            <h3 className="section-subtitle">Decision Process</h3>
            <div className="section-divider" />
            
            <div className="steps-list">
              {decisionSteps.map((step, index) => (
                <div key={index} className="step-item">
                  <div className="step-number">{index + 1}</div>
                  <p className="step-text">{step}</p>
                </div>
              ))}
            </div>

            <div className="quote-box">
              <p className="quote-text">"Alignment is built through process, not consensus."</p>
            </div>
          </animated.div>

          {/* Learning Capture Section */}
          <animated.div 
            ref={learningRef}
            className="slide-card learning-section"
            style={learningSpring}
          >
            <h2 className="section-title">How learning is retained</h2>
            <h3 className="section-subtitle">Learning Capture</h3>
            <div className="section-divider" />
            
            <div className="steps-list">
              {learningSteps.map((step, index) => (
                <div key={index} className="step-item">
                  <div className="step-number">{index + 1}</div>
                  <p className="step-text">{step}</p>
                </div>
              ))}
            </div>
          </animated.div>
        </div>

        {/* Tools Section */}
        <div className="tools-container">
          <div className="slide-card tools-box">
            <p className="tools-label">Tools:</p>
            <div className="tools-list">
              {tools.map((tool, index) => (
                <span key={index} className="tool-tag">{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlignmentSlide
