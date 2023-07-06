import axios from "axios"
import { USER_MOCK } from "./typical-mock"
import { getUser } from "./typical-mock-usage"

jest.mock("axios", () => ({
  get: jest.fn(),
}))

describe("users service", () => {
  it("allows to fetch users", async () => {
    const response = { data: USER_MOCK, status: 200 }

    axios.get.mockResolvedValueOnce(response)

    await getUser(1)

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith()
  })
})
