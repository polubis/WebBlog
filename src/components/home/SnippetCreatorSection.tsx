import React, { useEffect } from "react"
import styled from "styled-components"
import { T_UP } from "../../utils/viewport"
import theme from "../../utils/theme"
import Loadable from "react-loadable"
import { useIsVisible } from "../../utils/useIsVisible"
import { isInSSR } from "../../utils/isInSSR"

const SnippetCreatorSectionContent = Loadable({
  loader: () =>
    import("./SnippetCreatorSectionContent").then(
      m => m.SnippetCreatorSectionContent
    ),
  loading: () => null,
})

const Container = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  border-top: 1px solid ${theme.grayC};
  border-bottom: 1px solid ${theme.grayC};

  @media ${T_UP} {
    padding: 40px 20px;
  }
`

export const SnippetCreatorSection = () => {
  const { ref, isVisible } = useIsVisible({ threshold: 0.1 })

  useEffect(() => {
    if (!isInSSR()) SnippetCreatorSectionContent.preload()
  }, [])

  return (
    <Container ref={ref}>
      {isVisible && <SnippetCreatorSectionContent />}
    </Container>
  )
}
