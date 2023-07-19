import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"
import type { Technology } from "../../models"

interface StackProps {
  items: Technology[]
}

const Container = styled.div`
    overflow-x: auto;
    padding: 12px 0;

    & > *:not(:last-child) {
        margin-right: 12px;
    }
`

export const Stack = ({ items }: StackProps) => {
  return (
    <Container className="row in">
      {items.map(item => (
        <Image
          key={item.id}
          title={item.id}
          alt={item.id}
          fixed={item.avatar}
          style={{
            height: item.avatar.height,
            width: item.avatar.width,
          }}
        />
      ))}
    </Container>
  )
}
