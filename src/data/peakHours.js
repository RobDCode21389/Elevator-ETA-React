// Each window has a sea-day level and a port-day level, since they often differ
export const peakHours = [
  { startHour: 7,    endHour: 8,    label: "Early Morning",        sea: "low",      port: "low" },
  { startHour: 8,    endHour: 9,    label: "Breakfast Rush",       sea: "medium",   port: "medium" },
  { startHour: 9.5,  endHour: 11.5, label: "Late Morning",         sea: "medium",   port: "low" },
  { startHour: 11.5, endHour: 13,   label: "Lunch Rush",           sea: "medium",   port: "medium" },
  { startHour: 13,   endHour: 16,   label: "Peak Pool Hours",      sea: "high",     port: "low" },
  { startHour: 16,   endHour: 17,   label: "Afternoon Wind-Down",  sea: "medium",   port: "medium" },
  { startHour: 17,   endHour: 18.25,label: "Pre-Dinner Transition",sea: "medium",   port: "medium" },
  { startHour: 18.25,endHour: 20.5, label: "Dinner & Show Rush",   sea: "high",     port: "high" },
  { startHour: 20.5, endHour: 21,   label: "Seating Changeover",   sea: "medium",   port: "medium" },
  { startHour: 21,   endHour: 23.5, label: "Evening Entertainment",sea: "medium",   port: "medium" },
  { startHour: 23.5, endHour: 25.5, label: "Late-Night Surge",     sea: "high",     port: "high" }, // 25.5 = 1:30am next day
  { startHour: 25.5, endHour: 26,   label: "Late Night Wind-Down", sea: "low",      port: "low" },
]

// Separate lookup: what multiplier does each busy LEVEL actually apply?
export const busyMultipliers = {
  low: 1.0,
  medium: 1.4,
  high: 1.85,
}