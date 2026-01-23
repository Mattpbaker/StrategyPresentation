import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './StrategyReviewSlide.css'

function StrategyReviewSlide({ slideIndex }) {
  const containerRef = useRef(null)
  const ratingsRef = useRef([])

  // RAGG ratings data
  const ratings = [
    { 
      department: 'Finance', 
      rating: 'Gold',
      color: '#FBBF24',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      )
    },
    { 
      department: 'Business Development', 
      rating: 'Red',
      color: '#EF4444',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
          <polyline points="16 7 22 7 22 13"></polyline>
        </svg>
      )
    },
    { 
      department: 'Sustainability', 
      rating: 'Amber',
      color: '#F97316',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"></path>
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
        </svg>
      )
    },
    { 
      department: 'Community', 
      rating: 'Gold',
      color: '#FBBF24',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
  ]

  const ratingSprings = ratings.map((_, index) =>
    useSpring({
      from: { opacity: 0, x: -30 },
      to: { opacity: 1, x: 0 },
      delay: 200 + index * 80,
      config: { tension: 180, friction: 40 } // Lighter config for better performance
    })
  )

  // GSAP stagger animation - only run once when slide becomes visible
  useEffect(() => {
    if (slideIndex === 4 && containerRef.current && ratingsRef.current.length > 0) {
      const elements = ratingsRef.current.filter(el => el !== null)
      if (elements.length > 0) {
        const tl = gsap.timeline()
        tl.from(elements, {
          opacity: 0,
          x: -50,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out'
        })
        
        return () => {
          tl.kill()
        }
      }
    }
  }, [slideIndex])

  return (
    <div className="slide-base strategy-review-slide" ref={containerRef}>
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#F0EEFF', '#FDF2F8']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content strategy-review-content">
        <div className="slide-header">
          <h1 className="slide-title">Strategy Review</h1>
          <p className="slide-subtitle">RAGG ratings for each department</p>
        </div>
        
        <div className="ratings-list">
          {ratings.map((rating, index) => (
            <animated.div
              key={index}
              ref={el => ratingsRef.current[index] = el}
              className="rating-item"
              style={{
                opacity: ratingSprings[index].opacity,
                transform: ratingSprings[index].x.to(x => `translateX(${x}px)`)
              }}
            >
              <div className="rating-item-content">
                <div className="rating-left">
                  <div className="department-header">
                    <div className="department-icon">{rating.icon}</div>
                    <h3 className="rating-department">{rating.department}</h3>
                  </div>
                </div>
                <div className="rating-right">
                  <div className="rating-badge-wrapper">
                    <div 
                      className="rating-badge" 
                      style={{ 
                        backgroundColor: rating.color,
                        boxShadow: `0 4px 16px ${rating.color}40`
                      }}
                    >
                      {rating.rating}
                    </div>
                  </div>
                </div>
              </div>
              <div 
                className="rating-progress-bar"
                style={{ 
                  backgroundColor: rating.color,
                  boxShadow: `0 2px 8px ${rating.color}60`
                }}
              ></div>
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StrategyReviewSlide
