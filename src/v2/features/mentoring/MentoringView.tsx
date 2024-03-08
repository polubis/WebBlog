import React from "react"
import Layout from "../../containers/Layout"
import styled from "styled-components"
import { Content, B, M, X, XL, XXL, CodeEditorTile } from "../../../ui"
import { Chart } from "./components/Chart"

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "mentoring-first mentoring-first mentoring-second mentoring-second mentoring-second"
    "mentoring-third mentoring-third mentoring-third mentoring-fourth mentoring-fourth"
    "b b c c c";
  gap: 20px;
`

const Jumbo = styled.section`
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  max-width: 640px;
  z-index: 1;

  & > * {
    text-align: center;
  }

  ${XXL} {
    margin-bottom: 20px;
  }

  ${M} {
    margin-bottom: 8px;
  }

  footer {
    margin-top: 24px;
  }
`

const Container = styled.div`
  margin-bottom: 48px;
  z-index: 1;

  ${XL} {
    margin-bottom: 20px;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.51);
  }
`

const Tile = styled.div`
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

const MainContainer = styled.div`
  .ui-code-editor-tile {
    margin-bottom: 48px;
  }

  .ui-footer {
    z-index: 1;
  }
`

const MentoringView = () => {
  return (
    <MainContainer>
      <Chart />
      <Layout>
        <Content paddingY>
          <CodeEditorTile>
            <Jumbo>
              <XXL>Mentoring uszyty na miarę</XXL>
              <M>
                Wybierz odpowiedni <B>plan</B>, a My zajmiemy się resztą!
              </M>
              <M>
                Frontend, Backend, Testowanie manualne, Testowanie automatyczne,
                Narzędzia AI, Umiejętności miękkie, Architektura, Automatyzacja
                zadań, UX/UI, SEO, POC, Tworzenie aplikacji, Tworzenie stron
                internetowych, Analityka, Testy A/B, Bazy danych, Pierwsza praca
                w IT, Zarządzanie projektami
              </M>
              <footer>
                <button className="button upper primary">Weź udział</button>
              </footer>
            </Jumbo>
          </CodeEditorTile>
          <Container>
            <XL>Najczęściej wybierane</XL>
            <Grid>
              <Tile className="mentoring-first">
                <X>Tworzenie artykułów</X>
                <M>
                  Wybierasz temat, a My tworzymy artykuł w dowolnej{" "}
                  <B>formie</B> i wygodnym dla Ciebie <B>formacie</B>.
                </M>
                <M>
                  <B>123 zł </B>(zawiera VAT)
                </M>
                <footer>
                  <button className="button upper secondary">KUP</button>
                  <button className="button upper secondary">Więcej</button>
                </footer>
              </Tile>
              {/* <Tile className="mentoring-second">
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
                  osoby, ✔️ Zwrot pieniędzy
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
              <Tile className="mentoring-fourth">
                <X>Rozmowa techniczna</X>
                <M>
                  Szukasz nowej pracy lub chcesz zmienić obecną, ale nie jesteś
                  pewien tego czy jesteś dobrze przygotowany? Nie martw się!
                  Przeprowadzę z Tobą rozmowę techniczną na, której
                  zweryfikujemy wszystko co potrzebne pod konkretną firmę.
                </M>
                <M>
                  ✔️ 1.5 godziny, ✔️ Dostęp do materiałów, ✔️ Max 3 osoby, ✔️
                  Notatka po spotkaniu, ✔️ Nagrywanie, ✔️ Zwrot pieniędzy
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
              <Tile className="mentoring-third">
                <X>Tworzenie funkcjonalności</X>
                <M>
                  Masz aplikację i potrzebujesz nowej funkcjonalności? Odezwij
                  się do Nas i problem załatwiony. Wycenimy funkcjonalność
                  indywidualnie i stworzymy ją od początku do końca wraz z
                  testami automatycznymi i dokumentacją, pilnując najlepszych
                  praktyk.
                </M>
                <M>
                  ✔️ Zwrot pieniędzy, ✔️ Testy automatyczne, ✔️ Dokumentacja, ✔️
                  Wysoki standard
                </M>
                <M>
                  Koszt: <B>Wycena indwywidualna</B>
                </M>
                <footer>
                  <button className="button upper primary">
                    Poproś o wycenę
                  </button>
                  <button className="button upper primary">
                    Więcej informacji
                  </button>
                </footer>
              </Tile> */}
            </Grid>
          </Container>
          {/* <Container>
            <XL>Ścieżki rozwoju</XL>
            <Grid>
              <Tile className="mentoring-first">
                <X>Frontend developer</X>
                <M>
                  Dowiesz się jak stawiać projekty od zera, nauczysz się tworzyć
                  skalowalny i łatwy w utrzymaniu interfejs użytkownika.
                </M>
                <M>
                  ✔️ Materiały, ✔️ Plan rozwoju, ✔️ Praca nad prawdziwym
                  projektem, ✔️ Cykliczne spotkania, ✔️ Live coding, ✔️
                  Możliwość nagrywania, ✔️ Kurs (VoD), ✔️ Dostęp do prywatnej
                  grupy, ✔️ 3 miesiące, ✔️ Zwrot pieniędzy
                </M>
                <M>
                  <B>
                    Next, Gatsby, TypeScript, Cypress, Tailwind, NX, Angular,
                    React, JavaScript, GraphQL
                  </B>
                </M>
                <M>
                  Koszt: <B>1230zł / miesiąc</B> (zawiera podatek VAT).
                </M>
                <footer>
                  <button className="button upper primary">Zapisz się</button>
                  <button className="button upper primary">
                    Więcej informacji
                  </button>
                </footer>
              </Tile>
              <Tile className="mentoring-second">
                <X>Fullstack</X>
                <M>
                  Frontend czy Backend będzie Ci nie straszny. Dobierzemy Ci
                  odpowiedni plan rozwoju, który podniesie Twoje kompetencje.
                </M>
                <M>
                  ✔️ Materiały, ✔️ Plan rozwoju, ✔️ Praca nad prawdziwym
                  projektem, ✔️ Cykliczne spotkania, ✔️ Live coding, ✔️
                  Możliwość nagrywania, ✔️ Kurs (VoD), ✔️ Dostęp do prywatnej
                  grupy, ✔️ 3 miesiące, ✔️ Zwrot pieniędzy
                </M>
                <M>
                  <B>
                    Next, Gatsby, Firebase, Node, Google Cloud, TypeScript,
                    Cypress, Tailwind, NX, Angular, React, JavaScript, GraphQL
                  </B>
                </M>
                <M>
                  Koszt: <B>1230zł / miesiąc</B> (zawiera podatek VAT).
                </M>
                <footer>
                  <button className="button upper primary">Zapisz się</button>
                  <button className="button upper primary">
                    Więcej informacji
                  </button>
                </footer>
              </Tile>
              <Tile className="mentoring-third">
                <X>Tester manualny / automatyczny</X>
                <M>
                  Nauczymy Cię jak testować aplikację, zgłaszać błędy,
                  automatyzować swoją pracę i po prostu jak być miłym dla
                  developerów.
                </M>
                <M>
                  ✔️ Materiały, ✔️ Plan rozwoju, ✔️ Praca nad prawdziwym
                  projektem, ✔️ Cykliczne spotkania, ✔️ Live coding, ✔️
                  Możliwość nagrywania, ✔️ Kurs (VoD), ✔️ Dostęp do prywatnej
                  grupy, ✔️ 3 miesiące, ✔️ Zwrot pieniędzy
                </M>
                <M>
                  <B>Playwright, Cypress, Gherkin</B>
                </M>
                <M>
                  Koszt: <B>1230zł / miesiąc</B> (zawiera podatek VAT).
                </M>
                <footer>
                  <button className="button upper primary">Zapisz się</button>
                  <button className="button upper primary">
                    Więcej informacji
                  </button>
                </footer>
              </Tile>
              <Tile className="mentoring-fourth">
                <X>Backend developer</X>
                <M>
                  Poznasz tajniki tworzenia skalowalnego API, wykorzystując
                  najnowocześniejsze technologie.
                </M>
                <M>
                  ✔️ Materiały, ✔️ Plan rozwoju, ✔️ Praca nad prawdziwym
                  projektem, ✔️ Cykliczne spotkania, ✔️ Live coding, ✔️
                  Możliwość nagrywania, ✔️ Kurs (VoD), ✔️ Dostęp do prywatnej
                  grupy, ✔️ 3 miesiące, ✔️ Zwrot pieniędzy
                </M>
                <M>
                  <B>Node, Google Cloud, Firebase, NX</B>
                </M>
                <M>
                  Koszt: <B>1230zł / miesiąc</B> (zawiera podatek VAT).
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
          <Container>
            <XL>Dla firm</XL>
            <Grid>
              <Tile className="mentoring-first">
                <X>Szkolenia</X>
                <M>
                  Chcesz podnieść kompetencje swoich pracowników? Szukasz kogoś
                  kto przeprowadzi kompleksowe szkolenie i podniesie ich
                  kwalifikacje z zakresu tworzenia aplikacji webowych? To
                  idealny plan dla Ciebie.
                </M>
                <M>
                  Koszt: <B>Wycena indywidualna</B>
                </M>
                <footer>
                  <button className="button upper primary">
                    Poproś o wycenę
                  </button>
                  <button className="button upper primary">
                    Więcej informacji
                  </button>
                </footer>
              </Tile>
              <Tile className="mentoring-second">
                <X>Prezentacje</X>
                <M>
                  Chcesz podnieść kompetencje swoich pracowników? Szukasz kogoś
                  kto przeprowadzi kompleksowe szkolenie i podniesie ich
                  kwalifikacje z zakresu tworzenia aplikacji webowych? To
                  idealny plan dla Ciebie.
                </M>
                <M>
                  Koszt: <B>Wycena indywidualna</B>
                </M>
                <footer>
                  <button className="button upper primary">
                    Poproś o wycenę
                  </button>
                  <button className="button upper primary">
                    Więcej informacji
                  </button>
                </footer>
              </Tile>
            </Grid>
          </Container> */}
        </Content>
      </Layout>
    </MainContainer>
  )
}

export { MentoringView }
