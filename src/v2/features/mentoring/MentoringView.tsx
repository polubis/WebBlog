import React from "react"
import Layout from "../../containers/Layout"
import { useLayoutProvider } from "../../providers/LayoutProvider"
import styled from "styled-components"
import { B, Content, M, X, XL, XXL } from "../../../ui"
import { Tags } from "../../components/Tags"

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "mentoring-general mentoring-general mentoring-single-call mentoring-single-call mentoring-single-call"
    "mentoring-tech-talk mentoring-tech-talk a a a"
    "b b c c c";
  gap: 20px;
`

const Container = styled.div`
  ${XL} {
    margin-bottom: 20px;
  }

  .mentoring-general {
    margin-bottom: 40px;
    background: none;
    padding: 0;
    max-width: 700px;
  }
`

const Tile = styled.div`
  display: flex;
  flex-flow: column;
  background: #313131;
  border-radius: 12px;
  padding: 24px;

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

  &.mentoring-single-call {
    grid-area: mentoring-single-call;
  }

  &.mentoring-tech-talk {
    grid-area: mentoring-tech-talk;
  }
`

const MentoringView = () => {
  const layout = useLayoutProvider()

  return (
    <Layout>
      <Content paddingY>
        <Container>
          <Tile className="mentoring-general">
            <XXL>
              Mentoring dopasowany do Twoich potrzeb
            </XXL>
            <M>
              Wybierz odpowiedni <B>plan</B>, <B>sciężkę</B> lub{" "}
              <B>konsultację</B>.
            </M>
            <M>
              <B>Obszary</B>: Frontend, Backend, Testowanie manualne, Testowanie
              automatyczne, Narzędzia AI, Umiejętności miękkie, Architektura,
              Automatyzacja zadań, UX/UI, SEO, POC, Tworzenie aplikacji,
              Tworzenie stron internetowych.
            </M>
            <footer>
              <button className="button upper primary">
                Więcej informacji
              </button>
            </footer>
          </Tile>
          <XL>Popularne</XL>
          <Grid>
            <Tile className="mentoring-single-call">
              <X>Pojedyńcza konsultacja</X>
              <M>
                Potrzebujesz pomocy przy zadaniu? Nie rozumiesz zagadnienia?
                Wykup pojedyńczą konsultację, którą będziesz mógł nagrać.
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
                <button className="button upper primary">
                  Więcej informacji
                </button>
              </footer>
            </Tile>
            <Tile className="mentoring-tech-talk">
              <X>Rozmowa techniczna</X>
              <M>
                Szukasz nowej pracy lub chcesz zmienić obecną, ale nie jesteś
                pewien tego czy jesteś dobrze przygotowany? Nie martw się!
                Przeprowadzę z Tobą rozmowę techniczną na, której zweryfikujemy
                wszystko co potrzebne pod konkretną firmę.
              </M>
              <M>
                ✔️ 1.5 godziny, ✔️ Dostęp do materiałów, ✔️ Max 3 osoby, ✔️
                Notatka po spotkaniu, ✔️ Nagrywanie
              </M>
              <M>
                Koszt: <B>307,50 zł</B> (zawiera podatek VAT).
              </M>
              <footer>
                <button className="button upper primary">Zapisz się</button>
                <button className="button upper primary">
                  Więcej informacji
                </button>
              </footer>
            </Tile>
          </Grid>
        </Container>
      </Content>
    </Layout>
  )
}

export { MentoringView }
