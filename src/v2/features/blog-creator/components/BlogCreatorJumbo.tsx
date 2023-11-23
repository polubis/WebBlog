import React, { useMemo } from "react"
import styled from "styled-components"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import theme from "../../../../utils/theme"
import { M, XXL } from "../../../../ui"
import { useBlogCreatorPageProvider } from "../BlogCreatorPageProvider"
import { CodeFrames } from "../../../components/CodeFrames"

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
`

const BlogCreatorJumbo = () => {
  const {} = useLayoutProvider()
  const blogCreator = useBlogCreatorPageProvider()

  const frames = useMemo(() => Object.values(blogCreator.samples), [])

  return (
    <Container className="col">
      <XXL className="tcenter">{blogCreator.t.sentence}</XXL>
      <M className="tcenter">{blogCreator.t.page_description}</M>
      <CodeFrames autoPlayOnInit frames={frames} />
    </Container>
  )
}

export { BlogCreatorJumbo }
