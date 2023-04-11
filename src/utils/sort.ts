export const sort = <T extends Record<string, any>>(
  items: T[],
  key: keyof T
): T[] => {
  return items.sort((a, b) => {
    if (a[key] > b[key]) return 1
    if (a[key] === b[key]) return 0
    return -1
  })
}
