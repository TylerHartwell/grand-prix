const getCountsOfOccurances = (quads: number[][]): Record<number, number> => {
  const count: Record<number, number> = {}
  quads.flat().forEach(num => {
    count[num] = (count[num] || 0) + 1
  })
  return count
}

export default getCountsOfOccurances
