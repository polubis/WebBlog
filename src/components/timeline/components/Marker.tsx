import { format } from "date-fns";
import {
  EdgeMarkerProps,
  MarkerProps,
  TimelineSetup,
} from "../models";
import { CSSProperties } from "react";
import React from "react"

const baseStyle: CSSProperties = {
  background: "#ffd200",
  borderColor: "#000",
  borderStyle: "solid",
  borderRadius: "50%",
  position: "absolute",
  left: 0,
  transition: "0.3s transform ease-in-out",
};

const getLeft = (groupIdx: number, setup: TimelineSetup): number =>
  groupIdx * (setup.marker.gap + setup.marker.size);

export const MidMarker = ({ groupIdx, setup }: MarkerProps) => {
  return (
    <div
      style={{
        ...baseStyle,
        height: setup.marker.size,
        borderWidth: setup.lineY.width,
        width: setup.marker.size,
        transform: `translate(${getLeft(groupIdx, setup)}px, 0px)`,
      }}
    />
  );
};

export const EdgeMarker = ({ groupIdx, group, setup }: EdgeMarkerProps) => {
  const left = getLeft(groupIdx, setup);
  const height =
    setup.group.padding * 2 +
    setup.item.height * group.items.length +
    setup.item.gap * (group.items.length - 1);

  const top = group.top
    ? -1 * (height + setup.marker.size)
    : height + setup.marker.size;

  return (
    <div
      style={{
        ...baseStyle,
        height: setup.marker.size,
        borderWidth: setup.lineY.width,
        width: setup.marker.size,
        display: "flex",
        alignItems: "center",
        transform: `translate(${left}px, ${top}px)`,
      }}
    >
      {group.empty || (
        <span
          style={{
            fontSize: "20px",
            fontFamily: "Lexend, sans-serif",
            fontWeight: "bold",
            color: '#fff',
            paddingLeft: `${
              setup.marker.size / 2 +
              setup.item.height / 2 +
              setup.marker.size / 2
            }px`,
          }}
        >
          {format(group.date, "dd/MM/yyyy")}
        </span>
      )}
    </div>
  );
};
