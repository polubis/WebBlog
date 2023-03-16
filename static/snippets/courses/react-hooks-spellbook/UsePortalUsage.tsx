import React from "react"

import { usePortal } from "./usePortal"

// Modal.tsx
export const Modal = () => {
  const { render } = usePortal()

  return render(<div>Your modal code goes here</div>)
}

// Alert.tsx
export const Alert = () => {
  const { render } = usePortal()

  return render(<div>Your alert code goes here</div>)
}

// Dashboard.tsx
const Dashboard = () => {
  return (
    <>
      {/* Both components are rendered outside the root div. */}
      <Modal />
      <Alert />
    </>
  )
}
