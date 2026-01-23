import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, MeshDistortMaterial, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function ThreeDLogo({ position = [0, 0, 0], rotationSpeed = 0.01 }) {
  const meshRef = useRef()
  const textRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1
    }
    if (textRef.current) {
      textRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group ref={meshRef} position={position}>
      <Text
        ref={textRef}
        fontSize={2}
        color="#000"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        APOLLO
      </Text>
      <OrbitControls enableZoom={false} enablePan={false} />
    </group>
  )
}

export default ThreeDLogo
