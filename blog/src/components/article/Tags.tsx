import React from "react"
import styled from "styled-components"

import theme from "../../utils/theme"

const Tag = styled.li`
  text-transform: uppercase;
  color: ${theme.secondary};
  opacity: 0.7;
  font-size: 14px;
`

const Tags = styled.ul`
  display: flex;
  align-items: center;
  flex-flow: wrap;
  margin: 0;
  padding: 0;
  list-style: none;

  ${Tag} {
    display: flex;
    align-items: center;
    margin: 0 14px 14px 0;

    &:not(:last-of-type)::after {
      content: "";
      display: block;
      width: 7px;
      flex-shrink: 0;
      height: 7px;
      margin: 0 0 0 14px;
      border-radius: 50%;
      background: ${theme.secondary};
      opacity: 0.7;
    }
  }
`

interface Props {
  tags: string
}

export default function ({ tags }: Props): React.ReactElement {
  return (
    <Tags className="components-article-tags">
      {tags.split(",").map(tag => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </Tags>
  )
}
