import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import * as THREE from 'three'
import { type BackgroundPresentation, type VisitorWorld } from '../lib/visitorWorld'

interface ResolvedPalette {
  skyTop: string
  skyBottom: string
  fog: string
  ground: string
  groundDark: string
  accent: string
  accentSoft: string
  spriteSkin: string
  spriteCoat: string
  spriteTrim: string
}

interface WorldBackgroundProps {
  world: VisitorWorld | null
  presentation: BackgroundPresentation
}

export default function WorldBackground({ world, presentation }: WorldBackgroundProps) {
  const [mounted, setMounted] = useState(false)
  const [useFallback, setUseFallback] = useState(true)
  const palette = useMemo(() => resolvePalette(world, presentation), [world, presentation])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) {
      return
    }

    const deviceMemory = typeof navigator !== 'undefined' ? navigator.deviceMemory : undefined
    const lowPower = typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4
    const reducedMotion = world?.ambient.reducedMotion ?? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const shouldFallback = reducedMotion || lowPower || (deviceMemory != null && deviceMemory <= 4) || !supportsWebGl()

    setUseFallback(shouldFallback)
  }, [mounted, presentation.phase, world?.ambient.reducedMotion])

  if (!mounted || useFallback) {
    return <WorldFallback palette={palette} presentation={presentation} />
  }

  return (
    <div className={`world-layer world-layer--${presentation.phase}`} aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 2.8, 11], fov: 34 }}
        gl={{ antialias: false, alpha: true }}
      >
        <Scene palette={palette} presentation={presentation} />
      </Canvas>
      <div className="world-layer__grain" />
    </div>
  )
}

function Scene({ palette, presentation }: { palette: ResolvedPalette; presentation: BackgroundPresentation }) {
  return (
    <>
      <color attach="background" args={[palette.skyTop]} />
      <fog attach="fog" args={[palette.fog, 10, 26 - presentation.depth * 8]} />
      <ambientLight intensity={0.92 + presentation.intensity * 0.3} />
      <directionalLight position={[6, 8, 4]} intensity={0.95 + presentation.intensity * 0.7} color={palette.accent} />
      <directionalLight position={[-4, 5, -2]} intensity={0.24 + presentation.intensity * 0.5} color={palette.skyBottom} />
      <SkyPlane palette={palette} presentation={presentation} />
      <Terrain palette={palette} presentation={presentation} />
      <Character palette={palette} presentation={presentation} />
      <ParticleField palette={palette} presentation={presentation} />
    </>
  )
}

function SkyPlane({ palette, presentation }: { palette: ResolvedPalette; presentation: BackgroundPresentation }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTop: { value: new THREE.Color(palette.skyTop) },
    uBottom: { value: new THREE.Color(palette.skyBottom) },
    uAccent: { value: new THREE.Color(palette.accentSoft) },
    uDepth: { value: presentation.depth },
  }), [palette.accentSoft, palette.skyBottom, palette.skyTop, presentation.depth])

  useFrame((_, delta) => {
    if (!materialRef.current) {
      return
    }

    materialRef.current.uniforms.uTime.value += delta * (0.2 + presentation.intensity * 0.45)
  })

  return (
    <mesh position={[0, 6.5, -10]}>
      <planeGeometry args={[34, 22, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        depthWrite={false}
        transparent
        vertexShader={`
          varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform float uDepth;
          uniform vec3 uTop;
          uniform vec3 uBottom;
          uniform vec3 uAccent;

          float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
          }

          void main() {
            vec2 uv = vUv;
            float horizon = smoothstep(0.02, 0.98, uv.y);
            float drift = sin((uv.x * (6.0 + (uDepth * 6.0))) + (uTime * (0.22 + (uDepth * 0.25)))) * (0.02 + uDepth * 0.05);
            float glow = smoothstep(0.4, 1.0, uv.y + drift);
            float speck = step(0.988 - uDepth * 0.01, random(floor(uv * (48.0 + uDepth * 24.0)) + floor(uTime * 0.4)));

            vec3 base = mix(uBottom, uTop, horizon);
            base += uAccent * glow * (0.08 + uDepth * 0.16);
            base += vec3(speck) * (0.02 + uDepth * 0.08);

            gl_FragColor = vec4(base, 1.0);
          }
        `}
      />
    </mesh>
  )
}

function Terrain({ palette, presentation }: { palette: ResolvedPalette; presentation: BackgroundPresentation }) {
  const blocks = useMemo(() => {
    const rows = 6 + Math.round(presentation.depth * 2)
    const columns = 12
    const results: Array<{ position: [number, number, number]; color: string; opacity: number }> = []

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const x = column - 5.5
        const z = row * -1.22
        const wave = Math.sin((column + row * 1.4) * 0.68) * (0.18 + presentation.depth * 0.28)
        const lift = row === 0 ? 0 : ((row + column) % 3) * 0.18
        const accent = (column + row) % 8 === 0

        results.push({
          position: [x, wave + lift - (2.7 - presentation.depth * 0.42), z],
          color: accent ? palette.accentSoft : row % 2 === 0 ? palette.ground : palette.groundDark,
          opacity: 0.22 + presentation.depth * 0.78,
        })
      }
    }

    return results
  }, [palette.accentSoft, palette.ground, palette.groundDark, presentation.depth])

  return (
    <group position={[0, 0, 0]}>
      {blocks.map((block, index) => (
        <mesh key={`${block.position.join('-')}-${index}`} position={block.position}>
          <boxGeometry args={[0.96, 0.96, 0.96]} />
          <meshStandardMaterial
            color={block.color}
            roughness={0.96}
            metalness={0.04}
            transparent
            opacity={block.opacity}
          />
        </mesh>
      ))}
    </group>
  )
}

function Character({ palette, presentation }: { palette: ResolvedPalette; presentation: BackgroundPresentation }) {
  const groupRef = useRef<THREE.Group>(null)
  const visibility = presentation.avatarVisibility
  const personalShift = presentation.personalVisibility

  useFrame((state) => {
    if (!groupRef.current) {
      return
    }

    const wave = Math.sin(state.clock.elapsedTime * (0.9 + personalShift * 1.3)) * (0.08 + visibility * 0.1)
    groupRef.current.position.y = -0.58 + wave
    groupRef.current.position.z = 1.2 - presentation.depth * 1.8 - personalShift * 0.45
    groupRef.current.position.x = 1.35 - personalShift * 1.65
    groupRef.current.rotation.y = 0.6 - personalShift * 0.6 + Math.sin(state.clock.elapsedTime * 0.18) * 0.12
    groupRef.current.scale.setScalar(0.86 + visibility * 0.3 + personalShift * 0.16)
  })

  return (
    <group ref={groupRef} visible={visibility > 0.02}>
      <mesh position={[0, 1.08, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={palette.spriteSkin} transparent opacity={visibility} roughness={1} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[1.18, 1.45, 0.76]} />
        <meshStandardMaterial color={palette.spriteCoat} transparent opacity={visibility} roughness={0.94} />
      </mesh>
      <mesh position={[0, -0.08, 0.42]}>
        <boxGeometry args={[1.18, 0.3, 0.16]} />
        <meshStandardMaterial color={palette.spriteTrim} transparent opacity={visibility} roughness={0.88} />
      </mesh>
      <mesh position={[-0.78, 0.18, 0]}>
        <boxGeometry args={[0.28, 1.2, 0.28]} />
        <meshStandardMaterial color={palette.spriteCoat} transparent opacity={visibility} roughness={0.94} />
      </mesh>
      <mesh position={[0.78, 0.18, 0]}>
        <boxGeometry args={[0.28, 1.2, 0.28]} />
        <meshStandardMaterial color={palette.spriteCoat} transparent opacity={visibility} roughness={0.94} />
      </mesh>
      <mesh position={[-0.3, -1.04, 0]}>
        <boxGeometry args={[0.34, 1.22, 0.34]} />
        <meshStandardMaterial color={palette.groundDark} transparent opacity={visibility} roughness={0.98} />
      </mesh>
      <mesh position={[0.3, -1.04, 0]}>
        <boxGeometry args={[0.34, 1.22, 0.34]} />
        <meshStandardMaterial color={palette.groundDark} transparent opacity={visibility} roughness={0.98} />
      </mesh>
      <mesh position={[1.16, 0.42, 0.16]}>
        <boxGeometry args={[0.28, 0.28, 0.28]} />
        <meshStandardMaterial
          emissive={palette.accent}
          color={palette.accent}
          emissiveIntensity={0.22 + personalShift * 0.78}
          transparent
          opacity={visibility}
        />
      </mesh>
    </group>
  )
}

function ParticleField({ palette, presentation }: { palette: ResolvedPalette; presentation: BackgroundPresentation }) {
  const pointsRef = useRef<THREE.Points>(null)
  const particles = useMemo(() => {
    const count = 120
    const positions = new Float32Array(count * 3)

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = ((index % 15) - 7) * 0.92
      positions[index * 3 + 1] = ((index * 11) % 13) * 0.36 - 0.4
      positions[index * 3 + 2] = -((index * 7) % 14) * 1.08
    }

    return positions
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) {
      return
    }

    pointsRef.current.rotation.y = state.clock.elapsedTime * (0.01 + presentation.intensity * 0.04)
    pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.14) * (0.08 + presentation.depth * 0.16)
  })

  return (
    <points ref={pointsRef} position={[0, 0.5, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.11 + presentation.depth * 0.05}
        color={palette.accent}
        transparent
        opacity={0.08 + presentation.intensity * 0.32}
        sizeAttenuation
      />
    </points>
  )
}

function WorldFallback({
  palette,
  presentation,
}: {
  palette: ResolvedPalette
  presentation: BackgroundPresentation
}) {
  const style = {
    '--sky-top': palette.skyTop,
    '--sky-bottom': palette.skyBottom,
    '--fog': palette.fog,
    '--ground': palette.ground,
    '--ground-dark': palette.groundDark,
    '--accent': palette.accent,
    '--accent-soft': palette.accentSoft,
    '--sprite-skin': palette.spriteSkin,
    '--sprite-coat': palette.spriteCoat,
    '--sprite-trim': palette.spriteTrim,
    '--phase-depth': String(presentation.depth),
    '--avatar-visibility': String(presentation.avatarVisibility),
    '--personal-visibility': String(presentation.personalVisibility),
  } as CSSProperties

  return (
    <div className={`world-fallback world-fallback--${presentation.phase}`} style={style} aria-hidden="true">
      <div className="world-fallback__sky" />
      <div className="world-fallback__sun" />
      <div className="world-fallback__terrain" />
      <div className="world-fallback__terrain world-fallback__terrain--rear" />
      <div className="world-fallback__sparkles" />
      <div className="world-fallback__avatar" role="presentation">
        {pixelPattern.map((tone, index) => (
          <span
            key={`${tone}-${index}`}
            className={`world-fallback__pixel ${tone !== 'empty' ? `world-fallback__pixel--${tone}` : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

const phasePalettes: Record<string, ResolvedPalette> = {
  atmosphere: {
    skyTop: '#091123',
    skyBottom: '#32486f',
    fog: '#5e6f96',
    ground: '#2f4852',
    groundDark: '#141e2a',
    accent: '#f0c57d',
    accentSoft: '#d98a6e',
    spriteSkin: '#d1b29a',
    spriteCoat: '#455a7d',
    spriteTrim: '#dfe9f8',
  },
  depth: {
    skyTop: '#0c1731',
    skyBottom: '#8f635e',
    fog: '#876f8d',
    ground: '#4d6d58',
    groundDark: '#203030',
    accent: '#f3c36f',
    accentSoft: '#cf8661',
    spriteSkin: '#ddb69a',
    spriteCoat: '#4f6288',
    spriteTrim: '#ecf5ff',
  },
  presence: {
    skyTop: '#0c1731',
    skyBottom: '#b36f5d',
    fog: '#aa7d83',
    ground: '#56724f',
    groundDark: '#263329',
    accent: '#f0ca73',
    accentSoft: '#ff9d68',
    spriteSkin: '#e6b98f',
    spriteCoat: '#5a6d94',
    spriteTrim: '#f2f8ff',
  },
  personal: {
    skyTop: '#102244',
    skyBottom: '#d28867',
    fog: '#c38f87',
    ground: '#5f7b4d',
    groundDark: '#29361f',
    accent: '#ffd27e',
    accentSoft: '#f0a568',
    spriteSkin: '#ebb98c',
    spriteCoat: '#516bd9',
    spriteTrim: '#fff1ce',
  },
}

const pixelPattern = [
  'empty', 'empty', 'skin', 'skin', 'skin', 'skin', 'empty', 'empty',
  'empty', 'skin', 'skin', 'skin', 'skin', 'skin', 'skin', 'empty',
  'empty', 'trim', 'trim', 'skin', 'skin', 'trim', 'trim', 'empty',
  'empty', 'coat', 'coat', 'coat', 'coat', 'coat', 'coat', 'empty',
  'empty', 'coat', 'coat', 'trim', 'trim', 'coat', 'coat', 'empty',
  'empty', 'coat', 'coat', 'coat', 'coat', 'coat', 'coat', 'empty',
  'empty', 'empty', 'coat', 'empty', 'empty', 'coat', 'empty', 'empty',
  'empty', 'ground', 'empty', 'empty', 'empty', 'empty', 'ground', 'empty',
] as const

function resolvePalette(world: VisitorWorld | null, presentation: BackgroundPresentation): ResolvedPalette {
  if (world && presentation.phase === 'personal') {
    return world.palette
  }

  if (world && presentation.personalVisibility > 0.5) {
    return world.palette
  }

  return phasePalettes[presentation.phase]
}

function supportsWebGl() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch {
    return false
  }
}
