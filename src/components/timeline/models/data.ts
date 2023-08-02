import { FixedObject } from "../../../v2/core/models"

export interface TimelineGroupItem {
  avatar: FixedObject
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
