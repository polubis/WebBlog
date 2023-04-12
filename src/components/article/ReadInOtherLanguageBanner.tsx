import React from "react"
import { Banner } from "../../ui"
import { LinkButton } from "../button/Button"
import styled from "styled-components"
import { Link as GatsbyLink } from "gatsby"
import theme from "../../utils/theme"

interface ReadInOtherLanguageBannerProps {
  text: string
  url: string
  linkLabel: string
}

const Wrapper = styled.div`
  & > .ui-banner {
    p {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .read-link {
    margin-left: 8px;

    button {
      color: ${theme.black};
    }
  }
`

const ReadInOtherLanguageBanner = ({
  text,
  url,
  linkLabel,
}: ReadInOtherLanguageBannerProps) => {
  return (
    <Wrapper>
      <Banner>
        {text}
        <GatsbyLink className="read-link" to={url}>
          <LinkButton>{linkLabel}</LinkButton>
        </GatsbyLink>
      </Banner>
    </Wrapper>
  )
}

export type { ReadInOtherLanguageBannerProps }

export { ReadInOtherLanguageBanner }
