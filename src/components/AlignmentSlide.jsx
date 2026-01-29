import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './AlignmentSlide.css'

function AlignmentSlide({ slideIndex }) {
  const decisionRef = useRef(null)
  const containerRef = useRef(null)

  const decisionSteps = [
    'Decisions are made by consensus whenever possible',
    'If consensus cannot be achieved, a simple majority vote is taken',
    'Members not present during a vote cannot contest the decision but may express views beforehand',
    'Outcome of votes is captured by the training session note taker'
  ]

  // React Spring animations
  const decisionSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay: 200,
    config: { tension: 180, friction: 40 }
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
          <h1 className="slide-title">Decision-Making Process</h1>
          <p className="slide-subtitle">From our Team Constitution - Article 6</p>
        </div>

        <div className="decision-container">
          {/* Decision Process Section */}
          <animated.div
            ref={decisionRef}
            className="slide-card decision-section"
            style={decisionSpring}
          >
            <h2 className="section-title">Article 6: Decision-Making</h2>
            <div className="section-divider" />

            <div className="steps-list">
              {decisionSteps.map((step, index) => (
                <div key={index} className="step-item">
                  <div className="step-number">{index + 1}</div>
                  <p className="step-text">{step}</p>
                </div>
              ))}
            </div>
          </animated.div>
        </div>
      </div>
    </div>
  )
}

export default AlignmentSlide
