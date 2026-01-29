import { useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './KeyLearningsStoppedSlide.css'

function KeyLearningsStoppedSlide({ slideIndex }) {
  const containerRef = useRef(null)

  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    delay: 200,
    config: { tension: 180, friction: 40 }
  })

  const contentSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    delay: 400,
    config: { tension: 180, friction: 40 }
  })

  const items = [
    {
      label: 'Treating strategy as static documentation',
      description: 'Strategy is now a living document that evolves with our learning'
    },
    {
      label: 'Setting goals without delivery mechanisms',
      description: 'Every goal now has clear ownership and tracking'
    },
    {
      label: 'Relying on informal accountability',
      description: 'Formal check-ins and documented progress are standard'
    },
    {
      label: 'Assuming "Green" meant no further improvement',
      description: 'Success triggers stretch goals, not complacency'
    }
  ]

  return (
    <div className="slide-base key-learnings-stopped-slide" ref={containerRef}>
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#FEF2F2', '#FFF7ED']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content stopped-content">
        <animated.div className="stopped-header" style={headerSpring}>
          <div className="stopped-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <h1 className="slide-title">What We Stopped Doing</h1>
          <p className="slide-subtitle">Key behaviours we identified and eliminated</p>
        </animated.div>

        <animated.div className="stopped-grid" style={contentSpring}>
          {items.map((item, index) => (
            <div key={index} className="stopped-card">
              <div className="stopped-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </div>
              <div className="stopped-card-content">
                <h3 className="stopped-card-title">{item.label}</h3>
                <p className="stopped-card-description">{item.description}</p>
              </div>
            </div>
          ))}
        </animated.div>

        <animated.div className="stopped-outcome" style={contentSpring}>
          <div className="outcome-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <p className="outcome-text">
            <strong>Result:</strong> Learning is now embedded into behaviour, not just reflection.
          </p>
        </animated.div>
      </div>
    </div>
  )
}

export default KeyLearningsStoppedSlide
