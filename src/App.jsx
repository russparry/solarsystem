import React, { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import SolarSystem from './components/SolarSystem'
import Controls from './components/Controls'
import DateDisplay from './components/DateDisplay'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [speed, setSpeed] = useState(1)
  
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas 
        camera={{ position: [0, 50, 0], fov: 75 }}
        style={{ background: '#000000' }}
      >
        <SolarSystem 
          isPlaying={isPlaying} 
          currentDate={currentDate} 
          setCurrentDate={setCurrentDate}
          speed={speed}
        />
      </Canvas>
      
      <DateDisplay currentDate={currentDate} />
      
      <Controls 
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        speed={speed}
        setSpeed={setSpeed}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
    </div>
  )
}

export default App