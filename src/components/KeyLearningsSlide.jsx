import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './KeyLearningsSlide.css'

function KeyLearningsSlide({ slideIndex }) {
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
        stagger: 0.15,
        ease: 'power2.out'
      })
      
      return () => {
        tl.kill()
      }
    }
  }, [])

  const sections = [
    {
      title: 'What We Stopped Doing',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      ),
      content: [
        'Treating strategy as static documentation',
        'Setting goals without delivery mechanisms',
        'Relying on informal accountability',
        'Assuming "Green" meant no further improvement',
        'Learning is now embedded into behaviour, not just reflection.'
      ],
      accentColor: '#EF4444'
    },
    {
      title: 'What Didn\'t Work',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      ),
      content: [
        'Infrequent reviews delayed identification of issues',
        'Some goals were directionally correct but poorly defined',
        'Reflection without ownership slowed execution',
        'Individual wellbeing tracking lacked meaning and engagement'
      ],
      accentColor: '#F97316'
    },
    {
      title: 'How Behaviour Changed',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      ),
      content: [
        'Shift from discussion-heavy reflection to action-led evaluation',
        'Increased use of data, tracking, and minimum standards',
        'Clear ownership of strategy areas improved accountability',
        'Greater willingness to redesign goals rather than defend them'
      ],
      accentColor: '#10B981'
    }
  ]

  return (
    <div className="slide-base key-learnings-slide" ref={containerRef}>
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#FEF2F2', '#FFF7ED']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content key-learnings-content">
        {/* Header */}
        <animated.div className="key-learnings-header" style={headerSpring}>
          <h1 className="slide-title">Key Learnings</h1>
        </animated.div>

        {/* Sections */}
        <animated.div className="key-learnings-sections" style={sectionsSpring}>
          {sections.map((section, index) => (
            <div
              key={index}
              ref={el => sectionsRef.current[index] = el}
              className={`key-learnings-section-card slide-card section-${index + 1}`}
              style={{ '--accent-color': section.accentColor }}
            >
              <div className="section-header">
                <div className="section-icon-wrapper">
                  {section.icon}
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

export default KeyLearningsSlide
