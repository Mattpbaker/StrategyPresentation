import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './SustainabilitySlide.css'

function SustainabilitySlide({ slideIndex }) {
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
        'Reduce environmental impact and strengthen wellbeing across the team'
      ],
      accentColor: '#3B82F6'
    },
    {
      title: 'Current Position',
      icon: '📊',
      content: [
        'Sustainability lacked engagement and was often treated as a checkbox',
        'Limited connection to venture-level outputs'
      ],
      accentColor: '#10B981'
    },
    {
      title: 'Why AMBER is Honest',
      icon: '✅',
      content: [
        'Intent was strong, but delivery lacked integration and evidence',
        'Engagement was inconsistent across the team'
      ],
      accentColor: '#8B5CF6'
    },
    {
      title: 'Improvements to Target',
      icon: '🚀',
      content: [
        'Venture-level sustainability outputs (not just individual behaviour)',
        'Sustainability Audit completed with one impact action by April 2026',
        'Venture Impact Tracker for environmental and social impact',
        'Team Resilience model replacing individual wellbeing tracking'
      ],
      accentColor: '#F97316'
    }
  ]

  return (
    <div className="slide-base sustainability-slide" ref={containerRef}>
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#FFF7ED', '#ECFDF5']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content sustainability-content">
        {/* Header */}
        <animated.div className="sustainability-header" style={headerSpring}>
          <div className="sustainability-title-wrapper">
            <h1 className="slide-title">Sustainability</h1>
            <div className="sustainability-badge amber">AMBER</div>
          </div>
        </animated.div>

        {/* Sections */}
        <animated.div className="sustainability-sections" style={sectionsSpring}>
          {sections.map((section, index) => (
            <div
              key={index}
              ref={el => sectionsRef.current[index] = el}
              className={`sustainability-section-card slide-card section-${index + 1}`}
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

export default SustainabilitySlide
