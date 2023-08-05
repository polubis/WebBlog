import { Validator } from "./useForm"

export const required = (message: string): Validator<string> => value =>
  value === "" ? message : ""
export const minLength = (
  limit: number,
  message: string
): Validator<string> => value =>
  value.length <= limit ? `${message} >= ${limit}` : ""
export const maxLength = (
  limit: number,
  message: string
): Validator<string> => value =>
  value.length >= limit ? `${message} <= ${limit}` : ""
