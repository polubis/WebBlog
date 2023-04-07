export interface TimelineGroupItem {
  avatar: {
    aspectRatio: number
    base64: string
    sizes: string
    src: string
    srcSet: string
  }
  title: string
  url: string
}

export interface TimelineDataGroup {
  date: string
  top: boolean
  displayed: boolean
  blank: boolean
  empty: boolean
  items: TimelineGroupItem[]
}

export type TimelineData = TimelineDataGroup[]
