// Shape of endpoint response.
export interface UserResponse {
  firstName: string
  lastName: string
  phone: string
  email: string
  username: string
  id: number
}

// Function which returns UserDetailsResponse object and calls API.
export const getUser = async (id: number): Promise<UserResponse> => {
  const response = await fetch(`/api/users/${id}`)
  const json = await response.json()
  // Casting to interface for type safety.
  return json as UserResponse
}
