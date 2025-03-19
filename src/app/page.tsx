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
  laneColor: LaneColor
  placement?: Placement
}

export interface Player {
  id: number
  carNumber: string
  name: string
  races: PlayerRace[]
}

export const laneColorMap = {
  red: "bg-red-500",
  blue: "bg-blue-400",
  green: "bg-green-500",
  yellow: "bg-yellow-300"
}

export const laneColors = ["red", "blue", "green", "yellow"] as const
export const placements = [1, 2, 3, 4] as const

export type LaneColor = (typeof laneColors)[number]
export type Placement = (typeof placements)[number]

function getOccurrences(arr: number[][], target: number) {
  const indices: number[] = []

  arr.forEach((subArray, index) => {
    if (subArray.includes(target)) {
      indices.push(index)
    }
  })

  return indices
}

const groups = createGroups()

const raceLanes = [
  [0, 0, 1, 2, 3],
  [1, 3, 3, 0, 2],
  [2, 3, 1, 0, 0],
  [3, 1, 2, 2, 0],
  [0, 1, 2, 1, 3],
  [1, 2, 0, 3, 3],
  [2, 3, 1, 0, 1],
  [3, 1, 3, 2, 0],
  [0, 2, 0, 1, 3],
  [1, 0, 2, 3, 0],
  [2, 0, 3, 1, 1],
  [3, 1, 0, 3, 2],
  [0, 3, 2, 1, 2],
  [1, 2, 3, 0, 2],
  [2, 0, 1, 3, 1],
  [3, 2, 0, 2, 1]
]

const initialPlayers: Player[] = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  carNumber: `${index + 1}`,
  name: `Player ${index + 1}`,
  races: getOccurrences(groups, index).map((raceId, playerRaceId) => {
    return {
      raceId: raceId,
      laneColor: laneColors[raceLanes[index][playerRaceId]]
    }
  })
}))

const Home = () => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers)

  const getPlacement = (playerId: number, raceId: number): Placement | undefined => {
    const player = players.find(p => p.id === playerId)
    if (!player) return undefined

    const race = player.races.find(r => r.raceId === raceId)
    return race?.placement
  }

  const handlePlacementChange = (playerId: number, raceId: number, newPlacement: Placement) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player => {
        if (player.id === playerId) {
          return {
            ...player,
            races: player.races.map(race => (race.raceId === raceId ? { ...race, placement: newPlacement } : race))
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
    <div className="min-h-screen flex flex-col justify-center w-min">
      <div className="flex gap-5 items-center">
        <div className="w-min">
          <ol className="flex flex-col gap-1 items-center justify-center">
            {players.map(player => (
              <li key={player.id} className="flex h-[2em] items-center">
                <div className="flex items-center justify-center gap-1">
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
                  <div className="flex">
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

        <ol className="grid grid-rows-4 gap-5 grid-flow-col w-min">
          {groups.map((group, index) => (
            <Race
              key={`race-${index}`}
              id={index}
              playerIds={group}
              players={players}
              getPlacement={getPlacement}
              handlePlacementChange={handlePlacementChange}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Home
