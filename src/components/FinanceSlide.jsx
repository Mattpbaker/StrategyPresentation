import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './FinanceSlide.css'

function FinanceSlide({ slideIndex }) {
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

  // GSAP animations - only run once when slide becomes visible
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
      title: 'Goal',
      icon: '🎯',
      content: [
        '£50,000 revenue with a 25% profit margin',
        'Improve financial literacy and accountability'
      ],
      accentColor: '#3B82F6'
    },
    {
      title: 'Current Position',
      icon: '📊',
      content: [
        '£25,925 revenue to date with a 58% profit margin',
        'Multiple ventures and external opportunities contributing'
      ],
      accentColor: '#10B981'
    },
    {
      title: 'Why GOLD is Honest',
      icon: '✅',
      content: [
        'Performance is ahead of target and profitability exceeds expectations',
        'Tracking and reporting systems are robust and reliable'
      ],
      accentColor: '#8B5CF6'
    },
    {
      title: 'What Changed',
      icon: '🚀',
      content: [
        'Moved to monthly financial check-ins',
        'Introduced a £500 per-member contribution target',
        'Improved profit tracking using time-based cost modelling',
        'Delivered a financial literacy workshop to build shared capability'
      ],
      accentColor: '#F59E0B'
    }
  ]

  return (
    <div className="slide-base finance-slide" ref={containerRef}>
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#FEF3C7', '#FFFBEB']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content finance-content">
        {/* Header */}
        <animated.div className="finance-header" style={headerSpring}>
          <div className="finance-title-wrapper">
            <h1 className="slide-title">Finance</h1>
            <div className="finance-badge gold">GOLD</div>
          </div>
        </animated.div>

        {/* Sections */}
        <animated.div className="finance-sections" style={sectionsSpring}>
          {sections.map((section, index) => (
            <div
              key={index}
              ref={el => sectionsRef.current[index] = el}
              className={`finance-section-card slide-card section-${index + 1}`}
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

export default FinanceSlide
