import { useState, useMemo, useRef, useCallback } from "react"

// The type that we'll use to check if the passed generic type is an object.
type ObjectBased = Record<string | number | symbol, any>

// F.e { firstName: 'Field is invalid' }.
type Errors<V extends ObjectBased> = {
  [K in keyof V]: string
}

// F.e { firstName: true } - it means the firstName field has been changed once or more.
type Affects<V extends ObjectBased> = {
  [K in keyof V]: boolean
}

// Stores a list of the object's keys.
type FormKeys<V extends ObjectBased> = (keyof V)[]

// Form data shape.
interface FormState<V extends ObjectBased> {
  keys: FormKeys<V>
  valid: boolean
  invalid: boolean
  touched: boolean
  confirmed: boolean
  values: V
  errors: Errors<V>
  affected: Affects<V>
}

// Helper type for validation.
type ValidationResult<V extends ObjectBased> = Pick<
  FormState<V>,
  "errors" | "valid" | "invalid"
>

// Definition of validator function.
type Validator<T> = (value: T) => string

// Definition of validators object.
type Validators<V extends ObjectBased> = {
  [K in keyof V]?: Validator<V[K]>[]
}

// Specifies the shape of the form configuration.
interface Config<V extends ObjectBased> {
  values: V
  validators?: Validators<V>
}

// Validation helper function.
const validate = <V extends ObjectBased>(
  keys: FormKeys<V>,
  values: V,
  validators: Validators<V>
): ValidationResult<V> => {
  const { length } = keys
  const errors = {} as Errors<V>
  let valid = true

  // We used "for loop" to be able to stop at first error.
  for (let i = 0; i < length; i++) {
    const key = keys[i]
    const value = values[key]
    const fns = validators[key] ?? []
    let error = ""

    for (let j = 0; j < fns.length; j++) {
      const fn = fns[j]
      const result = fn(value)

      if (result) {
        error = result
        valid = false
        break
      }
    }

    errors[key] = error
  }

  return { errors, valid, invalid: !valid }
}

// This creates first state shape.
const initializeState = <V extends ObjectBased>({
  values,
  validators = {},
}: Config<V>): FormState<V> => {
  const keys = Reflect.ownKeys(values) as FormKeys<V>
  const result = validate(keys, values, validators)
  const affected = keys.reduce<Affects<V>>((acc, key) => {
    acc[key] = false
    return acc
  }, {} as Affects<V>)

  return {
    ...result,
    keys,
    values,
    confirmed: false,
    touched: false,
    affected,
  }
}

const useForm = <V extends ObjectBased>({
  values,
  validators = {},
}: Config<V>) => {
  // It contains the initial state. It's created only once.
  const initialState = useMemo(
    () => initializeState({ values, validators }),
    []
  )
  // We used ref instead of state because it allows to read always up to date data.
  const state = useRef(initialState)
  // This is added only to trigger rerender.
  const [_, setUpdateCount] = useState(0)

  // Performs rerender.
  const rerender = () => {
    setUpdateCount(prev => prev + 1)
  }

  // Allows you to change a single field and runs validation.
  // useCallback hook added to avoid rerenders in children when passing function as a prop.
  const set = useCallback(
    <K extends keyof V>({ key, value }: { key: K; value: V[K] }): void => {
      const newValues = { ...state.current.values, [key]: value }
      const result = validate(state.current.keys, newValues, validators)

      // Updating state according to the new values and the validation result.
      state.current = {
        ...state.current,
        ...result,
        touched: true,
        values: newValues,
        affected: {
          ...state.current.affected,
          [key]: true,
        },
      }

      // Triggers rerenders.
      rerender()
    },
    []
  )

  // Simulates form confirmation - triggers validation.
  const submit = useCallback((): void => {
    const result = validate(
      state.current.keys,
      state.current.values,
      validators
    )

    state.current = {
      ...state.current,
      ...result,
      confirmed: true,
    }

    rerender()
  }, [])

  // Resets the state to the initial values.
  const reset = useCallback((): void => {
    state.current = initialState
    rerender()
  }, [])

  return [state.current, { set, reset, submit }] as const
}

export { useForm }

export type { FormState, Errors, Affects, ObjectBased, Validator, Validators }
