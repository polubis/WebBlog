import type { SnippetCreatorState } from "./defs"

const first = `
// Let's implement map function :)

// The function will be able to do stuff like this: 
const result = map([1, 2, 3], 
  (item, idx) => \`I'm string now -> \${item}, idx: \${idx}\`);
`

const second = `
// Firstly let's add type definitions.
// Type T means type of data.
// Type R means type of response.
const map = <T, R>(
  array: T[],
  mapper: (item: T, idx: number, arr: T[]) => R
): R[] => {
};
`

const third = `
const map = <T, R>(
  array: T[],
  mapper: (item: T, idx: number, arr: T[]) => R
): R[] => {
  // Result will be our final array.
  const result: R[] = [];
  // We taking length to iterate.
  const { length } = array;
};
`
const fourth = `
const map = <T, R>(
  array: T[],
  mapper: (item: T, idx: number, arr: T[]) => R
): R[] => {
  const result: R[] = [];
  const { length } = array;

  for (let i = 0; i < length; i++) {
    const item = array[i];
    // We are calling mapper callback with current item, index and 
    // given initial array.
    result.push(mapper(item, i, array));
  }
};
`

const fifth = `
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

  // Now it's time to return the result!
  return result;
};
`

const DEFAULT_ADD_SNIPPET = `
// This is just sample code.
// Add your own :).

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
