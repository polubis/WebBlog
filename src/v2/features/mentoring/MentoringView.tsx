import React from "react"
import Layout from "../../containers/Layout"
import { useLayoutProvider } from "../../providers/LayoutProvider"
import styled from "styled-components"
import { B, Content, M, X, XL } from "../../../ui"
import { Tags } from "../../components/Tags"

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "mentoring-general mentoring-general mentoring-single-call mentoring-single-call mentoring-single-call"
    "b b c c c"
    "b b c c c";
  gap: 20px;
`

const Tile = styled.div`
  display: flex;
  flex-flow: column;
  background: #313131;
  border-radius: 12px;
  padding: 24px;

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

  &.mentoring-general {
    grid-area: mentoring-general;
  }

  &.mentoring-single-call {
    grid-area: mentoring-single-call;
  }
`

const MentoringView = () => {
  const layout = useLayoutProvider()

  return (
    <Layout>
      <Content paddingY>
        <Grid>
          <Tile className="mentoring-general">
            <X>Mentoring dopasowany do twoich potrzeb</X>
            <M>
              Wybierz odpowiedni <B>plan</B>, <B>sciężkę</B> lub{" "}
              <B>konsultację</B>.
            </M>
            <M>
              <B>Obszary</B>: Frontend, Backend, Testowanie manualne, Testowanie
              automatyczne, Narzędzia AI, Umiejętności miękkie, Architektura,
              Automatyzacja zadań.
            </M>
            <footer>
              <button className="button upper primary">Informacje</button>
            </footer>
          </Tile>
          <Tile className="mentoring-single-call">
            <X>Konsultacja</X>
            <M>
              Potrzebujesz pomocy przy zadaniu? Nie rozumiesz zagadnienia? Wykup
              pojedyńczą konsultację, którą będziesz mógł nagrać.
            </M>
            <M>
              Jeżeli szkoda Ci pieniędzy, umów się ze znajomymi - kupujesz
              jedynie mój czas.
            </M>
            <M>
              ✔️ Nagrywanie, ✔️ 1 godzina, ✔️ Dostęp do materiałów, ✔️ Max 3
              osoby
            </M>
            <M>
              Koszt: <B>246 zł</B> (zawiera podatek VAT).
            </M>
            <footer>
              <button className="button upper primary">Zapisz się</button>
              <button className="button upper primary">Informacje</button>
            </footer>
          </Tile>
          <Tile>
            <X>Mentoring dopasowany do twoich potrzeb</X>
            <M>
              Wybierz odpowiedni <B>plan</B>, <B>sciężkę</B> lub{" "}
              <B>konsultację</B>
            </M>
            <button className="button upper primary">Zapisz się</button>
          </Tile>
          <Tile>
            <X>Mentoring dopasowany do twoich potrzeb</X>
            <M>
              Wybierz odpowiedni <B>plan</B>, <B>sciężkę</B> lub{" "}
              <B>konsultację</B>
            </M>
            <button className="button upper primary">Zapisz się</button>
          </Tile>
          <Tile>
            <X>Mentoring dopasowany do twoich potrzeb</X>
            <M>
              Wybierz odpowiedni <B>plan</B>, <B>sciężkę</B> lub{" "}
              <B>konsultację</B>
            </M>
            <button className="button upper primary">Zapisz się</button>
          </Tile>
          <Tile>
            <X>Mentoring dopasowany do twoich potrzeb</X>
            <M>
              Wybierz odpowiedni <B>plan</B>, <B>sciężkę</B> lub{" "}
              <B>konsultację</B>
            </M>
            <button className="button upper primary">Zapisz się</button>
          </Tile>
          <Tile>
            <X>Mentoring dopasowany do twoich potrzeb</X>
            <M>
              Wybierz odpowiedni <B>plan</B>, <B>sciężkę</B> lub{" "}
              <B>konsultację</B>
            </M>
            <button className="button upper primary">Zapisz się</button>
          </Tile>
          <Tile>
            <X>Mentoring dopasowany do twoich potrzeb</X>
            <M>
              Wybierz odpowiedni <B>plan</B>, <B>sciężkę</B> lub{" "}
              <B>konsultację</B>
            </M>
            <button className="button upper primary">Zapisz się</button>
          </Tile>
        </Grid>
      </Content>
    </Layout>
  )
}

export { MentoringView }
