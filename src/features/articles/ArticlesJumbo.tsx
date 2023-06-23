import React, { ReactNode } from "react"
import styled from "styled-components"
import theme from "../../utils/theme"
import { B, Input, M, XXL } from "../../ui"
import Button from "../../components/button/Button"
import Divider from "../../components/divider/Divider"
import Img from "gatsby-image"
import { Image } from "../../models"

const Container = styled.figure`
  display: flex;
  position: relative;
  align-items: center;
  flex-flow: column;
  padding: 80px 20px;
  margin: 0;
  background: ${theme.grayE};
  border-bottom: 1px solid ${theme.grayC};
`

const Footer = styled.div`
  display: flex;
  justify-content: center;
`

const Wrapper = styled.div`
  max-width: 480px;
  z-index: 1;

  ${XXL}, ${M} {
    text-align: center;
  }

  ${XXL} {
    margin-bottom: 20px;
  }

  .ui-input {
    margin: 24px 0 40px 0;
  }

  .articles-jumbo-divider {
    margin: 0 auto 32px auto;
  }
`

interface ArticlesJumboProps {
  bubblesImg: Image
}

const ArticlesJumbo = ({ bubblesImg }: ArticlesJumboProps) => {
  return (
    <Container>
      <Img
        fluid={bubblesImg}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <Wrapper>
        <XXL>Find something interesting to read</XXL>
        <M>
          When writing our articles, we place great emphasis on the{" "}
          <B>quality</B> of their content and teaching materials. Thanks to this
          you will be able to find <B>meaningful materials</B> and understand{" "}
          <B>complex issues</B>.
        </M>
        <Input placeholder="Type to find an article..." />
        <Divider className="articles-jumbo-divider" horizontal />
        <Footer>
          <Button>Create yours</Button>
        </Footer>
      </Wrapper>
    </Container>
  )
}

export { ArticlesJumbo }
