export const getRateColor = (value: number): string => {
  const position = (value - 1) / 9

  const red = Math.floor(255 * (1 - position))
  const green = Math.floor(255 * position)
  const blue = 0

  const color = `rgb(${red}, ${green}, ${blue})`

  return color
}
