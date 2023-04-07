import { formatDuration, intervalToDuration } from "date-fns"

export const formatMinutes = (value: number, short = false) => {
  const [year, month, day, hour, minute, seconds] = [2022, 6, 2, 0, 0, 0]

  const duration = intervalToDuration({
    start: new Date(year, month, day, hour, value, seconds),
    end: new Date(year, month, day, hour, minute, seconds),
  })

  const formatted = formatDuration(duration, {
    delimiter: ", ",
  })

  return short
    ? formatted
        .replace("minutes", "m")
        .replace("hours", "h")
        .replace("days", "d")
        .replace("seconds", "s")
    : formatted
}
