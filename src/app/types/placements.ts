export const placements = [1, 2, 3, 4] as const

export type Placement = (typeof placements)[number]
