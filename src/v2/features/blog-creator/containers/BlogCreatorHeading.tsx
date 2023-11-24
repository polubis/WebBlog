import React, { ReactNode } from "react"
import styled from "styled-components"
import { XL } from "../../../../ui"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import theme from "../../../../utils/theme"

const Heading = styled.header`
  height: 100%;
  padding: 0 20px;
  border-bottom: 2px solid ${theme.grayC};
  justify-content: space-between;

  ${XL} {
    margin-right: 10px;
  }
`

const BlogCreatorHeading = ({ buttons }: { buttons: ReactNode }) => {
  const layout = useLayoutProvider()

  return (
    <Heading className="row">
      <XL>{layout.t.create_article}</XL>
      {buttons}
    </Heading>
  )
}

export { BlogCreatorHeading }
