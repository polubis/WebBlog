import axios from "axios"
import { getUser } from "./typical-mock-usage"
import { userFactory } from "./users-factory"

jest.mock("axios", () => ({
  get: jest.fn(),
}))

describe("users service", () => {
  it("allows to fetch users", async () => {
    const response = { data: userFactory().valueOf(), status: 200 }

    axios.get.mockResolvedValueOnce(response)

    await getUser(1)

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith()
  })
})
