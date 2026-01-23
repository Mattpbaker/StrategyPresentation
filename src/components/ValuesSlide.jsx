import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './ValuesSlide.css'

function ValuesSlide({ slideIndex }) {
  const containerRef = useRef(null)
  const valuesRef = useRef([])

  // Core values data
  const values = [
    { 
      name: 'Perseverance', 
      description: 'Pushing through challenges with determination',
      color: '#3B82F6',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21l9-9 9 9"/>
          <path d="M3 12h18"/>
        </svg>
      ),
      letter: 'P'
    },
    { 
      name: 'Ambition', 
      description: 'Striving for excellence and growth',
      color: '#8B5CF6',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      ),
      letter: 'A'
    },
    { 
      name: 'Integrity', 
      description: 'Doing the right thing, always',
      color: '#10B981',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      letter: 'I'
    },
    { 
      name: 'Respect', 
      description: 'Valuing every team member\'s contribution',
      color: '#F59E0B',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      letter: 'R'
    },
  ]

  const valueSprings = values.map((_, index) =>
    useSpring({
      from: { opacity: 0, scale: 0.9, y: 30 },
      to: { opacity: 1, scale: 1, y: 0 },
      delay: 300 + index * 150,
      config: { tension: 200, friction: 50 }
    })
  )

  // GSAP stagger animation
  useEffect(() => {
    if (slideIndex === 2 && containerRef.current) {
      gsap.from(valuesRef.current, {
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
    <div className="slide-base values-slide" ref={containerRef}>
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#F0EEFF', '#FDF2F8']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content values-content">
        <div className="slide-header">
          <h1 className="slide-title">Our Core Values</h1>
          <p className="slide-subtitle">The principles that guide everything we do</p>
        </div>
        
        <div className="values-grid">
          {values.map((value, index) => (
            <animated.div
              key={index}
              ref={el => valuesRef.current[index] = el}
              className="slide-card value-card"
              style={{
                '--value-color': value.color,
                opacity: valueSprings[index].opacity,
                transform: valueSprings[index].scale.to(scale => `scale(${scale}) translateY(${valueSprings[index].y.get()}px)`)
              }}
            >
              <div className="icon-wrapper value-icon-wrapper" style={{ backgroundColor: value.color }}>
                <div className="icon-content value-icon" style={{ color: 'white' }}>{value.icon}</div>
                <div className="value-icon-letter" style={{ backgroundColor: value.color }}>
                  {value.letter}
                </div>
              </div>
              <h3 className="card-title value-name">{value.name}</h3>
              <p className="card-description value-description">{value.description}</p>
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ValuesSlide
