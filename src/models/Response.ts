interface Response<T> {
  data: T
  errors: string[]
  hasErrors: boolean
  success: boolean
}

export { Response }
