import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './KeyChangesSlide.css'

function KeyChangesSlide({ slideIndex }) {
  const containerRef = useRef(null)
  const changesRef = useRef([])

  // Key changes data
  const keyChanges = [
    {
      title: 'New Roles',
      description: 'Introduced 15 new roles to ensure group contribution',
      color: '#3B82F6',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    {
      title: 'Hub Time',
      description: 'Encouraged Teammates to work together outside of sessions',
      color: '#8B5CF6',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      )
    },
    {
      title: 'Competency Clinics',
      description: 'Introduced into sessions to help develop technical skills',
      color: '#10B981',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21h6"/>
          <path d="M12 3a6 6 0 0 0-6 6c0 3.314 2.686 6 6 6s6-2.686 6-6a6 6 0 0 0-6-6z"/>
          <path d="M9 15h6"/>
        </svg>
      )
    },
    {
      title: 'Mark Variation',
      description: 'Reintroduced Mark Variation',
      color: '#F59E0B',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      )
    },
    {
      title: 'Exit Strategy Reviews',
      description: 'Regular reviews of teammate exit strategies',
      color: '#EC4899',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      )
    },
    {
      title: 'Exit Strategy Presenting',
      description: 'Exit strategy presentations at the end of training sessions',
      color: '#6366F1',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      )
    },
    {
      title: 'Team Values on Screen',
      description: 'Display team values at the start of training sessions',
      color: '#14B8A6',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      )
    },
  ]

  const changeSprings = keyChanges.map((_, index) =>
    useSpring({
      from: { opacity: 0, scale: 0.9, y: 30 },
      to: { opacity: 1, scale: 1, y: 0 },
      delay: 300 + index * 150,
      config: { tension: 200, friction: 50 }
    })
  )

  // GSAP animation
  useEffect(() => {
    if (slideIndex === 3 && containerRef.current) {
      gsap.from(changesRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)'
      })
    }
  }, [slideIndex])

  return (
    <div className="slide-base key-changes-slide" ref={containerRef}>
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#EFF6FF', '#F5F3FF']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content key-changes-content">
        <div className="slide-header">
          <h1 className="slide-title">
            Key changes since last<br />strategy review
          </h1>
        </div>
        
        <div className="changes-grid">
          {keyChanges.map((change, index) => {
            const isFeatured = index < 3
            return (
              <animated.div
                key={index}
                ref={el => changesRef.current[index] = el}
                className={`change-card ${isFeatured ? 'featured' : 'standard'}`}
                style={{
                  '--change-color': change.color,
                  opacity: changeSprings[index].opacity,
                  transform: changeSprings[index].scale.to(scale => `scale(${scale}) translateY(${changeSprings[index].y.get()}px)`)
                }}
              >
                <div className="change-icon-wrapper" style={{ backgroundColor: change.color }}>
                  <div className="change-icon" style={{ color: 'white' }}>{change.icon}</div>
                </div>
                <div className="change-card-content">
                  <h3 className="change-title">{change.title}</h3>
                  <p className="change-description">{change.description}</p>
                </div>
              </animated.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default KeyChangesSlide
