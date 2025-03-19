"use client"

import Race from "@/components/Race"
import createGroups from "@/utils/createGroups"
import clsx from "clsx"
// import getCountsOfOccurances from "@/utils/getCountsOfOccurances"
import { useState } from "react"

// interface Race {
//   raceId: number
//   playerIds: number[]
// }

export interface PlayerRace {
  raceId: number
  laneColor?: LaneColor
  placement?: Placement
}

export interface Player {
  id: number
  carNumber: string
  name: string
  races: PlayerRace[]
}

const laneColorMap = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500"
}

export const laneColors = ["red", "yellow", "green", "blue"] as const
export const placements = [1, 2, 3, 4] as const

export type LaneColor = (typeof laneColors)[number]
export type Placement = (typeof placements)[number]

const initialPlayers: Player[] = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  carNumber: `${index + 1}`,
  name: `Player ${index + 1}`,
  races: []
}))

const Home = () => {
  const [groups] = useState<number[][]>(() => createGroups())
  const [players, setPlayers] = useState<Player[]>(initialPlayers)

  const getPlacement = (playerId: number, raceId: number): Placement | undefined => {
    const player = players.find(p => p.id === playerId)
    if (!player) return undefined

    const race = player.races.find(r => r.raceId === raceId)
    return race?.placement
  }
  const getLaneColor = (playerId: number, raceId: number): LaneColor | undefined => {
    const player = players.find(p => p.id === playerId)
    if (!player) return undefined

    const race = player.races.find(r => r.raceId === raceId)
    return race?.laneColor
  }

  const handlePlacementChange = (playerId: number, raceId: number, newPlacement: Placement) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player => {
        if (player.id === playerId) {
          const raceExists = player.races.some(race => race.raceId === raceId)

          return {
            ...player,
            races: raceExists
              ? player.races.map(race => (race.raceId === raceId ? { ...race, placement: newPlacement } : race))
              : [...player.races, { raceId, placement: newPlacement }]
          }
        }
        return player
      })
    )
  }
  const handleLaneColorChange = (playerId: number, raceId: number, newColor: LaneColor) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player => {
        if (player.id === playerId) {
          const raceExists = player.races.some(race => race.raceId === raceId)

          return {
            ...player,
            races: raceExists
              ? player.races.map(race => (race.raceId === raceId ? { ...race, laneColor: newColor } : race))
              : [...player.races, { raceId, laneColor: newColor }]
          }
        }
        return player
      })
    )
  }

  const handleNameChange = (id: number, newName: string) => {
    const updatedPlayers = players.map(player => {
      if (player.id === id) {
        return {
          ...player,
          name: newName
        }
      }
      return player
    })

    setPlayers(updatedPlayers)
  }

  const handleCarNumberChange = (id: number, newCarNumber: string) => {
    const updatedPlayers = players.map(player => {
      if (player.id === id) {
        return {
          ...player,
          carNumber: newCarNumber
        }
      }
      return player
    })

    setPlayers(updatedPlayers)
  }

  // const counts = getCountsOfOccurances(groups)

  return (
    <div className="min-h-screen b1 flex flex-col justify-center w-min">
      <div className="b2 flex gap-5">
        <div className="b1 w-min">
          <ol className="flex flex-col gap-1 b3">
            {players.map(player => (
              <li key={player.id} className=" border h-[2em]">
                <div className="flex">
                  <input
                    key={player.id + "carNumber"}
                    type="text"
                    value={player.carNumber}
                    onChange={e => handleCarNumberChange(player.id, e.target.value)}
                    className="border rounded w-[3ch] text-center"
                  />
                  <input
                    key={player.id + "name"}
                    type="text"
                    value={player.name}
                    onChange={e => handleNameChange(player.id, e.target.value)}
                    className="border rounded w-[10ch]"
                  />
                  <div className="b3 flex">
                    {Array.from({ length: 5 }).map((_, arrIndex) => {
                      const playerRace = player.races[arrIndex]
                      return (
                        <div
                          key={arrIndex}
                          className={clsx("text-center size-6 border", playerRace?.laneColor && laneColorMap[playerRace?.laneColor])}
                        >
                          {playerRace?.placement}
                        </div>
                      )
                    })}
                  </div>
                  <div className="text-center w-6 border ml-2">
                    {player.races.reduce((acc, race) => {
                      if (race.placement) {
                        return acc + (4 - race.placement)
                      }
                      return acc
                    }, 0)}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid grid-rows-4 gap-5 grid-flow-col b1 w-min">
          {groups.map((group, index) => (
            <Race
              key={`race-${index}`}
              id={index}
              playerIds={group}
              players={players}
              getPlacement={getPlacement}
              handlePlacementChange={handlePlacementChange}
              getLaneColor={getLaneColor}
              handleLaneColorChange={handleLaneColorChange}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
