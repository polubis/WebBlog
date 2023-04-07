import { ContainerProps, TimelineSetup } from "../models";
import React from "react"

const getHalfHeight = (setup: TimelineSetup, value: number): number => {
  let total = 0;

  if (value > 0) {
    total += setup.marker.size;
    total += setup.group.padding * 2;
    total += setup.item.height * value;
    total += setup.item.gap * (value - 1);
  }

  return total;
};

export const Container = ({ children, setup, count }: ContainerProps) => {
  const height =
    getHalfHeight(setup, count.top) + // Top space
    setup.marker.size + // Mid space
    getHalfHeight(setup, count.bottom); // Bottom space

  return (
    <div style={{ padding: setup.padding, overflowX: "auto" }}>
      <div style={{ height, position: "relative" }}>{children}</div>
    </div>
  );
};
