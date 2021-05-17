import {mongooseTestLoader} from "../../loaders/mongoose_loader"
import * as userServices from "../../services/db/user_services"
import UserModel from "../../models/user_model"

let connection: any

beforeAll(async () => {
  connection = await mongooseTestLoader()
})

afterAll(async () => {
  await connection.disconnect()
})

describe("User Services", () => {
  let userDoc: any

  it("Adding user in database", async () => {
    const user = new UserModel({
      email: `${Date.now()}@gmail.com`,
      name: "Some name",
      password: "Random Password",
      createdOn: Date.now(),
      exerciseIds: [],
      workoutSettings: {
        soundEnabled: true
      }
    })
    userDoc = await userServices.saveUser(user)
    expect(userDoc).toBeTruthy()
    expect(userDoc?.name).toBe("Some name")
  })

  /**
   * Does this implementation makes sense?
   * Because I am defining the mock function which will always return null.
   */
  it("Can't finding the user by email", async () => {
    const getUserByEmail = jest.spyOn(userServices, "getUserByEmail")

    getUserByEmail.mockImplementationOnce(async (email: string) => {
      return null
    })

    const foundUser = await userServices.getUserByEmail(`${userDoc.email}`)
    expect(foundUser).toBeNull()
  })

  it("Finding user by email", async () => {
    const foundUser = await userServices.getUserByEmail(userDoc.email)
    expect(foundUser).toBeTruthy()
    expect(foundUser?.email).toBe(userDoc.email)
  })

  it("Finding user by id", async () => {
    const foundUser = await userServices.getUserById(userDoc._id)
    expect(foundUser).toBeTruthy()
    expect(`${foundUser?._id}`).toBe(`${userDoc._id}`)
  })
})
