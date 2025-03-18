"use client"

interface Props {
  id: string
  playerIds: number[]
}

const Race = ({ id, playerIds }: Props) => {
  return (
    <li key={id} className="flex b1 h-min">
      <ul className="flex flex-col">
        <li key={0}>{playerIds[0]}</li>
        <li key={1}>{playerIds[1]}</li>
        <li key={2}>{playerIds[2]}</li>
        <li key={3}>{playerIds[3]}</li>
      </ul>
    </li>
  )
}

export default Race
