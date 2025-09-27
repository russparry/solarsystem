import React from 'react'

function DateDisplay({ currentDate }) {
  const formatDate = (date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    
    return `${months[date.getMonth()]} ${date.getFullYear()}`
  }

  return (
    <div className="date-display">
      {formatDate(currentDate)}
    </div>
  )
}

export default DateDisplay