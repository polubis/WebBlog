// --- Font.tsx ---

// It is responsible for assigning the appropriate type of HTML element for the variant.
const FONT_VARIANT_ELEMENT_MAP: VariantElementMap = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  b1: "span",
  b2: "span",
}

const Font = ({ variant, children, element }: FontProps) => {
  // Allows you to pass any textual HTML tag.
  return createElement(element ?? FONT_VARIANT_ELEMENT_MAP[variant], {
    className: variant,
    children,
  })
}

export { Font, FONT_VARIANT_ELEMENT_MAP }

// --- Font.stories.tsx ---

const Template: Story<FontProps> = args => <Font {...args} />

export const H1 = Template.bind({})
H1.args = { variant: "h1", children: "Headline1 " }

export const H2 = Template.bind({})
H2.args = { variant: "h2", children: "Headline2" }

// @@@ Blog creator React SPA app @@@

// --- main.tsx ---

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// --- app.tsx ---

const App = () => {
  return (
    <>
      <Font variant="h1">Bell</Font>
      <Bell size={126} />
    </>
  )
}

export { App }

// @@@ Blog Next.js app @@@

// --- _app.tsx ---

import { GlobalStyle } from "@system/figa-ui"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Welcome to blog!</title>
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default App

// --- index.tsx ---

const Index = () => {
  return (
    <>
      <Font variant="h1">Bell</Font>
      <Bell size={126} />
    </>
  )
}

export default Index
