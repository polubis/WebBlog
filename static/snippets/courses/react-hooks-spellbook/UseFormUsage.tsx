import React from "react"

import { useForm, Validator } from "./useForm"

const required: Validator<string> = value =>
  value === "" ? "This field is required" : ""
const minLength = (limit: number): Validator<string> => value =>
  value.length < limit ? `Length must be > ${limit}` : ""

interface LoginPayload {
  username: string
  password: string
  rememberMe: boolean
}

// LogInForm.tsx
const LogInForm = () => {
  const [
    { values, errors, affected, invalid },
    { set, submit, reset },
  ] = useForm<LoginPayload>({
    values: {
      username: "",
      password: "",
      rememberMe: false,
    },
    validators: {
      username: [required, minLength(8)],
      password: [required, minLength(8)],
    },
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        submit()
      }}
    >
      <input
        placeholder="Username"
        value={values.username}
        onChange={e => set({ key: "username", value: e.target.value })}
      />
      {affected.username && errors.username && <span>{errors.username}</span>}
      <input
        placeholder="Password"
        value={values.password}
        onChange={e => set({ key: "username", value: e.target.value })}
      />
      {affected.password && errors.password && <span>{errors.password}</span>}
      <button type="button" onClick={reset}>
        Clean data
      </button>
      <button type="submit" disabled={invalid}>
        Log In
      </button>
    </form>
  )
}
