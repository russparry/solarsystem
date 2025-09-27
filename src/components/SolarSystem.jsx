import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import Planet from './Planet'

const PLANETS = [
  { name: 'Mercury', distance: 3, size: 0.4, color: '#FFFF00', period: 88, eccentricity: 0.21 },
  { name: 'Venus', distance: 5, size: 0.9, color: '#FF8C00', period: 225, eccentricity: 0.01 },
  { name: 'Earth', distance: 7, size: 1, color: '#00FFFF', period: 365, eccentricity: 0.02 },
  { name: 'Mars', distance: 10, size: 0.5, color: '#FF0000', period: 687, eccentricity: 0.09 },
  { name: 'Jupiter', distance: 15, size: 2.5, color: '#FFD700', period: 4333, eccentricity: 0.05 },
  { name: 'Saturn', distance: 20, size: 2, color: '#FFA500', period: 10759, eccentricity: 0.06 },
  { name: 'Uranus', distance: 25, size: 1.5, color: '#00FF7F', period: 30687, eccentricity: 0.05 },
  { name: 'Neptune', distance: 30, size: 1.4, color: '#0080FF', period: 60190, eccentricity: 0.01 },
  { name: 'Pluto', distance: 35, size: 0.3, color: '#FF69B4', period: 90560, eccentricity: 0.25 }
]

function SolarSystem({ isPlaying, currentDate, setCurrentDate, speed }) {
  const systemRef = useRef()
  
  useFrame((state, delta) => {
    if (isPlaying) {
      const timeIncrement = delta * speed * 7 * 24 * 60 * 60 * 1000
      setCurrentDate(prev => new Date(prev.getTime() + timeIncrement))
    }
  })

  return (
    <group ref={systemRef}>
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
      />
      
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 0, 0]} intensity={3} />
      
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshLambertMaterial color="#FDB813" emissive="#FDB813" emissiveIntensity={0.5} />
      </mesh>
      
      {PLANETS.map((planet, index) => (
        <Planet
          key={planet.name}
          {...planet}
          currentDate={currentDate}
        />
      ))}
      
      <Planet
        name="Moon"
        distance={1.5}
        size={0.3}
        color="#FFFFFF"
        period={27.3}
        currentDate={currentDate}
        orbitCenter="Earth"
        earthDistance={7}
        eccentricity={0.05}
        showOrbit={false}
      />
    </group>
  )
}

export default SolarSystem