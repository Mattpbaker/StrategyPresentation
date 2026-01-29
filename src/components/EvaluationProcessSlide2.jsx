import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './EvaluationProcessSlide2.css'

function EvaluationProcessSlide2({ slideIndex }) {
  const containerRef = useRef(null)
  const nodesRef = useRef([])

  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    delay: 200,
    config: { tension: 180, friction: 40 }
  })

  const nodesSpring = useSpring({
    from: { opacity: 0, scale: 0.95 },
    to: { opacity: 1, scale: 1 },
    delay: 400,
    config: { tension: 180, friction: 40 }
  })

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline()
      tl.from(nodesRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
      })

      return () => {
        tl.kill()
      }
    }
  }, [])

  const processes = [
    {
      title: 'Monthly Strategy Sessions',
      description: 'Act as our core ongoing evaluation mechanism',
      details: [
        'Provide transparency on progress and early identification of issues',
        'Reduced reliance on infrequent termly reviews',
        'Enable continuous course correction'
      ],
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      color: '#F59E0B'
    },
    {
      title: 'RAGG Framework',
      description: 'Progress evaluated using Red, Amber, Green, Gold',
      details: [
        'Red/Amber triggered redesign and working groups',
        'Green validated delivery and maintained momentum',
        'Gold required stretch goals to prevent complacency'
      ],
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
      color: '#EF4444'
    }
  ]

  const raggColors = [
    { rating: 'Red', color: '#EF4444', meaning: 'Requires immediate action and redesign' },
    { rating: 'Amber', color: '#F97316', meaning: 'Needs attention and monitoring' },
    { rating: 'Green', color: '#22C55E', meaning: 'On track, maintain momentum' },
    { rating: 'Gold', color: '#FBBF24', meaning: 'Exceeding targets, set stretch goals' }
  ]

  return (
    <div className="slide-base evaluation-process-slide-2" ref={containerRef}>
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#FEF3C7', '#FFFBEB']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content evaluation-process-2-content">
        {/* Header */}
        <animated.div className="evaluation-2-header" style={headerSpring}>
          <h1 className="slide-title">Evaluation Process</h1>
          <p className="slide-subtitle">Ongoing monitoring and rating framework</p>
        </animated.div>

        {/* Process Cards */}
        <animated.div className="evaluation-2-grid" style={nodesSpring}>
          {processes.map((process, index) => (
            <div
              key={index}
              ref={el => nodesRef.current[index] = el}
              className="evaluation-2-card"
              style={{ '--accent-color': process.color }}
            >
              <div className="eval-card-header">
                <div className="eval-card-icon" style={{ backgroundColor: process.color }}>
                  {process.icon}
                </div>
                <div className="eval-card-titles">
                  <h3 className="eval-card-title">{process.title}</h3>
                  <p className="eval-card-description">{process.description}</p>
                </div>
              </div>
              <ul className="eval-card-details">
                {process.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="eval-detail-item">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </animated.div>

        {/* RAGG Legend */}
        <animated.div className="ragg-legend-section" style={nodesSpring}>
          <h3 className="ragg-legend-title">RAGG Rating System</h3>
          <div className="ragg-legend-grid">
            {raggColors.map((item, index) => (
              <div key={index} className="ragg-legend-item">
                <div
                  className="ragg-color-badge"
                  style={{ backgroundColor: item.color }}
                >
                  {item.rating}
                </div>
                <span className="ragg-meaning">{item.meaning}</span>
              </div>
            ))}
          </div>
        </animated.div>
      </div>
    </div>
  )
}

export default EvaluationProcessSlide2
