import { useState, useEffect, useRef } from 'react'
import { useSpring, animated, to } from '@react-spring/web'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TitleSlide from './components/TitleSlide'
import MissionVisionSlide from './components/MissionVisionSlide'
import ValuesSlide from './components/ValuesSlide'
import KeyChangesSlide from './components/KeyChangesSlide'
import BrandingExpansionSlide from './components/BrandingExpansionSlide'
import AlignmentSlide from './components/AlignmentSlide'
import StrategyReviewSlide from './components/StrategyReviewSlide'
import TeamFunctionSlide from './components/TeamFunctionSlide'
import ToolsSlide from './components/ToolsSlide'
import FinanceSlide from './components/FinanceSlide'
import BusinessDevelopmentSlide from './components/BusinessDevelopmentSlide'
import SustainabilitySlide from './components/SustainabilitySlide'
import CommunitySlide from './components/CommunitySlide'
import NewAdditionalTargetsSlide from './components/NewAdditionalTargetsSlide'
import KeyLearningsStoppedSlide from './components/KeyLearningsStoppedSlide'
import KeyLearningsDidntWorkSlide from './components/KeyLearningsDidntWorkSlide'
import KeyLearningsBehaviourSlide from './components/KeyLearningsBehaviourSlide'
import EvaluationProcessSlide from './components/EvaluationProcessSlide'
import FuturePrioritiesSlide from './components/FuturePrioritiesSlide'
import ThankYouSlide from './components/ThankYouSlide'
import './App.css'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [financeChartFocus, setFinanceChartFocus] = useState(false)
  const slides = [
    { component: TitleSlide, id: 'title' },                                    // 0
    { component: MissionVisionSlide, id: 'mission-vision' },                   // 1
    { component: ValuesSlide, id: 'values' },                                  // 2
    { component: KeyChangesSlide, id: 'key-changes' },                         // 3
    { component: BrandingExpansionSlide, id: 'branding-expansion' },           // 4
    { component: AlignmentSlide, id: 'alignment' },                            // 5
    { component: TeamFunctionSlide, id: 'team-function' },                     // 6
    { component: ToolsSlide, id: 'tools' },                                    // 7
    { component: StrategyReviewSlide, id: 'strategy-review' },                 // 8 (Department RAGG Ratings)
    { component: FinanceSlide, id: 'finance' },                                // 9
    { component: BusinessDevelopmentSlide, id: 'business-development' },       // 10
    { component: SustainabilitySlide, id: 'sustainability' },                  // 11
    { component: CommunitySlide, id: 'community' },                            // 12
    { component: NewAdditionalTargetsSlide, id: 'new-additional-targets' },    // 13
    { component: KeyLearningsStoppedSlide, id: 'key-learnings-stopped' },      // 14
    { component: KeyLearningsDidntWorkSlide, id: 'key-learnings-didnt-work' }, // 15
    { component: KeyLearningsBehaviourSlide, id: 'key-learnings-behaviour' },  // 16
    { component: EvaluationProcessSlide, id: 'evaluation-process' },           // 17
    { component: FuturePrioritiesSlide, id: 'future-priorities' },             // 18
    { component: ThankYouSlide, id: 'thank-you' },                             // 19
  ]

  // Determine if we're in department slides section (indices 9-12)
  const departmentStartIndex = 9
  const departmentEndIndex = 12 // Community is the last department slide
  const isDepartmentSlide = currentSlide >= departmentStartIndex && currentSlide <= departmentEndIndex

  // Slide transition animation - using translate3d for GPU acceleration
  // For department slides: translate to department start horizontally, then vertically
  // For slides after departments: translate to their horizontal position (right of department section), reset vertical to 0
  // For main slides: normal horizontal translation
  // Calculate x and y separately
  const xValue = isDepartmentSlide
    ? -departmentStartIndex * 100
    : -currentSlide * 100

  const yValue = isDepartmentSlide
    ? -(currentSlide - departmentStartIndex) * 100
    : 0

  // Use separate springs - reset y immediately when leaving department section
  const prevSlideRef = useRef(currentSlide)
  const wasDeptSlide = prevSlideRef.current >= departmentStartIndex && prevSlideRef.current <= departmentEndIndex
  const leavingDeptSection = wasDeptSlide && currentSlide > departmentEndIndex
  
  useEffect(() => {
    prevSlideRef.current = currentSlide
  }, [currentSlide])

  const xSpring = useSpring({
    x: xValue,
    config: { tension: 280, friction: 60 }
  })

  const ySpring = useSpring({
    y: yValue,
    immediate: leavingDeptSection, // Reset vertical immediately when leaving department section
    config: { tension: 280, friction: 60 }
  })

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      const financeSlideIndex = 9

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        // Special handling for Finance slide - show chart focus first
        if (currentSlide === financeSlideIndex && !financeChartFocus) {
          setFinanceChartFocus(true)
          return
        }

        // If in chart focus, exit it and advance
        if (currentSlide === financeSlideIndex && financeChartFocus) {
          setFinanceChartFocus(false)
        }

        if (currentSlide < slides.length - 1) {
          setCurrentSlide(prev => prev + 1)
        }
      }

      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        // If in chart focus, first press exits focus mode
        if (financeChartFocus) {
          setFinanceChartFocus(false)
          return
        }

        if (currentSlide > 0) {
          setCurrentSlide(prev => prev - 1)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide, slides.length, financeChartFocus])

  return (
    <div className="app">
      {/* Slide Container */}
      <animated.div 
        className="slides-container"
        style={{
          transform: to([xSpring.x, ySpring.y], (x, y) => `translate3d(${x}vw, ${y}vh, 0)`)
        }}
      >
        {slides.length > 0 ? (
          slides.map((Slide, index) => {
            const Component = Slide.component
            const isDeptSlide = index >= departmentStartIndex && index <= departmentEndIndex
            const isAfterDept = index > departmentEndIndex
            
            return (
              <div 
                key={Slide.id} 
                className={`slide-wrapper ${isDeptSlide ? 'department-slide' : ''}`}
                style={isDeptSlide ? { 
                  position: 'absolute',
                  top: `${(index - departmentStartIndex) * 100}vh`,
                  left: `${departmentStartIndex * 100}vw`
                } : isAfterDept ? {
                  position: 'absolute',
                  top: '0vh',
                  left: `${index * 100}vw`
                } : {}}
              >
                <Component
                  slideIndex={index}
                  chartFocus={index === 9 ? financeChartFocus : undefined}
                />
              </div>
            )
          })
        ) : (
          <div className="slide-wrapper">
            <div className="empty-state">
              <h1>Ready to Build</h1>
              <p>Add your slides to the slides array in App.jsx</p>
              <p className="hint">All 30 effects are available in src/components/effects/</p>
            </div>
          </div>
        )}
      </animated.div>

      {/* Navigation Dots */}
      {slides.length > 0 && (
        <div className="navigation-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setCurrentSlide(index)
              }}
              aria-label={`Go to slide ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {slides.length > 0 && (
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      )}
    </div>
  )
}

export default App
