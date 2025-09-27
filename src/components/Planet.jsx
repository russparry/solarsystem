import React, { useMemo } from 'react'
import { Line } from '@react-three/drei'

function Planet({ name, distance, size, color, period, currentDate, orbitCenter, earthDistance, eccentricity = 0, showOrbit = true }) {
  const position = useMemo(() => {
    const daysSinceEpoch = (currentDate.getTime() - new Date(2000, 0, 1).getTime()) / (1000 * 60 * 60 * 24)
    const angle = (daysSinceEpoch / period) * 2 * Math.PI
    
    const radiusAtAngle = distance * (1 - eccentricity * Math.cos(angle))
    
    if (orbitCenter === "Earth") {
      const earthAngle = (daysSinceEpoch / 365) * 2 * Math.PI
      const earthRadius = earthDistance * (1 - 0.02 * Math.cos(earthAngle))
      const earthX = Math.cos(earthAngle) * earthRadius
      const earthZ = Math.sin(earthAngle) * earthRadius
      
      return [
        earthX + Math.cos(angle) * radiusAtAngle,
        0,
        earthZ + Math.sin(angle) * radiusAtAngle
      ]
    }
    
    return [
      Math.cos(angle) * radiusAtAngle,
      0,
      Math.sin(angle) * radiusAtAngle
    ]
  }, [currentDate, distance, period, orbitCenter, earthDistance, eccentricity])

  const orbitPoints = useMemo(() => {
    const points = []
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2
      const radiusAtAngle = distance * (1 - eccentricity * Math.cos(angle))
      
      if (orbitCenter === "Earth") {
        const currentTime = new Date()
        const daysSinceEpoch = (currentTime.getTime() - new Date(2000, 0, 1).getTime()) / (1000 * 60 * 60 * 24)
        const earthAngle = (daysSinceEpoch / 365) * 2 * Math.PI
        const earthRadius = earthDistance * (1 - 0.02 * Math.cos(earthAngle))
        const earthX = Math.cos(earthAngle) * earthRadius
        const earthZ = Math.sin(earthAngle) * earthRadius
        points.push([
          earthX + Math.cos(angle) * radiusAtAngle,
          0,
          earthZ + Math.sin(angle) * radiusAtAngle
        ])
      } else {
        points.push([
          Math.cos(angle) * radiusAtAngle,
          0,
          Math.sin(angle) * radiusAtAngle
        ])
      }
    }
    return points
  }, [distance, orbitCenter, earthDistance, eccentricity])

  return (
    <group>
      {showOrbit && (
        <Line
          points={orbitPoints}
          color="rgba(255, 255, 255, 0.4)"
          lineWidth={2}
          transparent
          opacity={0.6}
        />
      )}
      
      <mesh position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshLambertMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

export default Planet