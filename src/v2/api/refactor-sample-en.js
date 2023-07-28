const FRAME_1 = `// How to work with the styled-components library
// without performance problems?`

const FRAME_2 = `// Here is the main problem.
// Avoid creating too many nodes.
// Every node is a JS function!
const Container = styled.div\`
  /* Some styles! */
\`
const Wrapper = styled.div\`\`
const Nested = styled.div\`\`

const Component = () => {
    return (
      <Container>
        <Wrapper>
          <Nested>{/* Typical nested components */}</Nested>
        </Wrapper>
      </Container>
    )
}`

const FRAME_3 = `// Less nodes, better performance and
// styles are still encapsulated!
const Container = styled.div\`
  /* Some styles! */
  .wrapper {
  }

  .nested {
  }
\`
const Component = () => {
  return (
    <Container>
      <div>
        <div>{/* Now your code will work much faster */}</div>
      </div>
    </Container>
  )
}
`

module.exports = {
  REFACTOR_SAMPLE_EN: [FRAME_1, FRAME_2, FRAME_3],
}
