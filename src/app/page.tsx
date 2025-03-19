"use client"

import Race from "@/components/Race"
import createGroups from "@/utils/createGroups"
// import getCountsOfOccurances from "@/utils/getCountsOfOccurances"
import { useState } from "react"

export interface Player {
  id: number
  carNumber: string
  name: string
  raceIds: string[]
  laneColors: LaneColor[]
  placements: Placement[]
}

type LaneColor = "red" | "yellow" | "green" | "blue"
type Placement = 1 | 2 | 3 | 4

const initialPlayers: Player[] = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  carNumber: `${index + 1}`,
  name: `Player ${index + 1}`,
  raceIds: [],
  laneColors: [],
  placements: []
}))

const Home = () => {
  const [groups] = useState<number[][]>(() => createGroups())
  const [players, setPlayers] = useState<Player[]>(initialPlayers)

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
    <div className="min-h-screen b1 flex flex-col justify-center">
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
                    <div className="bg-red-500 text-center size-6 border">1</div>
                    <div className="bg-green-500 text-center size-6 border">2</div>
                    <div className="bg-blue-500 text-center size-6 border">3</div>
                    <div className="bg-yellow-500 text-center size-6 border">4</div>
                    <div className="bg-blue-500 text-center size-6 border"></div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid grid-rows-4 gap-5 grid-flow-col b1 w-min">
          {groups.map((group, index) => (
            <Race key={`race-${index}`} id={`race-${index + 1}`} playerIds={group} players={players} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
