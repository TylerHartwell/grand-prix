import containsArraywithPair from "./containsArrayWithPair"
import getUniquePairs from "./getUniquePairs"

const createGroups = () => {
  const uniquePairs = getUniquePairs([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])

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

export default createGroups
