import { userResponse } from "./users.mock"
import { getUser } from "./users.service"

describe("users service", () => {
  it("returns user object after API call", () => {
    expect(getUser(0)).toEqual(userResponse)
  })
})
