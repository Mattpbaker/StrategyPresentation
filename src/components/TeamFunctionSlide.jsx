import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './TeamFunctionSlide.css'

function TeamFunctionSlide({ slideIndex }) {
  const containerRef = useRef(null)
  const stepsRef = useRef([])

  const steps = [
    {
      number: 1,
      title: 'Strategy & Objectives Set',
      items: [
        'Mission, Vision & Values reviewed',
        'Strategic priorities agreed using RAGG',
        'Roles & Ownership Assigned'
      ]
    },
    {
      number: 2,
      title: 'Roles & Ownership Assigned',
      items: [
        '15 defined team roles',
        'Clear owners for each strategic area',
        'Responsibilities reviewed and rotated'
      ]
    },
    {
      number: 3,
      title: 'Working Groups Activated',
      items: [
        'Working groups formed around priorities',
        'Diverse perspectives surfaced',
        'Decisions captured, not just discussed'
      ]
    },
    {
      number: 4,
      title: 'Standardised Documentation',
      items: [
        'Decisions and actions logged',
        'Owners and deadlines assigned',
        'Evidence linked in Notion'
      ]
    },
    {
      number: 5,
      title: 'Monthly Evaluation & Review',
      items: [
        'Monthly strategy sessions',
        'RAGG triggers redesign',
        'Red/Amber = action'
      ]
    },
    {
      number: 6,
      title: 'Learning Embedded into Behaviour',
      items: [
        'Goals redesigned where needed',
        'Processes updated',
        'Practices standardised'
      ]
    }
  ]

  const benefits = [
    'Reduces reliance on individuals',
    'Ensures consistent team contribution',
    'Retains learning beyond meetings',
    'Makes strategy auditable and repeatable'
  ]

  const stepSprings = steps.map((_, index) =>
    useSpring({
      from: { opacity: 1, scale: 1, y: 0 },
      to: { opacity: 1, scale: 1, y: 0 },
      delay: 200 + index * 100,
      config: { tension: 200, friction: 50 }
    })
  )

  const benefitsSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    delay: 1000,
    config: { tension: 200, friction: 50 }
  })

  // GSAP animations - only run once when slide becomes visible
  useEffect(() => {
    if (slideIndex === 6 && containerRef.current) {
      const stepCards = containerRef.current.querySelectorAll('.step-card')
      if (stepCards.length > 0) {
        const tl = gsap.timeline()
        tl.fromTo(stepCards, 
          {
            opacity: 0,
            scale: 0.8,
            y: 50
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
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
          <h1 className="slide-title">How We Function as a Team</h1>
        </div>

        {/* Steps Grid - 3 columns, 2 rows */}
        <div className="steps-grid">
          {steps.map((step, index) => (
            <animated.div
              key={index}
              ref={el => stepsRef.current[index] = el}
              className="step-card"
              style={stepSprings[index]}
            >
              <div className="step-number-badge">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <ul className="step-items">
                {step.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="step-item">{item}</li>
                ))}
              </ul>
            </animated.div>
          ))}
        </div>

        {/* Why This Works Section */}
        <animated.div 
          className="benefits-section"
          style={benefitsSpring}
        >
          <div className="slide-card benefits-card">
            <h2 className="benefits-title">Why This Works</h2>
            <div className="benefits-list">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <div className="benefit-icon">✓</div>
                  <p className="benefit-text">{benefit}</p>
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
