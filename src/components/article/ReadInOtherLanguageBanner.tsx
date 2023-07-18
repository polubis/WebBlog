import React from "react"
import { Banner } from "../../ui"
import styled from "styled-components"
import { Link } from "gatsby"

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

  a {
    margin-left: 8px;
    text-align: right;
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
        <Link className="l2" to={url}>
          {linkLabel}
        </Link>
      </Banner>
    </Wrapper>
  )
}

export type { ReadInOtherLanguageBannerProps }

export { ReadInOtherLanguageBanner }
