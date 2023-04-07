import {
  LineXProps,
  TimelineItemsCount,
  TimelineSetup,
} from "../models";
import React from "react"

const getTop = (setup: TimelineSetup, count: TimelineItemsCount): number => {
  if (count.top === 0) {
    return 0;
  }

  return (
    setup.marker.size +
    setup.group.padding * 2 +
    setup.item.height * count.top +
    setup.item.gap * (count.top - 1)
  );
};

const getWidth = (length: number, setup: TimelineSetup): number => {
  const lineXWidth =
    length * setup.marker.size + (length - 1) * setup.marker.gap;

  if (lineXWidth < 0) {
    return 0;
  }

  return lineXWidth;
};

export const LineX = ({ children, setup, count, data }: LineXProps) => {
  const top = getTop(setup, count);
  const width = getWidth(data.length, setup);

  return (
    <div
      style={{
        height: setup.marker.size,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        left: 0,
        right: 0,
        transform: `translate(0px, ${top}px)`,
        width,
      }}
    >
      <div
        style={{
          height: setup.lineX.height,
          width: "100%",
          background: "#fff",
        }}
      />
      {children}
    </div>
  );
};
