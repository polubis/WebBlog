import type { ReactNode } from "react"
import React from "react"
import { AuthContext, useAuthContext } from "./provider"

// React pattern to customize render content and pass data from child to parent.
type RenderProp = (context: AuthContext) => ReactNode

// It may be children or function as a child.
type Children = ReactNode | RenderProp

interface GuardProps {
  children: Children
}

// Type guard to guarantee type-safety.
const isFn = (children: Children): children is RenderProp =>
  typeof children === "function"

// Displays children if you are authorized.
const Authorized = ({ children }: GuardProps) => {
  const ctx = useAuthContext()
  const { authorized } = ctx

  if (authorized) {
    // Fragment is used to be able to pass strings as children and handle unwanted types.
    return <>{isFn(children) ? children(ctx) : children}</>
  }

  return null
}

// Displays children if you are unauthorized.
const Unauthorized = ({ children }: GuardProps) => {
  const ctx = useAuthContext()
  const { authorized } = ctx

  if (authorized) {
    return null
  }

  return <>{isFn(children) ? children(ctx) : children}</>
}

export type { GuardProps }

export { Authorized, Unauthorized }
