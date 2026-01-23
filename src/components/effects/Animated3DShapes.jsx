import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Box, Torus, Octahedron, Tetrahedron } from '@react-three/drei'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

const shapes = {
  sphere: Sphere,
  box: Box,
  torus: Torus,
  octahedron: Octahedron,
  tetrahedron: Tetrahedron
}

function Animated3DShape({ 
  type = 'sphere',
  position = [0, 0, 0],
  color = '#8B5CF6',
  size = 1,
  speed = 1,
  distort = false
}) {
  const meshRef = useRef()
  const ShapeComponent = shapes[type] || Sphere

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed
      meshRef.current.rotation.y += 0.01 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5
    }
  })

  const materialProps = distort
    ? {
        color,
        transparent: true,
        opacity: 0.8,
        distort: 0.4,
        speed: 2
      }
    : {
        color,
        transparent: true,
        opacity: 0.8
      }

  return (
    <ShapeComponent
      ref={meshRef}
      args={type === 'sphere' ? [size, 32, 32] : type === 'box' ? [size, size, size] : [size]}
      position={position}
    >
      {distort ? (
        <MeshDistortMaterial attach="material" {...materialProps} />
      ) : (
        <meshStandardMaterial attach="material" {...materialProps} />
      )}
    </ShapeComponent>
  )
}

export default Animated3DShape
