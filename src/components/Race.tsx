"use client"

import { laneColors } from "@/app/types/laneColors"
import { Placement, placements } from "@/app/types/placements"
import { Player } from "@/app/types/player"
import clsx from "clsx"

interface Props {
  id: number
  playerIds: number[]
  players: Player[]
  getPlacement: (playerId: number, raceId: number) => Placement | undefined
  handlePlacementChange: (playerId: number, raceId: number, newPlacement: Placement) => void
  isPlacementEditDisabled: boolean
}

const laneColorMap = {
  red: "bg-red-500",
  blue: "bg-blue-400",
  green: "bg-green-500",
  yellow: "bg-yellow-300"
}

const Race = ({ id, playerIds, players, getPlacement, handlePlacementChange, isPlacementEditDisabled }: Props) => {
  return (
    <li key={id} className="flex relative border h-min">
      <span className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-nowrap">Race {id + 1}.</span>
      <ul className="flex flex-col">
        {playerIds
          .sort((a, b) => {
            const playerARace = players[a].races[Math.floor(id / 4)]
            const playerBRace = players[b].races[Math.floor(id / 4)]

            // Sort by the laneColor index
            return laneColors.indexOf(playerARace.laneColor) - laneColors.indexOf(playerBRace.laneColor)
          })
          .map(playerId => {
            const currentPlayer = players[playerId]
            const playerRace = currentPlayer.races[Math.floor(id / 4)]

            return (
              <li key={playerId} className="text-nowrap flex gap-2">
                <div className="w-[2ch] text-center">{currentPlayer.carNumber}</div>
                <div className="flex">
                  <div className={clsx("text-center size-6 border", laneColorMap[playerRace.laneColor])}>{playerRace?.placement}</div>
                </div>
                <select
                  name="placement"
                  disabled={isPlacementEditDisabled}
                  value={getPlacement(currentPlayer.id, id)}
                  onChange={e => handlePlacementChange(currentPlayer.id, id, parseInt(e.target.value) as Placement)}
                >
                  {!currentPlayer.races.some(race => race.raceId === id && race.placement) && <option value={"place"}>place</option>}
                  <option value={placements[0].toString()}>1st</option>
                  <option value={placements[1].toString()}>2nd</option>
                  <option value={placements[2].toString()}>3rd</option>
                  <option value={placements[3].toString()}>4th</option>
                </select>
              </li>
            )
          })}
      </ul>
    </li>
  )
}

export default Race
