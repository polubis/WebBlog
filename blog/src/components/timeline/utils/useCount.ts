import { TimelineData, TimelineItemsCount } from "../models";

export const useCount = (data: TimelineData): TimelineItemsCount => {
  const { top, bottom } = data.reduce<TimelineItemsCount>(
    (acc, group) => {
      const itemsLength = group.items.length;

      if (group.top) {
        acc.top = itemsLength > acc.top ? itemsLength : acc.top;
      } else {
        acc.bottom = itemsLength > acc.bottom ? itemsLength : acc.bottom;
      }

      return acc;
    },
    { top: 0, bottom: 0 } as TimelineItemsCount
  );

  return { top, bottom };
};
