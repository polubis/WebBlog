// Here is a list of imports that I'm omitting...

const Ctx = createContext<UnsafeThemeProviderValue>(null)

const defaultKey = "dark" as ThemeKey

// Returns the default props, a function to avoid code duplication.
const getDefaultValue: GetDefaultValue = ({
  key = defaultKey,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme = () => {},
} = {}) => ({
  key,
  setTheme,
  themes,
  theme: themes[key],
  themesList: Object.entries(themes) as ThemesList,
})

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [key, setKey] = useState(defaultKey)

  const value: ThemeProviderValue = useMemo(
    () =>
      getDefaultValue({
        key,
        setTheme: setKey,
      }),
    [key]
  )

  return (
    <Ctx.Provider value={value}>
      {/* We're transferring the theme to the styled components provider. */}
      <StyledThemeProvider theme={value.theme}>
        {/* We're using global styles. */}
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </Ctx.Provider>
  )
}

const useThemeProvider = (): ThemeProviderValue => {
  const ctx = useContext(Ctx)

  return ctx ? ctx : getDefaultValue()
}

export { ThemeProvider, useThemeProvider }
