import React from "react"
import styled, { CSSProperties } from "styled-components"
import Image from "gatsby-image"
import type { Technology } from "../../models"

interface StackProps {
  items: Technology[]
}

const Container = styled.div`
    overflow-y: auto;
    padding: 12px 0;

    & > *:not(:last-child) {
        margin-right: 12px;
    }
`

const style: CSSProperties = {
  width: "40px", height: "40px"
}

export const Stack = ({ items }: StackProps) => {
  return (
    <Container className="row">
      {items.map(item => (
        <div key={item.id} title={item.id}>
          <Image
            alt={item.id}
            fluid={item.avatar}
            style={style}
          />
        </div>
      ))}
    </Container>
  )
}
