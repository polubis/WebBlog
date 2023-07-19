import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"
import type { Technology } from "../../models"

interface StackProps {
  className?: string
  items: Technology[]
}

const Container = styled.div`
  & > div {
    overflow-x: auto;
    padding: 12px 0;

    & > * {
      flex-shrink: 0;

      :not(:last-child) {
        margin-right: 12px;
      }
    }
  }
`

export const Stack = ({ className, items }: StackProps) => {
  return (
    <Container className={`stack${className ? ' ' + className : ''}`}>
      <div className="row in">
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
      </div>

    </Container>
  )
}
