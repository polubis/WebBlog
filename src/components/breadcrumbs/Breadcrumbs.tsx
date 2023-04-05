import React, { memo } from "react"

import styled from "styled-components"
import { Link as GatsbyLink } from "gatsby"
import theme from "../../utils/theme"
import { M, Breadcrumbs as UIBreadcrumbs } from "../../ui"

const Container = styled.div`
  margin-bottom: 32px;
  max-width: calc(100vw - 40px);

  a {
    color: ${theme.white};

    &:hover {
      color: ${theme.grayA};
    }
  }
`

interface Breadcrumb {
  label: string
  path: string
}

interface BreadcrumbsProps {
  items: Breadcrumb[]
}

const Breadcrumbs = memo(
  ({ items }: BreadcrumbsProps) => {
    return (
      <Container className="components-breadcrumbs">
        <UIBreadcrumbs>
          {items.map((item, idx) =>
            idx === items.length - 1 ? (
              <UIBreadcrumbs.Item key={idx}>
                <M>{item.label}</M>
              </UIBreadcrumbs.Item>
            ) : (
              <UIBreadcrumbs.Item key={idx}>
                <GatsbyLink key={idx} to={item.path}>
                  {item.label}
                </GatsbyLink>
              </UIBreadcrumbs.Item>
            )
          )}
        </UIBreadcrumbs>
      </Container>
    )
  },
  () => true
)

export type { BreadcrumbsProps, Breadcrumb }

export { Breadcrumbs }
