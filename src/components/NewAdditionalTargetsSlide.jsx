import { useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './NewAdditionalTargetsSlide.css'

function NewAdditionalTargetsSlide({ slideIndex }) {
  const containerRef = useRef(null)

  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    delay: 200,
    config: { tension: 180, friction: 40 }
  })

  const cardSpring1 = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay: 400,
    config: { tension: 180, friction: 40 }
  })

  const cardSpring2 = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay: 550,
    config: { tension: 180, friction: 40 }
  })

  const targets = [
    {
      title: 'Community Activities Goal',
      description: '4 external Bristol activities as a team',
      details: [
        'Team-building through shared experiences',
        'Engage with the wider Bristol community',
        'Strengthen relationships outside of work'
      ],
      color: '#10B981',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    {
      title: 'Exit Strategy Check-ins',
      description: 'Regular exit strategy reviews and planning',
      details: [
        'Ensure teammates have clear paths forward',
        'Regular check-ins on progress and goals',
        'Support transitions and future planning'
      ],
      color: '#8B5CF6',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      )
    }
  ]

  return (
    <div className="slide-base new-additional-targets-slide" ref={containerRef}>
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#ECFDF5', '#F5F3FF']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content additional-targets-content">
        <animated.div className="slide-header" style={headerSpring}>
          <h1 className="slide-title">New Additional Targets</h1>
          <p className="slide-subtitle">New goals added to our strategy</p>
        </animated.div>

        <div className="targets-grid">
          {targets.map((target, index) => (
            <animated.div
              key={index}
              className="target-card"
              style={index === 0 ? cardSpring1 : cardSpring2}
            >
              <div className="target-header">
                <div
                  className="target-icon"
                  style={{ backgroundColor: target.color }}
                >
                  {target.icon}
                </div>
                <div className="target-titles">
                  <h3 className="target-title">{target.title}</h3>
                  <p className="target-description">{target.description}</p>
                </div>
              </div>
              <ul className="target-details">
                {target.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className="target-detail-item"
                    style={{ '--accent-color': target.color }}
                  >
                    {detail}
                  </li>
                ))}
              </ul>
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewAdditionalTargetsSlide
