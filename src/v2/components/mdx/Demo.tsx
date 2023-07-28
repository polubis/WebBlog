import React, { ReactNode } from "react"
import { useIsVisible } from "../../../utils/useIsVisible"
import { XL } from "../../../ui"
import Section from "../../../components/article/Section"

const Demo = ({
  children,
  label,
  height,
}: {
  children: ReactNode
  label: string
  height: string
}) => {
  const { ref, isVisible } = useIsVisible({ useOnce: true })

  return (
    <div ref={ref}>
      <Section>
        <XL>{label}</XL>
        <div
          style={{
            height,
            width: "100%",
            background: isVisible ? undefined : "#191919",
          }}
        >
          {isVisible && children}
        </div>
      </Section>
    </div>
  )
}

export { Demo }
