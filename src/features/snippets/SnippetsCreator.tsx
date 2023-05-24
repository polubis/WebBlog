import React, { useState, useEffect, useRef } from "react"
import { Code } from "../../ui"

const initialFrame = `
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

const secondFrame = `
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

const thirdFrame = `
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
const fourthFrame = `
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

const fifthFrame = `
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

const frames = [initialFrame, secondFrame, thirdFrame, fourthFrame, fifthFrame]

const SnippetsCreator = () => {
  const [code, setCode] = useState(0)
  const changed = useRef(false)

  useEffect(() => {
    changed.current = true

    setInterval(() => {
      setCode(prev => (prev + 1 === frames.length ? 0 : prev + 1))
    }, 2500)
  }, [])

  return <Code animated={changed.current}>{frames[code]}</Code>
}

export { SnippetsCreator }
