import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './ToolsSlide.css'

function ToolsSlide({ slideIndex }) {
  const containerRef = useRef(null)
  const toolsRef = useRef([])

  const tools = [
    {
      name: 'Notion',
      description: 'Central hub for documentation, meeting notes, and knowledge management',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      ),
      features: ['Meeting Notes', 'Project Tracking', 'Decision Logs'],
      color: '#1C1917'
    },
    {
      name: 'Information Capture',
      description: 'How we document decisions and ensure nothing is lost',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <line x1="10" y1="9" x2="8" y2="9"/>
        </svg>
      ),
      features: ['Action Items', 'Key Decisions', 'Learning Points'],
      color: '#2563EB'
    },
    {
      name: 'Knowledge Sharing',
      description: 'Making information accessible and actionable for the team',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      features: ['Team Updates', 'Best Practices', 'Resource Library'],
      color: '#7C3AED'
    }
  ]

  const headerSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    delay: 100,
    config: { tension: 200, friction: 50 }
  })

  const toolSprings = tools.map((_, index) =>
    useSpring({
      from: { opacity: 0, y: 30, scale: 0.95 },
      to: { opacity: 1, y: 0, scale: 1 },
      delay: 300 + index * 150,
      config: { tension: 200, friction: 50 }
    })
  )

  useEffect(() => {
    if (containerRef.current) {
      gsap.from(toolsRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      })
    }
  }, [slideIndex])

  return (
    <div className="slide-base tools-slide" ref={containerRef}>
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#F0EEFF', '#FDF2F8']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content tools-content">
        <animated.div className="slide-header" style={headerSpring}>
          <h1 className="slide-title">How We Capture Information</h1>
          <p className="slide-subtitle">Tools and processes that ensure decisions are documented and acted upon</p>
        </animated.div>

        <div className="tools-grid">
          {tools.map((tool, index) => (
            <animated.div
              key={index}
              ref={el => toolsRef.current[index] = el}
              className="slide-card tool-card"
              style={{
                '--tool-color': tool.color,
                opacity: toolSprings[index].opacity,
                transform: toolSprings[index].scale.to(scale =>
                  `scale(${scale}) translateY(${toolSprings[index].y.get()}px)`
                )
              }}
            >
              <div className="tool-header">
                <div className="tool-icon-wrapper" style={{ backgroundColor: tool.color }}>
                  {tool.icon}
                </div>
                <h3 className="tool-name">{tool.name}</h3>
              </div>

              <p className="tool-description">{tool.description}</p>

              <div className="tool-features">
                {tool.features.map((feature, fIndex) => (
                  <div key={fIndex} className="tool-feature">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </animated.div>
          ))}
        </div>

        {/* Process Flow */}
        <div className="tools-process">
          <div className="process-step">
            <div className="process-number">1</div>
            <span>Capture</span>
          </div>
          <div className="process-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </div>
          <div className="process-step">
            <div className="process-number">2</div>
            <span>Document</span>
          </div>
          <div className="process-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </div>
          <div className="process-step">
            <div className="process-number">3</div>
            <span>Act</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToolsSlide
