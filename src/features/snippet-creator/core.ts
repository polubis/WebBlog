interface State {
  key: string
}

const is = <S extends State, K extends S["key"]>(
  state: S,
  key: K
): state is Extract<S, { key: K }> => state.key === key

const when = <S extends State>(state: S) => {
  return {
    is: <K extends S["key"]>(
      key: K,
      setter: (state: Extract<S, { key: K }>) => void
    ) => {
      if (is(state, key)) {
        setter(state)
        return
      }

      throw Error("Invalid state change detected")
    },
  }
}

export { is, when }
