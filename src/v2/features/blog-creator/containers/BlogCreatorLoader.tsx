import React, { useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { B, M, XL } from "../../../../ui/text/Text"
import { FullScreenAnimation } from "../../../../components/full-screen-animation/FullScreenAnimation"
import { Content, Percentage } from "../../../../ui"
import Section from "../../../../components/article/Section"
import { useBlogCreatorPageProvider } from "../BlogCreatorPageProvider"

const appearIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-15px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`

const Container = styled.div`
  height: 100%;

  .ui-layout-content {
    display: flex;

    section {
      margin: auto;
    }
  }

  ${XL} {
    display: flex;
    justify-content: space-between;
    opacity: 0;
    animation: ${appearIn} 0.4s ease-in-out 0.4s forwards;
  }

  ${M} {
    opacity: 0;
    animation: ${appearIn} 0.4s ease-in-out 0.8s forwards;
  }
`

interface BlogCreatorLoaderProps {
  onClose: () => void
}

const BlogCreatorLoader = ({ onClose }: BlogCreatorLoaderProps) => {
  const creator = useBlogCreatorPageProvider()

  useEffect(() => {
    const timeout = setTimeout(onClose, 4000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <FullScreenAnimation>
      <Container>
        <Content paddingY>
          <Section>
            <XL>
              {creator.t.loader.heading} <Percentage />
            </XL>
            <M>
              {creator.t.loader.mascot["1"]}{" "}
              <B>{creator.t.loader.mascot["2"]}</B>.{" "}
              {creator.t.loader.mascot["3"]}
            </M>
            <M>
              {creator.t.loader.gpt["1"]}. <B>{creator.t.loader.gpt["2"]}</B>{" "}
              {creator.t.loader.gpt["3"]}
            </M>
          </Section>
        </Content>
      </Container>
    </FullScreenAnimation>
  )
}

export { BlogCreatorLoader }
