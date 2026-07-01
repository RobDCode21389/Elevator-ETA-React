# Elevator ETA — Destination Dispatch Simulation

A React simulation of Royal Caribbean's KONE Destination Dispatch elevator system, 
as seen on Icon of the Seas and Utopia of the Seas.

## 🚀 Live Demo
[View Live Demo](https://elevatorreactetasimulator.netlify.app/)

## 📸 About
This project is a React rebuild of my original vanilla JavaScript Elevator ETA 
Simulation. The original version used Math.random() to generate wait times — 
a stateless approach with no memory between requests. This version replaces that 
entirely with a direction-aware dispatch algorithm modeled after how Royal 
Caribbean's real system actually works.

## ⚡ How It Works
1. Guest selects a destination deck from the kiosk touchscreen
2. The dispatch algorithm evaluates all three elevators (A, B, C) based on:
   - Current position and direction of travel
   - Existing destination queue
   - Whether the requested deck is on the elevator's current path
3. The closest qualified elevator gets assigned
4. ETA is calculated using real-time peak-hour multipliers based on 
   actual cruise ship traffic research
5. A live countdown displays the arrival time
6. When the trip completes, the elevator's position and status 
   update in state — ready for the next request

## 🧠 The Core Problem with Math.random()
The original vanilla JS version had no memory between requests. 
Math.random() is stateless — it can't recall where an elevator physically 
is or what it's already committed to. Every call is a fresh, isolated dice 
roll with zero connection to anything that happened before it.

The React rebuild replaces this with actual stateful elevator objects that 
persist and update over time — each with a current deck position, a 
destination queue, and a status that reflects real-world dispatch behavior.

## 📊 Peak Hour Traffic System
ETA calculations use real cruise ship traffic research across 12 time windows:

| Time Window | Label | Traffic Level |
|-------------|-------|---------------|
| 7:00 - 8:00 AM | Early Morning | Low |
| 8:00 - 9:00 AM | Breakfast Rush | Medium |
| 9:30 - 11:30 AM | Late Morning | Medium (Sea) / Low (Port) |
| 11:30 AM - 1:00 PM | Lunch Rush | Medium |
| 1:00 - 4:00 PM | Peak Pool Hours | High (Sea) / Low (Port) |
| 4:00 - 5:00 PM | Afternoon Wind-Down | Medium |
| 5:00 - 6:15 PM | Pre-Dinner Transition | Medium |
| 6:15 - 8:30 PM | Dinner & Show Rush | High |
| 8:30 - 9:00 PM | Seating Changeover | Medium |
| 9:00 - 11:30 PM | Evening Entertainment | Medium |
| 11:30 PM - 1:30 AM | Late-Night Surge | High |
| 1:30 - 2:00 AM | Late Night Wind-Down | Low |

## 🛠️ Built With
- React
- Vite
- CSS
- Custom dispatch algorithm (no external libraries)

## ⚙️ React Concepts Used
- useState for elevator fleet state management
- useEffect with setInterval for live countdown timer
- Cleanup functions to prevent ghost timers
- Spread operator for immutable state updates
- Props and callback props for component communication
- Conditional rendering for screen transitions

## 🏗️ Architecture
