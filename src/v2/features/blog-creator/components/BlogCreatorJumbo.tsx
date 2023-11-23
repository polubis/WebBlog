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

  .ui-snippet {
    width: 500px;
  }

  .blog-creator-jumbo-try-it-btn {
    margin: 40px 0 0 0;
  }
`

const BlogCreatorJumbo = () => {
  const layout = useLayoutProvider()
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
      <CodeFrames
        animated
        linesOff
        lang="markdown"
        autoPlayOnInit
        frames={frames}
      />
      <button className="blog-creator-jumbo-try-it-btn upper button primary">{layout.t.try_it}</button>
    </Container>
  )
}

export { BlogCreatorJumbo }
