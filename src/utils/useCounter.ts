import { useState } from "react"

const useCounter = (min: number, max: number, initial = 0) => {
  const [counter, setCounter] = useState(initial)

  const next = () => {
    setCounter(prev => {
      const incremented = prev + 1
      const nextValue = incremented >= max ? min : incremented

      return nextValue
    })
  }

  const previous = () => {
    setCounter(prev => {
      const decremented = prev - 1
      const prevValue = decremented <= min ? max - 1 : decremented

      return prevValue
    })
  }

  const set = (value: number) => {
    if (value >= max) {
      setCounter(min)
      return
    }

    if (value <= min) {
      setCounter(max - 1)
      return
    }

    setCounter(value)
  }

  const reset = () => {
    set(initial)
  }

  return {
    next,
    previous,
    set,
    reset,
    counter,
  }
}

export { useCounter }
