import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Box, Torus } from '@react-three/drei'
import * as THREE from 'three'

function ThreeDBackground({ type = 'spheres', count = 10 }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x += 0.01 * (i % 3)
        child.rotation.y += 0.01 * (i % 2)
        child.position.y = Math.sin(state.clock.elapsedTime + i) * 0.5
      })
    }
  })

  const shapes = []
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const radius = 5 + Math.random() * 3
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const y = (Math.random() - 0.5) * 4

    if (type === 'spheres') {
      shapes.push(
        <Sphere key={i} args={[0.3, 32, 32]} position={[x, y, z]}>
          <MeshDistortMaterial
            color={i % 2 === 0 ? '#3B82F6' : '#8B5CF6'}
            attach="material"
            distort={0.3}
            speed={2}
            transparent
            opacity={0.6}
          />
        </Sphere>
      )
    } else if (type === 'boxes') {
      shapes.push(
        <Box key={i} args={[0.4, 0.4, 0.4]} position={[x, y, z]}>
          <meshStandardMaterial
            color={i % 2 === 0 ? '#3B82F6' : '#8B5CF6'}
            transparent
            opacity={0.6}
          />
        </Box>
      )
    } else if (type === 'torus') {
      shapes.push(
        <Torus key={i} args={[0.2, 0.1, 16, 32]} position={[x, y, z]}>
          <meshStandardMaterial
            color={i % 2 === 0 ? '#3B82F6' : '#8B5CF6'}
            transparent
            opacity={0.6}
          />
        </Torus>
      )
    }
  }

  return <group ref={groupRef}>{shapes}</group>
}

export default ThreeDBackground
