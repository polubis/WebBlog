import React from "react"

import { Code } from "../article/Code"

import styled from "styled-components"

const Container = styled.div`
  background: #282a36;
  padding: 16px;
`

const Dot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
`

const MacDots = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  & > * {
    margin-right: 7px;
  }

  & > *:first-child {
    background: #ff5f56;
  }

  & > *:nth-child(2) {
    background: #ffbd2e;
  }

  & > *:last-child {
    background: #27c93f;
  }
`

export const CodePreview = ({
  src,
  description,
}: {
  src: string
  description: string
}) => {
  return (
    <Code src={src} preserveHeight description={description}>
      {content => (
        <Container>
          <MacDots>
            <Dot />
            <Dot />
            <Dot />
          </MacDots>
          <pre>
            <code className="language-javascript">{content}</code>
          </pre>
        </Container>
      )}
    </Code>
  )
}
