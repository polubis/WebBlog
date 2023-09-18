import React from "react"
import { PolandIcon } from "../../ui/icons/PolandIcon"
import { UKIcon } from "../../ui/icons/UKIcon"
import styled from "styled-components"
import { Link as GatsbyLink } from "gatsby"
import { useLayoutProvider } from "../providers/LayoutProvider"
import c from "classnames"
import { LanguageLinksProps } from "./models"

const Container = styled.div`
  &.row {
    & > * {
      &:not(:last-child) {
        margin-right: 12px;
      }
    }
  }

  &.col {
    & > * { 
      &:not(:last-child) {
        margin-bottom: 4px;
      }
    }
  }

  & > * {
    &.active path {
      opacity: 1;
    }

    &:hover:not(.active) path {
      opacity: 1;
    }

    path {
      opacity: 0.6;
    }
  }
`

const LanguageLinks = ({ row }: LanguageLinksProps) => {
  const layout = useLayoutProvider()

  return (
    <Container className={c("center language-links", row ? 'row' : 'col')}>
      <GatsbyLink
        className={c({ active: layout.lang.key === "pl" })}
        title={layout.t.switch_to_pl}
        to={"/" + layout.langs.pl.key + "/"}
      >
        <PolandIcon />
      </GatsbyLink>
      <GatsbyLink
        className={c({ active: layout.lang.key === "en" })}
        title={layout.t.switch_to_en}
        to="/"
        activeClassName="active"
      >
        <UKIcon />
      </GatsbyLink>
    </Container>
  )
}

export { LanguageLinks }
