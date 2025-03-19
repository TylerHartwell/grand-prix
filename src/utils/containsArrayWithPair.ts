export default function containsArraywithPair(arrays: number[][], num1: number, num2: number) {
  for (let i = 0; i < arrays.length; i++) {
    if (arrays[i].includes(num1) && arrays[i].includes(num2)) {
      return true
    }
  }
  return false
}
