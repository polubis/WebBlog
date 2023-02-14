import { User } from "./user"

export const USER_MOCK: User = {
  id: 0,
  firstName: "Tom",
  lastName: "Riddle",
  email: "tommo@gmail.com",
  username: "Tommy",
  age: 19,
}

export const USERS_MOCK: User[] = [
  USER_MOCK,
  { ...USER_MOCK, id: 1 },
  { ...USER_MOCK, id: 2 },
]
