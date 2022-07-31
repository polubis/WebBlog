import { ReactElement } from "react";
import { TimelineData, TimelineDataGroup, TimelineGroupItem } from "./data";
import { TimelineSetup, TimelineItemsCount } from "./setup";

export interface TimelineProps {
  data: TimelineData;
  setup?: TimelineSetup;
}

export interface ContainerProps {
  children: ReactElement;
  count: TimelineItemsCount;
  setup: TimelineSetup;
}

export interface LineXProps {
  children: ReactElement[];
  setup: TimelineSetup;
  count: TimelineItemsCount;
  data: TimelineData;
}

export interface LineYProps {
  groupIdx: number;
  group: TimelineDataGroup;
  setup: TimelineSetup;
}

export interface MarkerProps {
  groupIdx: number;
  setup: TimelineSetup;
}

export interface EdgeMarkerProps extends MarkerProps {
  group: TimelineDataGroup;
}

export interface GroupItemProps {
  groupIdx: number;
  group: TimelineDataGroup;
  setup: TimelineSetup;
  itemIdx: number;
  item: TimelineGroupItem;
}
