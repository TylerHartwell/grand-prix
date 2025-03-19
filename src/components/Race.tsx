"use client"

import { Player } from "@/app/page"

interface Props {
  id: string
  playerIds: number[]
  players: Player[]
}

const Race = ({ id, playerIds, players }: Props) => {
  return (
    <li key={id} className="flex b1 h-min">
      <ul className="flex flex-col">
        {playerIds.map((playerId, index) => (
          <li key={playerId} className="text-nowrap flex gap-2">
            <div className="w-[2ch] text-center">{players[playerIds[index]].carNumber}</div>
            <div>{players[playerIds[index]].name}</div>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default Race
