import React from "react"
import styled from "styled-components"
import { B, M, X, XXL } from "../../../../ui"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  background: #313131;
  border-radius: 12px;
  padding: 24px;
  z-index: 1;

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

  .mentoring-tile-tags {
    color: white;
  }

  & > footer {
    display: flex;
    margin-top: auto;

    & > button {
      margin-right: 12px;
    }
  }

  &.mentoring-second {
    grid-area: mentoring-second;
  }

  &.mentoring-fourth {
    grid-area: mentoring-fourth;
  }

  &.mentoring-first {
    grid-area: mentoring-first;
  }

  &.mentoring-third {
    grid-area: mentoring-third;
  }
`

interface TileProps {
  price: number
}

const Tile = () => {
  return (
    <Container>
      <X>Tworzenie artykułów</X>
      <M>
        Tworzymy artykuły na Twoje zlecenie. Wybierasz temat, a My zajmiemy się
        resztą.
      </M>
      <M>
        ✔️ Do 3 poprawek, ✔️ Dowolny temat, ✔️ Dowolny format, ✔️ Zwrot
        pieniędzy
      </M>
      <M>
        Koszt: <B>123 zł</B> za artykuł (z VAT).
      </M>
      <footer>
        <button className="button upper primary">Zapisz się</button>
        <button className="button upper primary">Więcej informacji</button>
      </footer>
    </Container>
  )
}

export { Tile }
