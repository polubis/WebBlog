export const toHMS = (seconds: number): string => {
  let date = new Date(seconds * 1000)
  let hh = date.getUTCHours() as number | string
  let mm = date.getUTCMinutes() as number | string
  let ss = date.getSeconds() as number | string

  if (hh < 10) {
    hh = "0" + hh
  }

  if (mm < 10) {
    mm = "0" + mm
  }

  if (ss < 10) {
    ss = "0" + ss
  }

  const t = hh + ":" + mm + ":" + ss
  return t
}
