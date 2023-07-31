import React, { ReactNode } from "react"
import styled from "styled-components"
import { L_DOWN, M_DOWN } from "../../../../utils/viewport"
import { XL } from "../../../../ui"
import Badge from "../../../../components/article/Badge"
import theme from "../../../../utils/theme"
import { useBlogCreatorPageProvider } from "../BlogCreatorPageProvider"
import { useLayoutProvider } from "../../../providers/LayoutProvider"

const Container = styled.div`
  margin-left: auto;

  & > *:not(:first-child) {
    margin-left: 20px;
  }
`

const Heading = styled.header`
  height: 100%;
  flex-shrink: 0;

  ${XL} {
    margin-right: 10px;
  }

  @media ${M_DOWN} {
    ${XL} {
      display: none;
    }

    ${Badge} {
      display: none;
    }
  }

  .full-mode-btn {
    @media ${L_DOWN} {
      display: none;
    }
  }
`

interface BlogCreatorHeadingProps {
  buttons: ReactNode
}

const BlogCreatorHeading = ({ buttons }: BlogCreatorHeadingProps) => {
  const creator = useBlogCreatorPageProvider()
  const layout = useLayoutProvider()

  return (
    <Heading className="row components-blog-creator-heading">
      <XL>{creator.t.article_preview}</XL>
      <Badge color={theme.green}>{creator.t.version} 1.1</Badge>
      <Container className="row">
        {buttons}
        <a
          className="button primary upper"
          href={layout.discord_url}
          title={layout.t.discord_channel}
          target="_blank"
          rel="noopener noreferrer"
        >
          {creator.t.submit_article}
        </a>
      </Container>
    </Heading>
  )
}

export { BlogCreatorHeading }
