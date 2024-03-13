import React from "react"
import styled from "styled-components"
import { M, S, X, XXL } from "../../../../ui"
import c from "classnames"

const Badges = styled.div`
  display: flex;
  flex-flow: wrap;

  & > * {
    margin: 0 8px 8px 0;
  }
`

const Container = styled.div`
  display: flex;
  flex-flow: column;
  background: #313131;
  border-radius: 12px;
  padding: 24px;
  z-index: 1;

  ${Badges} {
    margin: 8px 0;
  }

  ${XXL} {
    margin-bottom: 12px;
  }

  ${X} {
    margin-bottom: 12px;
  }

  ${M} {
    margin-bottom: 8px;
  }

  ${M}:last-of-type {
    margin-bottom: 20px;
  }

  & > footer {
    display: flex;
    margin-top: auto;

    & > button {
      margin-right: 12px;
    }
  }
`

const Badge = styled.div`
  border-radius: 12px;
  background: linear-gradient(to right, #ff7878, #ffa7a7);
  padding: 2px 8px;
  width: max-content;
  cursor: pointer;

  & > * {
    font-weight: bolder;
    color: #000;
  }
`

interface TileProps {
  className?: string
  badges: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  cost: React.ReactNode
  controls: React.ReactNode
}

const Tile = ({
  className,
  title,
  description,
  badges,
  cost,
  controls,
}: TileProps) => {
  return (
    <Container className={className}>
      <X>{title}</X>
      <M>{description}</M>
      <Badges>{badges}</Badges>
      <M>{cost}</M>
      <footer>{controls}</footer>
    </Container>
  )
}

Tile.Badge = ({ children }: { children: React.ReactNode }) => (
  <Badge>
    <S>{children}</S>
  </Badge>
)

Tile.Control = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => <button className={c("button upper third", className)} {...props} />

export { Tile }
