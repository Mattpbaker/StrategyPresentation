# Apollo Strategy Presentation

A modern, animated presentation built with React, React Spring, GSAP, and Three.js.

## Features

- 🎨 **React Spring** - Smooth, physics-based animations
- ⚡ **GSAP** - Powerful timeline and scroll animations
- 🎭 **Three.js** - 3D graphics and effects (ready to use)
- 🎯 **Custom React** - Full control over components
- 📱 **Responsive** - Works on all devices
- ⌨️ **Keyboard Navigation** - Arrow keys to navigate

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Spring** - Animation library
- **GSAP** - Animation library
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for Three.js

## Project Structure

```
src/
├── components/          # React components
│   ├── TitleSlide.jsx
│   ├── MissionVisionSlide.jsx
│   └── CoreValuesSlide.jsx
├── App.jsx              # Main app component
├── App.css              # App styles
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## Navigation

- **Arrow Right** - Next slide
- **Arrow Left** - Previous slide
- **Click dots** - Jump to slide

## Adding More Slides

1. Create a new component in `src/components/`
2. Import it in `App.jsx`
3. Add it to the `slides` array
4. Use React Spring and GSAP for animations!

## Animation Examples

### React Spring
```jsx
const spring = useSpring({
  from: { opacity: 0, transform: 'translateY(50px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
  delay: 200
})
```

### GSAP
```jsx
gsap.to(elementRef.current, {
  x: 100,
  duration: 1,
  ease: 'power2.out'
})
```

### Trail Animation
```jsx
const trail = useTrail(items.length, {
  from: { opacity: 0 },
  to: { opacity: 1 }
})
```
