import React from "react"

import styled from "styled-components"
import type { BreadcrumbsProps } from "./models"

const Container = styled.div`
  padding: 8px 8px 8px 0;
  overflow-x: auto;

  & > * {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #fff;
    flex-shrink: 0;

    :last-child {
        text-decoration: none;
        color: #ff7878;
    }

    :not(:last-child)::after {
      content: "";
      flex-shrink: 0;
      background: #aba7a7;
      width: 8px;
      display: block;
      height: 8px;
      border-radius: 50%;
      margin: 0 12px;
    }
  }
`

const Breadcrumbs = ({ className, children }: BreadcrumbsProps) => {
  return (
    <Container
      className={`breadcrumbs ${className ? " " + className : ""} row`}
    >
      {children}
    </Container>
  )
}

export { Breadcrumbs }
