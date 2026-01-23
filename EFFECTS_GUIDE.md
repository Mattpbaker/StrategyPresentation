# Effects & Features Guide

All 30 effects are now available! Here's how to use them:

## Three.js 3D Effects (1-7)

### 1. 3D Apollo Logo
```jsx
import { Canvas } from '@react-three/fiber'
import { ThreeDLogo } from './components/effects'

<Canvas>
  <ThreeDLogo position={[0, 0, 0]} rotationSpeed={0.01} />
</Canvas>
```

### 2. Particle System
```jsx
import { ParticleSystem } from './components/effects'

<Canvas>
  <ParticleSystem count={1000} color="#8B5CF6" speed={0.5} />
</Canvas>
```

### 3. 3D Background
```jsx
import { ThreeDBackground } from './components/effects'

<Canvas>
  <ThreeDBackground type="spheres" count={10} />
</Canvas>
```

### 4. Interactive 3D Cards
```jsx
import { Interactive3DCard } from './components/effects'

<Canvas>
  <Interactive3DCard position={[0, 0, 0]} color="#8B5CF6">
    {/* Your content */}
  </Interactive3DCard>
</Canvas>
```

### 5. 3D Text
```jsx
import { ThreeDText } from './components/effects'

<Canvas>
  <ThreeDText text="APOLLO" fontSize={1} color="#8B5CF6" />
</Canvas>
```

### 6. Animated 3D Shapes
```jsx
import { Animated3DShape } from './components/effects'

<Canvas>
  <Animated3DShape type="sphere" color="#8B5CF6" size={1} />
</Canvas>
```

### 7. WebGL Shaders
```jsx
import { ShaderPlane } from './components/effects'

<Canvas>
  <ShaderPlane shaderType="gradient" size={[10, 10]} />
</Canvas>
```

## Animation Effects (8-14)

### 8. Parallax Scrolling
```jsx
import { ParallaxLayer } from './components/effects'

<ParallaxLayer speed={0.5}>
  <div>Your content</div>
</ParallaxLayer>
```

### 9. Magnetic Buttons
```jsx
import { MagneticButton } from './components/effects'

<MagneticButton onClick={() => console.log('clicked')}>
  Click Me
</MagneticButton>
```

### 10. Morphing Shapes
```jsx
import { MorphingShape } from './components/effects'

<MorphingShape 
  from="circle" 
  to="square" 
  duration={2000}
  color="#8B5CF6"
/>
```

### 11. Liquid/Wave Effects
```jsx
import { LiquidWave } from './components/effects'

<LiquidWave 
  color="#8B5CF6"
  amplitude={50}
  frequency={0.02}
  speed={0.5}
/>
```

### 12. Glitch Effects
```jsx
import { GlitchEffect } from './components/effects'

<GlitchEffect intensity={5} duration={100}>
  <h1>Glitchy Text</h1>
</GlitchEffect>
```

### 13. Holographic Effects
```jsx
import { HolographicEffect } from './components/effects'

<HolographicEffect>
  <h1>Holographic Text</h1>
</HolographicEffect>
```

### 14. Scroll-triggered Animations
```jsx
import { useScrollAnimation } from './hooks'

function MyComponent() {
  const { ref, style } = useScrollAnimation({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  })
  
  return <animated.div ref={ref} style={style}>Content</animated.div>
}
```

## Interactive Features (15-19)

### 15. Cursor Trails
```jsx
import { CursorTrail } from './components/effects'

<CursorTrail color="#8B5CF6" size={20} count={10} />
```

### 16. Interactive Charts
```jsx
import { InteractiveChart } from './components/effects'

<InteractiveChart 
  data={[
    { value: 10 },
    { value: 20 },
    { value: 15 }
  ]}
  type="bar"
  color="#8B5CF6"
/>
```

### 17. Drag Interactions
```jsx
import { useDrag } from './hooks'
import { animated } from '@react-spring/web'

function Draggable() {
  const { style, onMouseDown } = useDrag()
  return (
    <animated.div style={style} onMouseDown={onMouseDown}>
      Drag me!
    </animated.div>
  )
}
```

### 18. Gesture Controls
```jsx
import { useGesture } from './hooks'

function GestureComponent() {
  const ref = useRef()
  const { style } = useGesture(ref)
  return <div ref={ref} style={style}>Swipe me!</div>
}
```

### 19. Sound Effects
```jsx
import { soundManager, sounds } from './utils'

soundManager.loadSound('click', '/sounds/click.mp3')
soundManager.play('click')
```

## Visual Effects (20-27)

### 20. Video Backgrounds
```jsx
import { VideoBackground } from './components/effects'

<VideoBackground 
  src="/videos/background.mp4"
  poster="/images/poster.jpg"
  opacity={0.5}
/>
```

### 21. Glassmorphism
```jsx
import './styles/glassmorphism.css'

<div className="glass">
  Glass effect content
</div>
```

### 22. Neumorphism
```jsx
import './styles/neumorphism.css'

<div className="neu">
  Neumorphic content
</div>
```

### 23. Gradient Meshes
```jsx
import { GradientMesh } from './components/effects'

<GradientMesh 
  colors={['#EC4899', '#8B5CF6', '#3B82F6']}
  intensity={0.5}
  speed={1}
/>
```

### 24. Light Rays
```jsx
import { LightRays } from './components/effects'

<LightRays 
  count={5}
  color="rgba(255, 255, 255, 0.3)"
  angle={45}
  speed={1}
/>
```

### 25. Smoke/Fog Effects
```jsx
import { Canvas } from '@react-three/fiber'
import { SmokeFog } from './components/effects'

<Canvas>
  <SmokeFog count={50} color="#ffffff" />
</Canvas>
```

### 26. Lens Flares
```jsx
import { LensFlare } from './components/effects'

<Canvas>
  <LensFlare position={[0, 0, 0]} intensity={1} />
</Canvas>
```

### 27. Bloom/Glow Effects
```jsx
import { BloomGlow } from './components/effects'

<BloomGlow color="#8B5CF6" intensity={1} pulse={true}>
  <h1>Glowing Text</h1>
</BloomGlow>
```

## Transitions (28-30)

### 28. Page Transitions
```jsx
import { PageTransition } from './components/transitions'

<PageTransition type="fade" show={true}>
  <div>Content</div>
</PageTransition>
```

### 29. Split-screen Reveals
```jsx
import { SplitScreenReveal } from './components/transitions'

<SplitScreenReveal direction="horizontal" delay={0}>
  <div>Content</div>
</SplitScreenReveal>
```

### 30. Morphing Transitions
```jsx
import { MorphingTransition } from './components/transitions'

<MorphingTransition 
  fromShape="circle"
  toShape="square"
  duration={1000}
  color="#8B5CF6"
/>
```

## Quick Import

Import everything at once:
```jsx
import * as Effects from './components/effects'
import * as Transitions from './components/transitions'
import * as Hooks from './hooks'
```

## Notes

- All Three.js components need to be wrapped in `<Canvas>` from `@react-three/fiber`
- Some effects require additional setup (fonts, textures, sounds)
- Check individual component files for full prop lists
- All effects are optimized for performance

Enjoy building amazing presentations! 🚀
