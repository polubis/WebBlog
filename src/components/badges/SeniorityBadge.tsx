import React from "react"
import { SeniorityLevel } from "../../models/Article" // Adjust the path to match the location of your enum

type SeniorityBadgeProp = {
    level: SeniorityLevel
}
  
  export const SeniorityBadge = ({ level }: SeniorityBadgeProp) => {
    if (!level || !Object.values(SeniorityLevel).includes(SeniorityLevel[level])) {
      console.error(`Invalid seniority level: ${level}, should be one of ${Object.keys(SeniorityLevel).join(", ")}`);
      return (
        <i style={{ color: "white" }}>Author has not provided level</i>
      )
    }
    const emoji = SeniorityLevel[level];
    const label = level;
  
    return (
      <i style={{ color: "white" }}>
        {emoji} {label}
      </i>
    );
  };

