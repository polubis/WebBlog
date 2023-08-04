const default_template = `<Prelude label="Przykład tytułu dla sekcji wstęp">
  <M>To jest przykładowy paragraf.</M>
  <M>To jest przykładowy paragraf.</M>
</Prelude>

<Section>
  <XL>Przykład nagłówka dla sekcji</XL>
  <M>
    Przykład użycia
    <A outside href="https://github.com/polubis/CRA-TEMPLATE">
      linku
    </A>.
  </M>
  <Img
    src="/assets/chromatic-and-storybook/storybook.gif"
    description="Przykładowe zdjęcie"
  />
  <Code
    mode="dynamic"
    description="Przykładowy fragment kodu"
    linesCount={23}
    src="https://raw.githubusercontent.com/polubis/Chromatic-and-storybook/main/src/ui/input-field/InputField.stories.tsx"
  />
  <L ordered>
    <Li>Element listy numerowanej</Li>
  </L>
  <L>
    <Li>Element normalnej listy</Li>
  </L>
  <Hint hasBg>
    Przykład użycia "podpowiedzi" oraz <B>pogrubienia</B> czcionki.
  </Hint>
</Section>

<Example label="Przykład nagłówka dla sekcji przykładu">
  <M>
    <A href="https://github.com/polubis/Chromatic-and-storybook" outside>
      Repozytorium
    </A>{" "}
    do zabawy.
  </M>
</Example>

<Summary label="Przykład nagłówka dla podsumowania">
  <M>Jakiś tekst</M>
</Summary>
`

const prelude = `<Prelude label="Przykład tytułu dla sekcji wstęp">
  <M>To jest przykładowy paragraf.</M>
  <M>To jest przykładowy paragraf.</M>
</Prelude>
`
const paragraph = `<M>To jest przykładowy paragraf.</M>`
const section = `<Section>
  <XL>Przykład nagłówka dla sekcji</XL>
  <M>
    Przykład użycia
    <A outside href="https://github.com/polubis/CRA-TEMPLATE">
      linku
    </A>.
  </M>
</Section>
`
const hint = `<Hint hasBg>
  Przykład użycia "podpowiedzi" oraz <B>pogrubienia</B> czcionki.
</Hint>
`
const bold = `<B>pogrubienie</B>`
const list = `<L ordered>
  <Li>Element listy numerowanej</Li>
</L>
<L>
  <Li>Element normalnej listy</Li>
</L>
`
const image = `<Img
  src="/assets/chromatic-and-storybook/storybook.gif"
  description="Przykładowe zdjęcie"
/>
`
const link = `<A href="https://github.com/polubis/Chromatic-and-storybook" outside>
  Repozytorium
</A>
`
const demo = `<Demo label="Przykład użycia iframe z demo" height="500px">
  <iframe
    src="https://codesandbox.io/embed/state-machine-pattern-ylecvm?fontsize=14&hidenavigation=1&theme=dark"
    style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
    title="State machine pattern"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</Demo>
`
const example = `<Example label="Przykład nagłówka dla sekcji przykładu">
  <M>
    <A href="https://github.com/polubis/Chromatic-and-storybook" outside>
      Repozytorium
    </A>{" "}
    do zabawy.
  </M>
</Example>`
const summary = `<Summary label="Przykład nagłówka dla podsumowania">
  <M>Jakiś tekst</M>
</Summary>`
const code = `<Code
  mode="dynamic"
  description="Przykładowy fragment kodu"
  linesCount={23}
  src="https://raw.githubusercontent.com/polubis/Chromatic-and-storybook/main/src/ui/input-field/InputField.stories.tsx"
/>`
const static_code = `<Code rolled mode="static" lang="ts">{\`import type {
  ScrollAxis,
  ScrollConfig,
  ScrollReturn,
  ScrollResult,
  ScrollState,
} from './defs';\`}</Code>`

module.exports = {
  default: default_template,
  prelude,
  paragraph,
  section,
  hint,
  bold,
  list,
  image,
  link,
  demo,
  example,
  summary,
  code,
  static_code,
}
