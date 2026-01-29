import { useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './KeyLearningsBehaviourSlide.css'

function KeyLearningsBehaviourSlide({ slideIndex }) {
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

  const changes = [
    {
      before: 'Discussion-heavy reflection',
      after: 'Action-led evaluation',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      )
    },
    {
      before: 'Ad-hoc tracking',
      after: 'Data, tracking, and minimum standards',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      )
    },
    {
      before: 'Unclear ownership',
      after: 'Clear ownership of strategy areas',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="8.5" cy="7" r="4"/>
          <polyline points="17 11 19 13 23 9"/>
        </svg>
      )
    },
    {
      before: 'Defending goals',
      after: 'Willingness to redesign goals',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      )
    }
  ]

  return (
    <div className="slide-base key-learnings-behaviour-slide" ref={containerRef}>
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#ECFDF5', '#F0FDF4']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content behaviour-content">
        <animated.div className="behaviour-header" style={headerSpring}>
          <div className="behaviour-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <h1 className="slide-title">How Behaviour Changed</h1>
          <p className="slide-subtitle">The shifts in how we work as a team</p>
        </animated.div>

        <animated.div className="behaviour-grid" style={contentSpring}>
          {changes.map((change, index) => (
            <div key={index} className="behaviour-card">
              <div className="behaviour-card-icon">
                {change.icon}
              </div>
              <div className="behaviour-card-content">
                <div className="behaviour-before">
                  <span className="behaviour-label">Before</span>
                  <span className="behaviour-value before">{change.before}</span>
                </div>
                <div className="behaviour-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
                <div className="behaviour-after">
                  <span className="behaviour-label">After</span>
                  <span className="behaviour-value after">{change.after}</span>
                </div>
              </div>
            </div>
          ))}
        </animated.div>

        <animated.div className="behaviour-summary" style={contentSpring}>
          <div className="summary-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <p className="summary-text">
            These changes have created a culture of <strong>continuous improvement</strong> and <strong>accountability</strong>
          </p>
        </animated.div>
      </div>
    </div>
  )
}

export default KeyLearningsBehaviourSlide
