// assignElevator.js

export function assignElevator(requestedDeck, elevators) {

  // STEP 1 & 2 - find elevators that are idle OR already heading the right direction
  const candidates = elevators.filter(elevator => {
    
    if (elevator.status === 'idle') {
      return true
    }

    // Check if requestedDeck is between currentDeck and the elevator's next destination
    const nextStop = elevator.destinationDecks[0]
    
    if (nextStop === undefined) {
      return false
    }

    const goingUp = nextStop > elevator.currentDeck
    const deckIsOnTheWayUp = goingUp && requestedDeck > elevator.currentDeck && requestedDeck <= nextStop
    const deckIsOnTheWayDown = !goingUp && requestedDeck < elevator.currentDeck && requestedDeck >= nextStop

    return deckIsOnTheWayUp || deckIsOnTheWayDown
  })

  // STEP 3 & 4 - if we found candidates, pick the closest one
  if (candidates.length > 0) {
    const closest = candidates.reduce((best, current) => {
      const bestDistance = Math.abs(best.currentDeck - requestedDeck)
      const currentDistance = Math.abs(current.currentDeck - requestedDeck)
      return currentDistance < bestDistance ? current : best
    })

    return closest
  }

  // STEP 5 - fallback tier - nothing qualifies, pick whoever has the fewest stops queued
  const fallback = elevators.reduce((best, current) => {
    return current.destinationDecks.length < best.destinationDecks.length ? current : best
  })

  return fallback
}