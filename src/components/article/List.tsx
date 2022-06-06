import React from "react"
import { M } from "../../ui/text"
import styled from "styled-components"
import theme from "../../utils/theme"

const Li = styled.li`
  color: ${theme.primary};
`

const Ul = styled.ul`
  display: flex;
  margin: 24px 0;
  padding-top: 0;
  padding-bottom: 0;
  flex-flow: column;

  ${Li}:not(:last-of-type) {
    margin-bottom: 10px;
  }

  ${Li} > * {
    margin-bottom: 0 !important;
  }
`

export const List = ({ items }: { items: string }) => {
  if (!items) {
    return null
  }

  const itemsArr = items.split(",")

  if (itemsArr.length === 0) {
    return null
  }

  return (
    <Ul>
      {itemsArr.map((item, idx) => (
        <Li key={idx}>
          <M>{item}</M>
        </Li>
      ))}
    </Ul>
  )
}
