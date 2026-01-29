import { useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { GradientMesh } from './effects'
import '../styles/slide-base.css'
import './BrandingExpansionSlide.css'

function BrandingExpansionSlide({ slideIndex }) {
  const contentRef = useRef(null)

  const cardSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay: 200,
    config: { tension: 200, friction: 50 }
  })

  const colorsSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay: 400,
    config: { tension: 200, friction: 50 }
  })

  return (
    <div className="slide-base branding-slide">
      {/* Background */}
      <GradientMesh
        colors={['#FAFAF9', '#F0EEFF', '#FDF2F8']}
        intensity={0.25}
        speed={0.4}
      />

      {/* Content */}
      <div className="slide-content branding-content" ref={contentRef}>
        <div className="slide-header">
          <h1 className="slide-title">Brand Evolution</h1>
          <p className="slide-subtitle">A refined visual identity for a professional future</p>
        </div>

        <div className="branding-grid">
          {/* Main Message */}
          <animated.div
            className="slide-card branding-main-card"
            style={cardSpring}
          >
            <div className="branding-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h2 className="branding-title">Updated Team Branding</h2>
            <p className="branding-description">
              We've refined our visual identity to better reflect our professional growth and ambitions.
              The updated branding brings a more polished, cohesive look across all touchpoints.
            </p>
            <div className="branding-applications">
              <span className="branding-tag">Strategy Checkpoint</span>
              <span className="branding-tag">Website</span>
              <span className="branding-tag">Communications</span>
            </div>
          </animated.div>

          {/* Color Palette */}
          <animated.div
            className="slide-card branding-colors-card"
            style={colorsSpring}
          >
            <h3 className="colors-title">New Colour Palette</h3>

            <div className="color-swatches">
              <div className="color-swatch color-black">
                <span className="color-name">Black</span>
                <span className="color-hex">#1C1917</span>
              </div>
              <div className="color-swatch color-white">
                <span className="color-name">White</span>
                <span className="color-hex">#FFFFFF</span>
              </div>
              <div className="color-swatch color-blue">
                <span className="color-name">Blue</span>
                <span className="color-hex">#2563EB</span>
              </div>
              <div className="color-swatch color-purple">
                <span className="color-name">Purple</span>
                <span className="color-hex">#8B5CF6</span>
                <span className="color-badge">New Accent</span>
              </div>
            </div>

            <div className="branding-note">
              <div className="note-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </div>
              <div className="note-content">
                <span className="note-label">Typography</span>
                <span className="note-value">Montserrat (unchanged)</span>
              </div>
            </div>

            <div className="branding-change">
              <span className="change-old">Yellow accent</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
              <span className="change-new">Purple accent</span>
            </div>
          </animated.div>
        </div>
      </div>
    </div>
  )
}

export default BrandingExpansionSlide
