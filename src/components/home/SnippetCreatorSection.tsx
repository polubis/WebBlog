import React, { useEffect } from "react"
import styled from "styled-components"
import { T_DOWN } from "../../utils/viewport"
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
  padding: 162px 20px;
  border-top: 1px solid ${theme.grayC};
  border-bottom: 1px solid ${theme.grayC};
  min-height: 920px;

  @media ${T_DOWN} {
    min-height: 770px;
    padding: 32px 20px;
  }
`

export const SnippetCreatorSection = () => {
  const { ref, isVisible } = useIsVisible({ threshold: 0.1, useOnce: true })

  useEffect(() => {
    if (!isInSSR()) SnippetCreatorSectionContent.preload()
  }, [])

  return (
    <Container ref={ref}>
      {isVisible && <SnippetCreatorSectionContent />}
    </Container>
  )
}
