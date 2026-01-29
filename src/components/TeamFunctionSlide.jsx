import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './TeamFunctionSlide.css'

function TeamFunctionSlide({ slideIndex }) {
  const containerRef = useRef(null)
  const rolesRef = useRef([])

  const roles = [
    {
      title: 'Leadership & Strategy',
      description: 'Setting direction and ensuring alignment with MVV',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      ),
      color: '#7C3AED'
    },
    {
      title: 'Working Group Leads',
      description: 'Driving priorities forward with diverse perspectives',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      color: '#2563EB'
    },
    {
      title: 'Documentation Owners',
      description: 'Ensuring decisions are captured and acted upon',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
      ),
      color: '#059669'
    },
    {
      title: 'Evaluation Champions',
      description: 'Monthly review and RAGG assessment leads',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      ),
      color: '#D97706'
    }
  ]

  const expectations = [
    {
      expectation: 'Plans go smoothly',
      reality: 'Challenges arise that require adaptation',
      response: 'We capture learnings and adjust goals'
    },
    {
      expectation: 'Everyone stays aligned',
      reality: 'Different interpretations emerge',
      response: 'Regular check-ins and documented decisions'
    },
    {
      expectation: 'Progress is linear',
      reality: 'Some initiatives need redesign',
      response: 'RAGG triggers action, not just reflection'
    }
  ]

  const roleSprings = roles.map((_, index) =>
    useSpring({
      from: { opacity: 0, scale: 0.95, y: 20 },
      to: { opacity: 1, scale: 1, y: 0 },
      delay: 200 + index * 100,
      config: { tension: 200, friction: 50 }
    })
  )

  const expectationsSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    delay: 800,
    config: { tension: 200, friction: 50 }
  })

  // GSAP animations
  useEffect(() => {
    if (containerRef.current) {
      const roleCards = containerRef.current.querySelectorAll('.role-card')
      if (roleCards.length > 0) {
        const tl = gsap.timeline()
        tl.fromTo(roleCards,
          {
            opacity: 0,
            scale: 0.9,
            y: 30
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
          }
        )

        return () => {
          tl.kill()
        }
      }
    }
  }, [slideIndex])

  return (
    <div className="slide-base team-function-slide" ref={containerRef}>
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#ECFDF5', '#F0FDF4']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content team-function-content">
        <div className="slide-header">
          <h1 className="slide-title">How Learning is Captured & Acted Upon</h1>
          <p className="slide-subtitle">We function through defined roles and structured processes</p>
        </div>

        {/* Roles Grid */}
        <div className="roles-grid">
          {roles.map((role, index) => (
            <animated.div
              key={index}
              ref={el => rolesRef.current[index] = el}
              className="slide-card role-card"
              style={{
                '--role-color': role.color,
                ...roleSprings[index]
              }}
            >
              <div className="role-icon-wrapper" style={{ backgroundColor: role.color }}>
                {role.icon}
              </div>
              <h3 className="role-title">{role.title}</h3>
              <p className="role-description">{role.description}</p>
            </animated.div>
          ))}
        </div>

        {/* Expectations vs Reality Section */}
        <animated.div
          className="expectations-section"
          style={expectationsSpring}
        >
          <div className="slide-card expectations-card">
            <h2 className="expectations-title">Expectations vs Reality</h2>
            <p className="expectations-subtitle">When situations don't go to plan</p>
            <div className="expectations-list">
              {expectations.map((item, index) => (
                <div key={index} className="expectation-row">
                  <div className="expectation-col expectation">
                    <span className="col-label">Expectation</span>
                    <span className="col-value">{item.expectation}</span>
                  </div>
                  <div className="expectation-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                  <div className="expectation-col reality">
                    <span className="col-label">Reality</span>
                    <span className="col-value">{item.reality}</span>
                  </div>
                  <div className="expectation-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                  <div className="expectation-col response">
                    <span className="col-label">Our Response</span>
                    <span className="col-value">{item.response}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </animated.div>
      </div>
    </div>
  )
}

export default TeamFunctionSlide
