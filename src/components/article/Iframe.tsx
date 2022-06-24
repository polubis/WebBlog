import React from "react"

export interface IframeProps {
  src: string
  title: string
}

export const Iframe = ({ src, title }: IframeProps) => {
  return (
    <iframe
      src={src}
      style={{
        width: "100%",
        height: "500px;",
        border: 0,
        borderRadius: "4px",
        overflow: "hidden",
      }}
      title={title}
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  )
}
