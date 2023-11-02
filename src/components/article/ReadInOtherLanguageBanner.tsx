import React from "react"
import { Banner } from "../../ui"
import styled from "styled-components"
import { Link } from "gatsby"
import { useArticleProvider } from "../../v2/providers/ArticleProvider"

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

const ReadInOtherLanguageBanner = () => {
  const { state: article } = useArticleProvider()

  return (
    <Wrapper>
      <Banner>
        {article.t.other_lang_banner_message}
        <Link className="l2" to={article.translation_path!}>
          {article.t.other_lang_banner_link}
        </Link>
      </Banner>
    </Wrapper>
  )
}

export { ReadInOtherLanguageBanner }
