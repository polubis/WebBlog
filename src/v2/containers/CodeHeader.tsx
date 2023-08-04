import React from "react"
import styled from "styled-components"
import { pre_config } from "../ui/code/consts"
import { useLayoutProvider } from "../providers/LayoutProvider"
import type { InjectedPreProps } from "../ui/code/models"
import { Interactive } from "../ui/code/Interactive"
import { TinyButton } from "../ui/code/TinyButton"

const CodeHeaderContainer = styled.div`
  height: ${pre_config.header_height}px;
  padding: 8px 12px;
  background: #3e4360;
  border-top-left-radius: 4px;
  border-bottom: 1px solid #6c6c6e;
  border-top-right-radius: 4px;
`

const CodeHeader = ({ copy }: InjectedPreProps) => {
  const layout = useLayoutProvider()

  return (
    <CodeHeaderContainer>
      <Interactive>
        {({ active, start }) => (
          <TinyButton
            onClick={() => {
              start()
              copy()
            }}
          >
            {active ? `✂️ ${layout.t.copied}` : `✂️ ${layout.t.copy}`}
          </TinyButton>
        )}
      </Interactive>
    </CodeHeaderContainer>
  )
}

export { CodeHeader }
