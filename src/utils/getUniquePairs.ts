export default function getUniquePairs(numbers: number[]): [number, number][] {
  const pairs: [number, number][] = []
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      pairs.push([numbers[i], numbers[j]])
    }
  }
  return pairs
}
