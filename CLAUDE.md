# Apollo Strategy Presentation

Interactive web-based strategy presentation for the Apollo Learning Organisation.

## Tech Stack

- **React 18** + **Vite 5** - Core framework (dev server on port 3000)
- **GSAP** + **ScrollTrigger** - Timeline animations
- **React Spring** - Physics-based animations
- **Three.js** + **@react-three/fiber** + **@react-three/drei** - 3D graphics

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── components/     # 16 slide components + effects
├── hooks/          # useScrollTrigger, useScrollAnimation, useDrag, useGesture
├── styles/         # Global CSS (glassmorphism, neumorphism, animations)
├── utils/          # Sound manager
├── assets/         # Apollo logos
├── App.jsx         # Main app with slide navigation
└── index.css       # CSS variables and brand colors
```

## Slides (16 total)

1. TitleSlide - Opening with logo
2. MissionVisionSlide
3. ValuesSlide - Perseverance, Ambition, Integrity, Respect
4. KeyChangesSlide
5. StrategyReviewSlide
6. AlignmentSlide
7. TeamFunctionSlide
8. DepartmentTargetsIntroSlide
9. FinanceSlide (gold-themed)
10. BusinessDevelopmentSlide
11. SustainabilitySlide
12. CommunitySlide
13. KeyLearningsSlide
14. EvaluationProcessSlide
15. RolesResponsibilitiesSlide
16. FuturePrioritiesSlide

## Navigation

- **Keyboard**: Arrow keys (←↑ previous, →↓ next)
- **Visual**: Clickable dots at bottom + progress bar at top
- **2D Grid**: Department slides (7-11) use a 2D navigation layout

## Brand Colors (CSS variables in index.css)

- Primary: `--apollo-purple: #8B5CF6`, `--apollo-pink: #EC4899`
- Secondary: `--apollo-blue: #3B82F6`, `--apollo-green: #10B981`, `--apollo-orange: #F59E0B`

## Key Patterns

- Each slide is a separate component with its own CSS file
- Effects guide available in `EFFECTS_GUIDE.md` (30+ visual effects)
- GPU-accelerated animations using transform3d and will-change
- Inter font family via Google Fonts
