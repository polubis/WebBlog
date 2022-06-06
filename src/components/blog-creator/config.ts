import Section from "../article/Section"
import Code from "../article/Code"
import Summary from "../article/Summary"
import Prelude from "../article/Prelude"
import Img from "../article/Img"
import { XL, M, Hint, A, B } from "../../ui/Text"
import { List } from "../article/List"

export const INIT_MDX = `<Prelude>
  <M>
     Prelude content
  </M>
</Prelude>

<Section>
  <XL>1. Section title</XL>
  <M>
    Section <B>content</B>
  </M> 
  <M>
    Section <B>content</B>
  </M>
  <Code description="Code description">
    <deckgo-highlight-code src="https://raw.githubusercontent.com/polubis/React-useRef-hook/main/src/snippets/typical-use-ref-usage.tsx"></deckgo-highlight-code>
  </Code>
  <Hint hasBg>
    Add your hint here...
  </Hint>
</Section>

<Section>
  <XL>2. Section title</XL>
  <M>
    Section <B>content</B> and <A outside href='https://greenonsoftware.com/articles/'>link</A>
  </M>
  <Img
    src="https://raw.githubusercontent.com/polubis/WebBlog/State-machine-pattern/src/articles/patterns/state-machine-pattern/SM.png"
    description="Coffee machine as a state machine"
  />
</Section>

<Section>
  <XL>3. Section title</XL>
  <M>
    Some content
  </M>
  <List items={['First', 'Second']} />
</Section>

<Summary>
  <M>Summary content</M>
</Summary>`

export const COMPONENTS = {
  Prelude,
  Section,
  Summary,
  Code,
  List,
  Img,
  XL,
  M,
  Hint,
  A,
  B,
}

export const TAGS = Object.keys(COMPONENTS)
