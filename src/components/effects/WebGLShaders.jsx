import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Gradient shader
const gradientShader = {
  uniforms: {
    time: { value: 0 },
    color1: { value: new THREE.Color('#EC4899') },
    color2: { value: new THREE.Color('#8B5CF6') }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      float gradient = sin(uv.x * 3.14159 + time) * 0.5 + 0.5;
      vec3 color = mix(color1, color2, gradient);
      gl_FragColor = vec4(color, 1.0);
    }
  `
}

// Noise shader
const noiseShader = {
  uniforms: {
    time: { value: 0 },
    scale: { value: 10.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform float scale;
    varying vec2 vUv;
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    void main() {
      vec2 st = vUv * scale;
      float n = noise(st + time);
      gl_FragColor = vec4(vec3(n), 1.0);
    }
  `
}

function ShaderPlane({ shaderType = 'gradient', size = [10, 10] }) {
  const meshRef = useRef()
  const shaderMaterial = useRef()

  useFrame((state) => {
    if (shaderMaterial.current) {
      shaderMaterial.current.uniforms.time.value = state.clock.elapsedTime
    }
  })

  const shader = shaderType === 'gradient' ? gradientShader : noiseShader

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={size} />
      <shaderMaterial
        ref={shaderMaterial}
        attach="material"
        args={[shader]}
      />
    </mesh>
  )
}

export default ShaderPlane
