const default_template = `<Prelude label="This is example of prelude title">
  <M>This is example of paragraph.</M>
  <M>This is example of paragraph.</M>
  </Prelude>

  <Section>
  <XL>This is example of section heading</XL>
  <M>
    Example of a
    <A outside href="https://github.com/polubis/CRA-TEMPLATE">
      link
    </A>
    .
  </M>
  <Img
    src="https://drive.google.com/uc?export=view&id=17i6JJvqhvrPtY8cGZj_jXN-rbv_p6NHY"
    description="Storybook presented"
  />
  <Code
    mode="dynamic"
    description="Sample with code"
    linesCount={23}
    src="https://raw.githubusercontent.com/polubis/Chromatic-and-storybook/main/src/ui/input-field/InputField.stories.tsx"
  />
  <L ordered>
    <Li>I'm ordered list item</Li>
  </L>
  <L>
    <Li>I'm normal list element</Li>
  </L>
  <Hint hasBg>
    This is an example of hint and <B>bolding</B>.
  </Hint>
</Section>

<Example label="Example of heading">
  <M>
    <A href="https://github.com/polubis/Chromatic-and-storybook" outside>
      Repository
    </A>{" "}
    to play with.
  </M>
</Example>

<Summary label="Example of summary heading">
  <M>Some summary content</M>
</Summary>
`

const prelude = `<Prelude label="This is example of prelude title">
  <M>This is example of paragraph.</M>
  <M>This is example of paragraph.</M>
</Prelude>
`
const heading = `<XL>This is example of section heading</XL>`
const paragraph = `<M>This is example of paragraph.</M>`
const section = `<Section>
  <XL>This is example of section heading</XL>
  <M>
    Example of a
    <A outside href="https://github.com/polubis/CRA-TEMPLATE">
      link
    </A>
    .
  </M>
</Section>
`
const link = `<A outside href="https://github.com/polubis/CRA-TEMPLATE">
  link
</A>
`
const image = `<Img
  src="https://drive.google.com/uc?export=view&id=17i6JJvqhvrPtY8cGZj_jXN-rbv_p6NHY"
  description="Storybook presented"
/>
`
const bold = `<B>bolding</B>`
const list = `<L ordered>
<Li>I'm ordered list item</Li>
  </L>
<L>
  <Li>I'm normal list element</Li>
</L>
`
const hint = `<Hint hasBg>
  This is an example of hint and <B>bolding</B>.
</Hint>
`
const demo = `<Demo label="Full example with iframe demo" height="500px">
  <iframe
    src="https://codesandbox.io/embed/state-machine-pattern-ylecvm?fontsize=14&hidenavigation=1&theme=dark"
    style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
    title="State machine pattern"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</Demo>
`
const example = `<Example label="Example of heading">
  <M>
    <A href="https://github.com/polubis/Chromatic-and-storybook" outside>
      Repository
    </A>{" "}
    to play with.
  </M>
</Example>`
const summary = `
<Summary label="Example of summary heading">
  <M>Some summary content</M>
</Summary>`
const code = `<Code
  mode="dynamic"
  description="Sample with code"
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
  heading,
  example,
  summary,
  code,
  static_code,
}
