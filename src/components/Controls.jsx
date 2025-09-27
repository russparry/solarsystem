import React from 'react'

function Controls({ isPlaying, setIsPlaying, speed, setSpeed, currentDate, setCurrentDate }) {
  const handleRewind = () => {
    if (speed < 0) {
      setSpeed(speed * 2)
    } else {
      setSpeed(-10)
    }
    setIsPlaying(true)
  }

  const handlePlay = () => {
    setSpeed(10)
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleFastForward = () => {
    if (speed > 0) {
      setSpeed(speed * 2)
    } else {
      setSpeed(50)
    }
    setIsPlaying(true)
  }

  return (
    <div className="controls">
      <button className="control-btn" onClick={handleRewind}>
        ⏪
      </button>
      
      <button className="control-btn" onClick={handlePlay}>
        ▶️
      </button>
      
      <button className="control-btn" onClick={handlePause}>
        ⏸️
      </button>
      
      <button className="control-btn" onClick={handleFastForward}>
        ⏩
      </button>
    </div>
  )
}

export default Controls