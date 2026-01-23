import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ThreeDText({ 
  text = 'APOLLO', 
  position = [0, 0, 0],
  fontSize = 1,
  color = '#8B5CF6',
  animate = true,
  depth = 0.5
}) {
  const textRef = useRef()

  useFrame((state) => {
    if (textRef.current && animate) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={fontSize}
      color={color}
      anchorX="center"
      anchorY="middle"
      font="/fonts/inter-bold.woff"
      depthOffset={depth}
      outlineWidth={0.02}
      outlineColor="#000"
    >
      {text}
      <MeshDistortMaterial
        attach="material"
        distort={0.3}
        speed={1.5}
        color={color}
      />
    </Text>
  )
}

export default ThreeDText
