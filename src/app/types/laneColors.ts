export const laneColors = ["red", "blue", "green", "yellow"] as const

export type LaneColor = (typeof laneColors)[number]
