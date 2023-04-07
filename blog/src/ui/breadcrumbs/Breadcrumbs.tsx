import React from "react"
import type { ReactNode } from "react"

import styled from "styled-components"
import theme from "../../utils/theme"

const Item = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 8px 8px 0;
  overflow-x: auto;

  & > *:not(:last-child) {
    &::after {
      content: "";
      flex-shrink: 0;
      background: ${theme.grayD};
      width: 8px;
      display: block;
      height: 8px;
      border-radius: 50%;
      margin: 0 12px;
    }
  }
`

interface BreadcrumbsProps {
  children: ReactNode[]
}

interface BreadcrumbItemProps {
  children: ReactNode
}

const BreadcrumbItem = ({ children }: BreadcrumbItemProps) => {
  return <Item className="ui-breadcrumb-item">{children}</Item>
}

const Breadcrumbs = ({ children }: BreadcrumbsProps) => {
  return <Container className="ui-breadcrumbs">{children}</Container>
}

Breadcrumbs.Item = BreadcrumbItem

export type { BreadcrumbsProps, BreadcrumbItemProps }

export { Breadcrumbs }
