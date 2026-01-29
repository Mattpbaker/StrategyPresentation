import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './BusinessDevelopmentSlide.css'

function BusinessDevelopmentSlide({ slideIndex }) {
  const containerRef = useRef(null)
  const sectionsRef = useRef([])

  // React Spring animations
  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    delay: 200,
    config: { tension: 180, friction: 40 }
  })

  const sectionsSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    delay: 400,
    config: { tension: 180, friction: 40 }
  })

  // GSAP animations
  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline()
      tl.from(sectionsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out'
      })
      
      return () => {
        tl.kill()
      }
    }
  }, [])

  const sections = [
    {
      title: 'Previous Target',
      icon: '🎯',
      content: [
        'Build data-driven customer acquisition frameworks and strengthen external engagement'
      ],
      accentColor: '#3B82F6'
    },
    {
      title: 'Current Position',
      icon: '📊',
      content: [
        'Activity was taking place, but progress could not be measured reliably',
        'Tracking and success metrics were inconsistent'
      ],
      accentColor: '#10B981'
    },
    {
      title: 'Why RED is Honest',
      icon: '✅',
      content: [
        'Goals were directionally correct but poorly defined',
        'ROI, ownership, and success thresholds were unclear'
      ],
      accentColor: '#8B5CF6'
    },
    {
      title: 'Improvements to Target',
      icon: '🚀',
      content: [
        'Goals redesigned using SWOT → TOWS methodology',
        'Minimum tracking standards with clear success metrics',
        'Dedicated working group with assigned ownership',
        'Data-driven customer acquisition with measurable ROI'
      ],
      accentColor: '#EF4444'
    }
  ]

  return (
    <div className="slide-base business-development-slide" ref={containerRef}>
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#FEF2F2', '#FFF7ED']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content business-development-content">
        {/* Header */}
        <animated.div className="business-development-header" style={headerSpring}>
          <div className="business-development-title-wrapper">
            <h1 className="slide-title">Business Development</h1>
            <div className="business-development-badge red">RED</div>
          </div>
        </animated.div>

        {/* Sections */}
        <animated.div className="business-development-sections" style={sectionsSpring}>
          {sections.map((section, index) => (
            <div
              key={index}
              ref={el => sectionsRef.current[index] = el}
              className={`business-development-section-card slide-card section-${index + 1}`}
              style={{ '--accent-color': section.accentColor }}
            >
              <div className="section-header">
                <div className="section-icon-wrapper">
                  <span className="section-icon">{section.icon}</span>
                  <span className="section-number">{index + 1}</span>
                </div>
                <h3 className="section-title">{section.title}</h3>
              </div>
              <ul className="section-content-list">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="section-content-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </animated.div>
      </div>
    </div>
  )
}

export default BusinessDevelopmentSlide
