import React, { ReactNode } from "react"
import styled from "styled-components"
import { XL } from "../../../../ui"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import theme from "../../../../utils/theme"

const Footer = styled.footer``

const BlogCreatorFooter = ({ children }: { children: ReactNode }) => {
  const layout = useLayoutProvider()

  return <Footer className="row">{children}</Footer>
}

export { BlogCreatorFooter }
