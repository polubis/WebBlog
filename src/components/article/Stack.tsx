import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"
import Divider from "./Divider"
import theme from "../../utils/theme"
import { Technology } from "../../models"

interface StackProps {
  items: Technology[]
}

const Li = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  background: ${theme.bg};
`

const Ul = styled.ul`
  position: relative;
  display: flex;
  align-items: center;
  flex-flow: wrap;
  list-style: none;
  margin: 0;
  padding: 0;

  &::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
`

const Container = styled.div`
  position: relative;
  margin: 72px 0;

  ${Divider} {
    position: absolute;
    top: calc(+50% - 2px);
  }
`

export const Stack = ({ items }: StackProps) => {
  return (
    <Container className='components-stack'>
      <Divider />
      <Ul>
        {items.map(item => (
          <Li key={item.id} title={item.id}>
            <Image
              alt={item.id}
              fluid={item.avatar}
              style={{ width: "42px", height: "42px" }}
            />
          </Li>
        ))}
      </Ul>
    </Container>
  )
}
