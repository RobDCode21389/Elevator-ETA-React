import { useState } from 'react'
import { decks } from './data/decks'
import { peakHours, busyMultipliers } from './data/peakHours'
import { assignElevator } from './logic/assignmentElevator'
import Kiosk from './components/Kiosk'
import AssignmentScreen from './components/AssignmentScreen'
import './App.css' // Direct link to your updated wide-screen styles

function App() {

  const [elevators, setElevators] = useState([
    { letter: 'A', currentDeck: 5, destinationDecks: [], status: 'idle' },
    { letter: 'B', currentDeck: 11, destinationDecks: [], status: 'idle' },
    { letter: 'C', currentDeck: 8, destinationDecks: [], status: 'idle' },
  ])

  const [view, setView] = useState('kiosk')
  const [assignedElevator, setAssignedElevator] = useState(null)
  const [userEtaSeconds, setUserEtaSeconds] = useState(0)
  const [requestedDeckState, setRequestedDeckState] = useState(null)

  // Figures out the current busy multiplier based on real time and a sea/port toggle later
  const getCurrentMultiplier = () => {
    const now = new Date()
    const currentHour = now.getHours() + (now.getMinutes() / 60)

    const matchingWindow = peakHours.find(window => 
      currentHour >= window.startHour && currentHour < window.endHour
    )

    if (!matchingWindow) {
      return busyMultipliers.low // default fallback if nothing matches
    }

    const level = matchingWindow.sea // hardcoded to sea day for now
    return busyMultipliers[level]
  }

  // This is the function Kiosk.jsx will call when the user picks a deck
  const handleDeckRequest = (requestedDeck) => {
    
    // STEP 1 - figure out WHICH elevator
    const chosen = assignElevator(requestedDeck, elevators)

    // STEP 2 - figure out HOW LONG it will take
    const baseSecondsPerDeck = 4
    const distance = Math.abs(chosen.currentDeck - requestedDeck)
    const multiplier = getCurrentMultiplier()
    const etaSeconds = Math.round(distance * baseSecondsPerDeck * multiplier)

    // STEP 3 - update that elevator's memory with the new stop
    const updatedElevators = elevators.map(elevator => {
      if (elevator.letter === chosen.letter) {
        return {
          ...elevator,
          destinationDecks: [...elevator.destinationDecks, requestedDeck],
          status: 'moving'
        }
      }
      return elevator
    })

    // STEP 4 - save everything and switch screens
    console.log(updatedElevators)

    setElevators(updatedElevators)
    setAssignedElevator(chosen.letter)
    setUserEtaSeconds(etaSeconds)
    setRequestedDeckState(requestedDeck)
    setView('assignment')
  }

  const handleTripComplete = () => {
    const updatedElevators = elevators.map(elevator => {
      if (elevator.letter === assignedElevator) {
        return {
          ...elevator,
          currentDeck: requestedDeckState,
          destinationDecks: [],
          status: 'idle'
        }
      }
      return elevator
    })

    setElevators(updatedElevators)
    setView('kiosk')
  }

  return (
    <div className="web-app-window">
      <main className="main-display-panel">
        
        {/* VIEW 1: THE INPUT KEYPAD KIOSK */}
        {view === 'kiosk' && (
          <div className="view-slide-fade" key="kiosk-view">
            <Kiosk decks={decks} onRequestDeck={handleDeckRequest} />
          </div>
        )}

        {/* VIEW 2: THE CONFIRMATION & LIVE COUNTDOWN */}
        {view === 'assignment' && (
          <div className="view-slide-fade" key="assignment-view">
            <AssignmentScreen
              elevatorLetter={assignedElevator}
              etaSeconds={userEtaSeconds}
              requestedDeck={requestedDeckState}
              onDone={handleTripComplete}
            />
          </div>
        )}

      </main>
    </div>
  )
}

export default App;