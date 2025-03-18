"use client"

import Race from "@/components/Race"
import { useState } from "react"

interface Player {
  id: number
  name: string
}
const initialPlayers: Player[] = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  name: `Player ${index + 1}`
}))

function getUniquePairs(numbers: number[]): [number, number][] {
  const pairs: [number, number][] = []
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      pairs.push([numbers[i], numbers[j]])
    }
  }
  return pairs
}

const uniquePairs = getUniquePairs([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])

function containsArraywithPair(arrays: number[][], num1: number, num2: number) {
  for (let i = 0; i < arrays.length; i++) {
    if (arrays[i].includes(num1) && arrays[i].includes(num2)) {
      return true
    }
  }
  return false
}

const Home = () => {
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

  const createGroups = () => {
    const groups: number[][] = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15]
    ]

    for (let firstPairIndex = 0; firstPairIndex < uniquePairs.length - 1; firstPairIndex++) {
      const [num1, num2] = uniquePairs[firstPairIndex]
      if (containsArraywithPair(groups, num1, num2)) continue
      for (let secondPairIndex = firstPairIndex + 1; secondPairIndex < uniquePairs.length; secondPairIndex++) {
        const [num3, num4] = uniquePairs[secondPairIndex]
        if (containsArraywithPair(groups, num3, num4)) continue
        if (containsArraywithPair(groups, num1, num3)) continue
        if (containsArraywithPair(groups, num1, num4)) continue
        if (containsArraywithPair(groups, num2, num3)) continue
        if (containsArraywithPair(groups, num2, num4)) continue
        groups.push([num1, num2, num3, num4])
        break
      }
    }

    return groups
  }

  const groups = createGroups()
  const countOccurrences = (quads: number[][]): Record<number, number> => {
    const count: Record<number, number> = {}
    quads.flat().forEach(num => {
      count[num] = (count[num] || 0) + 1
    })
    return count
  }

  const count = countOccurrences(groups)

  return (
    <div className="min-h-screen b1 flex flex-col justify-center">
      <div className="b2 flex">
        <ol className="list-decimal list-outside mx-10 b3">
          {players.map(player => (
            <li key={player.id} className="flex">
              <input
                key={player.id}
                type="text"
                value={player.name}
                onChange={e => handleNameChange(player.id, e.target.value)}
                className="border rounded w-[10ch]"
              />
              <span className="b1 flex whitespace-nowrap">{count[player.id]}</span>
            </li>
          ))}
        </ol>
        <div className="grid grid-rows-4 gap-2 grid-flow-col">
          {groups.map((group, index) => (
            <Race key={`race-${index}`} id={`race-${index}`} playerIds={group} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
