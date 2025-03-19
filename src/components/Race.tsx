"use client"

import { LaneColor, laneColorMap, Placement, placements, Player } from "@/app/page"
import clsx from "clsx"

interface Props {
  id: number
  playerIds: number[]
  players: Player[]
  getPlacement: (playerId: number, raceId: number) => Placement | undefined
  handlePlacementChange: (playerId: number, raceId: number, newPlacement: Placement) => void
  getLaneColor: (playerId: number, raceId: number) => LaneColor | undefined
  handleLaneColorChange: (playerId: number, raceId: number, newColor: LaneColor) => void
}

const Race = ({ id, playerIds, players, getPlacement, handlePlacementChange, getLaneColor, handleLaneColorChange }: Props) => {
  return (
    <li key={id} className="flex b1 h-min">
      <ul className="flex flex-col">
        {playerIds.map(playerId => {
          const currentPlayer = players[playerId]

          return (
            <li key={playerId} className="text-nowrap flex gap-2">
              <div className="w-[2ch] text-center">{currentPlayer.carNumber}</div>
              <div className="b3 flex">
                {Array.from({ length: 5 }).map((_, arrIndex) => {
                  const playerRace = currentPlayer.races[arrIndex]
                  return (
                    <div key={arrIndex} className={clsx("text-center size-6 border", playerRace?.laneColor && laneColorMap[playerRace?.laneColor])}>
                      {playerRace?.placement}
                    </div>
                  )
                })}
              </div>
              <select
                name="laneColor"
                value={getLaneColor(currentPlayer.id, id)}
                onChange={e => handleLaneColorChange(currentPlayer.id, id, e.target.value as LaneColor)}
              >
                {!currentPlayer.races.some(race => race.raceId === id && race.laneColor) && <option value={"color"}>color</option>}
                <option value={"red"}>Red</option>
                <option value={"blue"}>Blue</option>
                <option value={"green"}>Green</option>
                <option value={"yellow"}>Yellow</option>
              </select>
              <select
                name="placement"
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
