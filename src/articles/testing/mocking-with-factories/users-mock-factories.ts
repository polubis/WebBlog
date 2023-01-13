import { UserResponse } from "./users.service"

// Base object which will be used in factory.
const baseUserResponse: UserResponse = {
  id: 0,
  firstName: "Tom",
  lastName: "Riddle",
  phone: "+48669230241",
  email: "tom.riddle@gmail.com",
  username: "Tommy",
}

// Keys type for avoid TS code duplication.
type UserResponseKey = keyof UserResponse

export const userResponseFactory = (userResponse = { ...baseUserResponse }) => {
  return {
    // Overrides several properties.
    patch: <P extends Partial<UserResponse>>(obj: P) =>
      userResponseFactory({ ...userResponse, ...obj }),
    // Overrides one property.
    set: <K extends UserResponseKey>(key: K, value: UserResponse[K]) =>
      userResponseFactory({ ...userResponse, [key]: value }),
    // Returns plain JS object.
    read: () => userResponse,
  }
}
