import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './EvaluationProcessSlide.css'

function EvaluationProcessSlide({ slideIndex }) {
  const containerRef = useRef(null)
  const nodesRef = useRef([])
  const connectionsRef = useRef([])

  // React Spring animations
  const headerSpring = useSpring({
    from: { opacity: 1, y: 0 },
    to: { opacity: 1, y: 0 },
    delay: 200,
    config: { tension: 180, friction: 40 }
  })

  const nodesSpring = useSpring({
    from: { opacity: 1, scale: 1 },
    to: { opacity: 1, scale: 1 },
    delay: 400,
    config: { tension: 180, friction: 40 }
  })

  // GSAP animations
  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline()
      tl.from(nodesRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      })
      
      return () => {
        tl.kill()
      }
    }
  }, [])

  const corePrinciple = {
    text: "We use evaluation to force action, not reflection for reflection's sake.",
    position: 'top'
  }

  const processes = [
    {
      title: 'Working Groups',
      description: 'Translate evaluation into delivery',
      details: [
        'Clear ownership assigned to each strategic area',
        'All actions captured, owned, and tracked'
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      color: '#3B82F6',
      position: 'left'
    },
    {
      title: 'Strategy Simulation',
      subtitle: 'Negative Manifestation',
      description: 'We stress-tested our strategy by assuming failure and working backwards',
      details: [
        'Surfaced weaknesses in targets, tracking, accountability, and financial literacy',
        'Triggered immediate actions: clearer goals, monthly monitoring, and skills workshops'
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
      color: '#8B5CF6',
      position: 'left'
    },
    {
      title: 'SWOT → TOWS',
      description: 'SWOT used to diagnose internal and external strategic issues',
      details: [
        'Converted into TOWS to force clear strategic decisions and responses',
        'Outputs refined by a working group to ensure quality and actionability'
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="3" x2="9" y2="21"></line>
          <line x1="3" y1="9" x2="21" y2="9"></line>
        </svg>
      ),
      color: '#10B981',
      position: 'right'
    },
    {
      title: 'Monthly Strategy Sessions',
      description: 'Act as our core ongoing evaluation mechanism',
      details: [
        'Provide transparency on progress and early identification of issues',
        'Reduced reliance on infrequent termly reviews'
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      color: '#F59E0B',
      position: 'right'
    },
    {
      title: 'RAGG Framework',
      description: 'Progress evaluated using Red, Amber, Green, Gold',
      details: [
        'Red/Amber triggered redesign and working groups',
        'Green validated delivery; Gold required stretch goals'
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      ),
      color: '#EF4444',
      position: 'bottom'
    }
  ]

  return (
    <div className="slide-base evaluation-process-slide" ref={containerRef}>
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#F0EEFF', '#EFF6FF']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content evaluation-process-content">
        {/* Header */}
        <animated.div className="evaluation-process-header" style={headerSpring}>
          <h1 className="slide-title">Evaluation Process</h1>
        </animated.div>

        {/* Core Principle */}
        <animated.div className="core-principle-box" style={headerSpring}>
          <div className="principle-icon">💡</div>
          <p className="principle-text">"{corePrinciple.text}"</p>
        </animated.div>

        {/* Process Grid */}
        <animated.div className="process-grid-container" style={nodesSpring}>
          <div className="process-grid">
            {processes.map((process, index) => (
              <div
                key={index}
                ref={el => nodesRef.current[index] = el}
                className="process-card"
                style={{ '--accent-color': process.color }}
              >
                <div className="node-icon-wrapper">
                  {process.icon}
                </div>
                <div className="node-content">
                  <h3 className="node-title">{process.title}</h3>
                  {process.subtitle && (
                    <h4 className="node-subtitle">{process.subtitle}</h4>
                  )}
                  <p className="node-description">{process.description}</p>
                  <ul className="node-details">
                    {process.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="node-detail-item">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </animated.div>
      </div>
    </div>
  )
}

export default EvaluationProcessSlide
