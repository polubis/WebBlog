import React, { useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { A, B, Content, M, XL, Percentage } from "../../ui"
import Section from "../article/Section"
import { FullScreenAnimation } from "../full-screen-animation"

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
              Did you know that? <Percentage />
            </XL>
            <M>
              Use the <B>XL</B> tag as a heading -{" "}
              <B>{"<XL>My heading</XL>"}</B>.
            </M>
            <M>
              Use the <B>M</B> tag as a paragraph -{" "}
              <B>{"<M>My text content</M>"}</B>.
            </M>
            <M>
              <B>{"<Img />"}</B> tag can be used to display any image via{" "}
              <B>src</B> parameter.
            </M>
            <M>
              Looking for a cool <B>community</B>? Join our{" "}
              <A href="https://discord.gg/PxXQayT3x3" outside>
                Discord
              </A>
              , where we share knowledge, help each other and do periodic
              events.
            </M>
            <M>
              Our platform's mascot is a <B>kitten with gun</B>. Maybe you have
              already seen it?
            </M>
            <M>
              Don't be afraid, the <B>GPT chat</B> won't take away your work -
              it can only make it easier.
            </M>
          </Section>
        </Content>
      </Container>
    </FullScreenAnimation>
  )
}

export { BlogCreatorLoader }
