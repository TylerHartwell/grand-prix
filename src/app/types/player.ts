import { PlayerRace } from "./playerRace"

export interface Player {
  id: number
  carNumber: string
  name: string
  races: PlayerRace[]
}
