import React from "react"
import { Authorized, Unauthorized } from "./guard"
import { AuthProvider, useAuthContext } from "./provider"

// We're using our hook and components to render content.
const App = () => {
  // Use hook if you want to add additional logic in parent component.
  const { authorized } = useAuthContext()

  return (
    <>
      <h1>Authorized?: {authorized}</h1>
      {/* Use this if you want to show component for only unauthorized status.*/}
      <Unauthorized>Unauthorized</Unauthorized>
      {/* Use this if you want to show component for only authorized status.*/}
      <Authorized>Authorized</Authorized>
      {/* Function as a child is called only when authorized + you have access to data.*/}
      <Authorized>{ctx => JSON.stringify(ctx)}</Authorized>
      {/* Function as a child is called only when unauthorized + you have access to data.*/}
      <Unauthorized>{ctx => JSON.stringify(ctx)}</Unauthorized>
    </>
  )
}

export default () => (
  <AuthProvider>
    {/* Application wrapped with provider. */}
    <App />
  </AuthProvider>
)
