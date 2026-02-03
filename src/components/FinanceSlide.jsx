import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { GradientMesh } from './effects'
import totalRevenueImg from '../assets/total-revenue.png'
import netProfitImg from '../assets/net-profit-margin.png'
import '../styles/slide-base.css'
import './FinanceSlide.css'

function FinanceSlide({ slideIndex, chartFocus = false }) {
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

  // Chart focus overlay animation
  const chartOverlaySpring = useSpring({
    opacity: chartFocus ? 1 : 0,
    scale: chartFocus ? 1 : 0.8,
    config: { tension: 200, friction: 30 }
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
      title: 'Previous Target',
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
      title: 'Improvements to Target',
      icon: '🚀',
      content: [
        'Monthly financial check-ins embedded as standard',
        '£500 per-member contribution target maintained',
        'Time-based cost modelling for all ventures',
        'Financial literacy as core team capability'
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

        {/* Charts Row */}
        <div className="finance-charts-row">
          <div className="chart-card">
            <img src={totalRevenueImg} alt="Total Revenue Chart" />
          </div>
          <div className="chart-card">
            <img src={netProfitImg} alt="Net Profit Margin Chart" />
          </div>
        </div>
      </div>

      {/* Chart Focus Overlay */}
      <animated.div
        className="chart-focus-overlay"
        style={{
          opacity: chartOverlaySpring.opacity,
          transform: chartOverlaySpring.scale.to(s => `scale(${s})`),
          pointerEvents: chartFocus ? 'auto' : 'none'
        }}
      >
        <div className="chart-focus-container">
          <div className="chart-focus-card">
            <img src={totalRevenueImg} alt="Total Revenue Chart" />
          </div>
          <div className="chart-focus-card">
            <img src={netProfitImg} alt="Net Profit Margin Chart" />
          </div>
        </div>
      </animated.div>
    </div>
  )
}

export default FinanceSlide
