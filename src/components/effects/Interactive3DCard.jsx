import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/web'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Interactive3DCard({ children, position = [0, 0, 0], color = '#8B5CF6' }) {
  const meshRef = useRef()
  const { viewport, mouse } = useThree()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      const x = (mouse.x * viewport.width) / 2
      const y = (mouse.y * viewport.height) / 2
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        hovered ? y * 0.1 : 0,
        0.1
      )
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        hovered ? x * 0.1 : 0,
        0.1
      )
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        hovered ? 0.5 : 0,
        0.1
      )
    }
  })

  const scaleSpring = useSpring({
    scale: hovered ? 1.1 : 1,
    config: { tension: 300, friction: 20 }
  })

  return (
    <animated.group
      ref={meshRef}
      position={position}
      scale={scaleSpring.scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <boxGeometry args={[2, 3, 0.2]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={hovered ? 0.4 : 0.1}
          speed={hovered ? 2 : 1}
          transparent
          opacity={0.9}
        />
      </mesh>
      {children}
    </animated.group>
  )
}

export default Interactive3DCard
