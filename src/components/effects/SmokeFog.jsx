import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function SmokeFog({ count = 80, color = '#ffffff', opacity = 0.15, speed = 0.3 }) {
  const meshRef = useRef()
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const opacities = new Float32Array(count)
    const velocities = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Spread particles more evenly across the screen
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = Math.random() * 15 - 5 // Start from bottom, spread upward
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
      
      // Varied sizes for more natural look (larger for blur effect)
      sizes[i] = Math.random() * 6 + 3
      
      // Varied opacity for depth
      opacities[i] = Math.random() * 0.5 + 0.3
      
      // Individual velocities for each particle
      velocities[i * 3] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 1] = Math.random() * 0.015 + 0.005
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }
    
    return { positions, sizes, opacities, velocities }
  }, [count])

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array
      const material = meshRef.current.material
      const { velocities } = particles
      
      for (let i = 0; i < count; i++) {
        const idx = i * 3
        
        // Update position with individual velocity
        positions[idx] += velocities[idx] * speed
        positions[idx + 1] += velocities[idx + 1] * speed
        positions[idx + 2] += velocities[idx + 2] * speed
        
        // Add subtle organic movement
        positions[idx] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.005
        positions[idx + 2] += Math.cos(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.005
        
        // Reset particles that go too far up
        if (positions[idx + 1] > 10) {
          positions[idx + 1] = -5
          positions[idx] = (Math.random() - 0.5) * 30
          positions[idx + 2] = (Math.random() - 0.5) * 30
        }
        
        // Wrap around horizontally
        if (Math.abs(positions[idx]) > 15) {
          positions[idx] = (Math.random() - 0.5) * 30
        }
        if (Math.abs(positions[idx + 2]) > 15) {
          positions[idx + 2] = (Math.random() - 0.5) * 30
        }
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={4}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default SmokeFog
