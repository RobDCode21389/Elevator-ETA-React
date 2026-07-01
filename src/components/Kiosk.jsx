function Kiosk({ decks, onRequestDeck }) {
  return (
    <div className="kiosk-device">
      <div className="kiosk-screen">

        <p className="kiosk-header">Select your deck</p>

        {/* Current floor indicator - like the real kiosk */}
        <button className="current-floor-btn">
          <span className="current-floor-icon">🛗</span>
          <span className="current-floor-label">Main Gangway</span>
        </button>

        {/* Deck grid - 4 columns, arranged bottom to top like the real ship */}
        <div className="deck-grid">
          {[...decks].reverse().map(deck => (
            <button
              key={deck.number}
              className="deck-btn"
              onClick={() => onRequestDeck(deck.number)}
            >
              <span className="deck-btn-number">{deck.number}</span>
              <span className="deck-btn-name">{deck.name}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Kiosk