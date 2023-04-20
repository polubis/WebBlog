export const flattenHighlighted = (input: [number | [number, number]]) => {
  const output: number[] = []
  input.forEach(item => {
    if (Array.isArray(item)) {
      //Check for invalid range
      if (item[0] > item[1]) {
        throw new Error("Invalid range")
      }
      //Check for less or equal to zero
      if (item[0] < 1 || item[1] < 1) {
        throw new Error("Less than 1 are not allowed")
      }
      for (let i = item[0]; i <= item[1]; i++) {
        output.push(i)
      }
    } else {
      //Check for less or equal to zero
      if (item[0] <= 0 || item[1] <= 0) {
        throw new Error("Less than 1 are not allowed")
      }
      output.push(item)
    }
  })
  return output
}
