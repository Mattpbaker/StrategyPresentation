import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './FuturePrioritiesSlide.css'

function FuturePrioritiesSlide({ slideIndex }) {
  const containerRef = useRef(null)
  const cardsRef = useRef([])

  // React Spring animations
  const headerSpring = useSpring({
    from: { opacity: 1, y: 0 },
    to: { opacity: 1, y: 0 },
    delay: 200,
    config: { tension: 180, friction: 40 }
  })

  const contentSpring = useSpring({
    from: { opacity: 1, scale: 1 },
    to: { opacity: 1, scale: 1 },
    delay: 400,
    config: { tension: 180, friction: 40 }
  })

  // GSAP animations
  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline()
      tl.from(cardsRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
      })

      return () => {
        tl.kill()
      }
    }
  }, [])

  const priorities = [
    {
      title: 'Finalising Roles & Responsibilities',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      color: '#3B82F6',
      details: [
        'Confirm roles aligned to the new flat team structure',
        'All members to produce a short role description outlining responsibilities',
        'Roles reviewed within monthly strategy sessions to ensure continued relevance'
      ]
    },
    {
      title: 'Finalising Venture Level Goals',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      ),
      color: '#8B5CF6',
      details: [
        'Complete individual venture goals with a specific focus on Business Development and Sustainability',
        'Progress reviewed through existing monthly strategy sessions'
      ]
    },
    {
      title: 'Continued Use of Working Groups',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      ),
      color: '#10B981',
      details: [
        'Deploy working groups for key deliverables including PPP 3, the Annual Report, and the Annual Report Video',
        'Ensure clear ownership while avoiding duplication with existing roles',
        'Track progress through established strategy checkpoints'
      ]
    },
    {
      title: 'Ongoing Strategy Review & Adaptation',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
      ),
      color: '#F59E0B',
      details: [
        'Continue monthly strategy sessions as the core review mechanism',
        'Surface barriers early and assign actions to named owners',
        'Adjust actions within the same review cycle rather than deferring issues'
      ]
    }
  ]

  return (
    <div className="slide-base future-priorities-slide" ref={containerRef}>
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#F0EEFF', '#FDF2F8']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content future-priorities-content">
        {/* Header */}
        <animated.div className="future-priorities-header" style={headerSpring}>
          <h1 className="slide-title">Future Priorities</h1>
        </animated.div>

        {/* Priorities Grid */}
        <animated.div className="priorities-grid" style={contentSpring}>
          {priorities.map((priority, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="priority-card"
              style={{ '--accent-color': priority.color }}
            >
              <div className="priority-icon-wrapper">
                {priority.icon}
              </div>
              <div className="priority-content">
                <h3 className="priority-title">{priority.title}</h3>
                {priority.details.length > 0 && (
                  <ul className="priority-details">
                    {priority.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="priority-detail-item">
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </animated.div>
      </div>
    </div>
  )
}

export default FuturePrioritiesSlide
