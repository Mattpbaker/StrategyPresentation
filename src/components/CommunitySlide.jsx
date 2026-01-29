import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { GradientMesh } from './effects'
import eventsImg from '../assets/events-ran-by-team.png'
import '../styles/slide-base.css'
import './CommunitySlide.css'

function CommunitySlide({ slideIndex }) {
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
        'Deliver meaningful community events that support TE learning'
      ],
      accentColor: '#3B82F6'
    },
    {
      title: 'Current Position',
      icon: '📊',
      content: [
        'Events consistently delivered with strong attendance and feedback',
        'Clear evidence of applied learning through LBD and LFO outputs'
      ],
      accentColor: '#10B981'
    },
    {
      title: 'Why GOLD is Honest',
      icon: '✅',
      content: [
        'Targets were being met comfortably and no longer stretched the team',
        'Tracking and ownership were already strong'
      ],
      accentColor: '#8B5CF6'
    },
    {
      title: 'Improvements to Target',
      icon: '🚀',
      content: [
        'Four events per term (increased from three)',
        'Higher minimum attendance thresholds',
        'Post-event surveys evidencing applied learning',
        'Stretch goals triggered by GOLD status'
      ],
      accentColor: '#F59E0B'
    }
  ]

  return (
    <div className="slide-base community-slide" ref={containerRef}>
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#FEF3C7', '#FFFBEB']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content community-content">
        {/* Header */}
        <animated.div className="community-header" style={headerSpring}>
          <div className="community-title-wrapper">
            <h1 className="slide-title">Community Contribution</h1>
            <div className="community-badge gold">GOLD</div>
          </div>
        </animated.div>

        {/* Sections */}
        <animated.div className="community-sections" style={sectionsSpring}>
          {sections.map((section, index) => (
            <div
              key={index}
              ref={el => sectionsRef.current[index] = el}
              className={`community-section-card slide-card section-${index + 1}`}
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
          {/* Events Chart - in row 2 with sections 3 & 4 */}
          <div className="chart-card community-chart-card">
            <img src={eventsImg} alt="Events Ran per Term" />
          </div>
        </animated.div>
      </div>
    </div>
  )
}

export default CommunitySlide
