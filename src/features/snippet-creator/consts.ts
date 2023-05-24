import type { SnippetCreatorState } from "./defs"

const first = `
// Implementation
const map = <T, R>(
  array: T[],
  mapper: (item: T, idx: number, arr: T[]) => R
): R[] => {
  const result: R[] = [];
  const { length } = array;

  for (let i = 0; i < length; i++) {
    const item = array[i];
    result.push(mapper(item, i, array));
  }

  return result;
};
`

const second = `
// Implementation
const map = <T, R>(
  array: T[],
  mapper: (item: T, idx: number, arr: T[]) => R
): R[] => {
  const result: R[] = []; // 'Komentarz'
  const { length } = array;

  for (let i = 0; i < length; i++) {
  }

  return result;
};
`

const third = `
// Implementation
const map = <T, R>(
): R[] => {
  const result: R[] = []; // 'Komentarz'
  const { length } = array;

  for (let i = 0; i < length; i++) {
  }

  return result;
};
`
const fourth = `
// Implementation
const map = <T, R>(
): R[] => {
  const result: R[] = []; // 'Komentarz'
  const { length } = array;

  for (let i = 0; i < length; i++) {
  }

  return result;
};
`

const fifth = `
// Implementation
const map = <T, R>(


): R[] => {
  const result: R[] = []; // 'Komentarz'
  const { length } = array;

  for (let i = 0; i < length; i++) {
  }

  return result;
};
`

const DEFAULT_ADD_SNIPPET = `
// This is just sample code

const SnippetCreator = () => {
  const [state, action] = useSnippetCreator()

  useEffect(action.start, [])

  if (state.key === "idle") {
    return <div>Witaj na naszym kreatorze</div>
  }

  if (state.key === "loading") {
    return <div>Preparing...</div>
  }

  if (state.key === "failed") {
    return <div>Server error</div>
  }
  
  throw Error('Unsupported state');
}
`
const DEFAULT_FRAMES: string[] = [first, second, third, fourth, fifth]
const DEFAULT_STATE = { key: "idle" } as SnippetCreatorState

export { DEFAULT_FRAMES, DEFAULT_STATE, DEFAULT_ADD_SNIPPET }
