import { it } from "date-fns/locale"
import { userResponseFactory } from "./users-mock-factories"
import { getUser } from "./users.service"

describe("users service", () => {
  it("returns user object after API call", () => {
    const factory = userResponseFactory()

    expect(getUser(0)).toEqual(factory.read())
  })
})

describe("users reducer", () => {
  it("allows to change username", () => {
    const factory = userResponseFactory()
    expect(
      reducer(
        {
          username: '',
        },
        {
          type: "user/setUsername",
        }
        payload: "piotr",
      )
    ).toEqual(factory.set("username", "piotr"))
  })
})
