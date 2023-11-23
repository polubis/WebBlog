import React, { useMemo, ReactNode } from "react"
import styled from "styled-components"
import theme from "../../../../utils/theme"
import { M, XXL } from "../../../../ui"
import { useBlogCreatorPageProvider } from "../BlogCreatorPageProvider"
import { CodeFrames } from "../../../components/CodeFrames"
import { M_UP } from "../../../../utils/viewport"

const Container = styled.figure`
  position: relative;
  align-items: center;
  padding: 80px 20px;
  margin: 0;
  background: ${theme.grayE};

  & > ${M}, & > ${XXL} {
    max-width: 500px;
  }

  & > ${M} {
    margin: 20px 0 40px 0;
  }

  .ui-snippet {
    width: 100%;

    @media ${M_UP} {
      width: 500px;
    }
  }

  & > button {
    margin: 40px 0 0 0;
  }
`

const BlogCreatorJumbo = ({
  children,
  stopShowcase,
}: {
  children: ReactNode
  stopShowcase: boolean
}) => {
  const blogCreator = useBlogCreatorPageProvider()

  const frames = useMemo(
    () =>
      Object.entries(blogCreator.samples)
        .filter(([key]) => key !== "default")
        .map(([, value]) => value),
    []
  )

  return (
    <Container className="col">
      <XXL className="tcenter">{blogCreator.t.sentence}</XXL>
      <M className="tcenter">{blogCreator.t.page_description}</M>
      {stopShowcase || (
        <CodeFrames
          animated
          linesOff
          lang="markdown"
          autoPlayOnInit
          frames={frames}
        />
      )}
      {children}
    </Container>
  )
}

export { BlogCreatorJumbo }
