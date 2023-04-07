import React from "react"
import styled from "styled-components"

interface Props {
  children: React.ReactNode
  mini?: boolean
}

export default styled.div<Props>`
  display: flex;
  align-items: center;
`
