import { useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './KeyLearningsDidntWorkSlide.css'

function KeyLearningsDidntWorkSlide({ slideIndex }) {
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
      problem: 'Infrequent reviews',
      impact: 'Delayed identification of issues',
      solution: 'Monthly strategy sessions',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      )
    },
    {
      problem: 'Poorly defined goals',
      impact: 'Directionally correct but unmeasurable',
      solution: 'Clear success metrics and tracking',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      )
    },
    {
      problem: 'Reflection without ownership',
      impact: 'Slowed execution and accountability',
      solution: 'Assigned roles and responsibilities',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    {
      problem: 'Individual wellbeing tracking',
      impact: 'Lacked meaning and engagement',
      solution: 'Team Resilience model',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      )
    }
  ]

  return (
    <div className="slide-base key-learnings-didnt-work-slide" ref={containerRef}>
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#FFF7ED', '#FFFBEB']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content didnt-work-content">
        <animated.div className="didnt-work-header" style={headerSpring}>
          <div className="didnt-work-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h1 className="slide-title">What Didn't Work</h1>
          <p className="slide-subtitle">Challenges we identified and how we addressed them</p>
        </animated.div>

        <animated.div className="didnt-work-grid" style={contentSpring}>
          {items.map((item, index) => (
            <div key={index} className="didnt-work-card">
              <div className="didnt-work-card-header">
                <div className="didnt-work-card-icon">
                  {item.icon}
                </div>
                <h3 className="didnt-work-card-problem">{item.problem}</h3>
              </div>
              <div className="didnt-work-card-body">
                <div className="impact-row">
                  <span className="row-label">Impact:</span>
                  <span className="row-value impact">{item.impact}</span>
                </div>
                <div className="solution-row">
                  <span className="row-label">Solution:</span>
                  <span className="row-value solution">{item.solution}</span>
                </div>
              </div>
            </div>
          ))}
        </animated.div>
      </div>
    </div>
  )
}

export default KeyLearningsDidntWorkSlide
