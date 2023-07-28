const FRAME_1 = `// Jak pracować z biblioteką styled-components 
// i uniknąć możliwych problemów z performance?`

const FRAME_2 = `// Główny problem jest tutaj.
// Unikaj tworzenia zbyt wielu wrapperów.
// Każdy z nich to tak naprawdę funkcja w JS!
const Container = styled.div\`
  /* Jakieś kolorki! */
\`
const Wrapper = styled.div\`\`
const Nested = styled.div\`\`

const Component = () => {
    return (
      <Container>
        <Wrapper>
          <Nested>{/* Jakieś komponenty */}</Nested>
        </Wrapper>
      </Container>
    )
}`

const FRAME_3 = `// Mniej wrapperów to lepszy performance, a
// style są wciąż enkapsulowane per komponent!
const Container = styled.div\`
  /* Jakieś kolorki! */
  .wrapper {
  }

  .nested {
  }
\`
const Component = () => {
  return (
    <Container>
      <div>
        <div>{/* Teraz twoja strona załaduje się szybciej */}</div>
      </div>
    </Container>
  )
}
`

module.exports = {
  REFACTOR_SAMPLE_PL: [FRAME_1, FRAME_2, FRAME_3],
}
