import { formatDistance } from "date-fns"

export const getDistanceFromNow = (date: Date): string => {
  const now = new Date()
  const distance = formatDistance(now, date, { includeSeconds: true })
  return distance
}
