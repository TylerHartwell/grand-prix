import { LaneColor } from "./laneColors"
import { Placement } from "./placements"

export interface PlayerRace {
  raceId: number
  laneColor: LaneColor
  placement?: Placement
}
