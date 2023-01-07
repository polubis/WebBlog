// users-factory.ts

import { User } from "./user"

const BASIC_USER: User = {
  id: 0,
  firstName: "Tom",
  lastName: "Riddle",
  email: "tommo@gmail.com",
  username: "Tommy",
  age: 19,
}

export const userFactory = (shape = { ...BASIC_USER }) => {
  return {
    // Allows to set one property.
    set: <K extends keyof User>(key: K, value: User[K]) => {
      return userFactory({ ...shape, [key]: value })
    },
    // Allows to set multiple properties.
    patch: (partialShape: Partial<User>) => {
      return userFactory({ ...shape, ...partialShape })
    },
    // Allows to read value, ends methods chain.
    valueOf: () => shape,
  }
}
