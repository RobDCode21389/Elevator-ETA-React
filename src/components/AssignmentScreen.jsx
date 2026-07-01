import { useState, useEffect } from 'react'

function AssignmentScreen({ elevatorLetter, etaSeconds, requestedDeck, onDone }) {
  const [secondsLeft, setSecondsLeft] = useState(etaSeconds)

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="kiosk-device">
      <div className="kiosk-screen assignment-screen">

        {/* Big white card with elevator letter */}
        <div className="elevator-card">
          <button className="elevator-card-close" onClick={onDone}>✕</button>
          <span className="elevator-letter">{elevatorLetter}</span>
        </div>

        {/* Elevator to deck label */}
        <p className="assignment-label">Elevator to Deck</p>
        <p className="assignment-deck-number">{requestedDeck}</p>

        {/* ETA Countdown */}
        <p className="eta-display">Arriving in</p>
        <p className="eta-countdown">{secondsLeft}s</p>

        {/* Done button appears when countdown hits zero */}
        {secondsLeft === 0 && (
          <button className="done-btn" onClick={onDone}>
            Board Elevator
          </button>
        )}

      </div>

      {/* Physical bezel button */}
      <div className="bezel-button">
        <div className="bezel-button-icon"></div>
      </div>
    </div>
  )
}

export default AssignmentScreen