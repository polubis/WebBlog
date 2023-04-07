export interface TimlineMarkerSetup {
  size: number;
  gap: number;
}

export interface TimelineItemSetup {
  height: number;
  gap: number;
  width: number;
}

export interface TimelineLineXSetup {
  height: number;
}

export interface TimelineLineYSetup {
  width: number;
}

export interface TimelineGroupSetup {
  padding: number;
}

export interface TimelineSetup {
  marker: TimlineMarkerSetup;
  item: TimelineItemSetup;
  padding: string;
  lineX: TimelineLineXSetup;
  lineY: TimelineLineYSetup;
  group: TimelineGroupSetup;
}

export interface TimelineItemsCount {
  top: number;
  bottom: number;
}
