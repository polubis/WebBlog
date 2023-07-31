import React from "react"
import type { ReactNode } from "react"
import styled from "styled-components"

const List = styled.div`
  ol,
  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    & > *:not(:last-of-type) {
      margin-bottom: 12px;
    }

    li {
      font-family: inherit;
      font-size: 16px;
      letter-spacing: 0.15px;
      font-weight: 500;
      color: #fff;

      &::before {
        margin-right: 12px;
      }
    }
  }

  ol {
    counter-reset: numbers;

    li {
      counter-increment: numbers;

      &::before {
        content: counter(numbers) ". ";
        font-family: inherit;
        font-size: 20px;
        letter-spacing: 0.15px;
        font-weight: 500;
        color: #ff7878;
      }
    }
  }

  ul {
    li {
      &::before {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ff7878;
        flex-shrink: 0;
      }
    }
  }
`

interface LProps {
  ordered?: boolean
  children: ReactNode
}

const L = ({ ordered, children }: LProps) => {
  return (
    <List className="l">
      {ordered ? <ol>{children}</ol> : <ul>{children}</ul>}
    </List>
  )
}

interface LiProps {
  children: ReactNode
}

const Li = ({ children }: LiProps) => {
  return <li className="li row">{children}</li>
}

export type { LiProps, LProps }

export { Li, L }
