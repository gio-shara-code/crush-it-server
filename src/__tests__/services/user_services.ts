import {mongooseTestLoader} from "../../loaders/mongoose_loader"
import * as userServices from "../../services/db/user_services"
import UserModel from "../../models/user_model"
import mongoose, {Connection} from "mongoose"
import {User} from "../../interfaces/user"
let connection: Connection

beforeAll(async () => {
  connection = await mongooseTestLoader()
})

afterAll(async () => {
  await (connection as any).disconnect()
})

afterEach(async () => {
  await mongoose.connection.db.dropCollection("users")
})
describe("User Services", () => {
  it("Adding user in database", async () => {
    const user = new UserModel({
      email: `gio1@gmail.com`,
      name: "Some name",
      password: "Random Password",
      createdOn: Date.now(),
      exerciseIds: [],
      workoutSettings: {
        soundEnabled: true
      }
    })
    const userDoc = await userServices.saveUser(user)
    expect(userDoc).toBeTruthy()
    expect(userDoc?.name).toBe("Some name")
  })

  it("Finding user by email", async () => {
    const user = new UserModel({
      email: `gio2@gmail.com`,
      name: "Some name",
      password: "Random Password",
      createdOn: Date.now(),
      exerciseIds: [],
      workoutSettings: {
        soundEnabled: true
      }
    })
    const userDoc = (await userServices.saveUser(user)) as User

    const foundUser = await userServices.getUserByEmail(userDoc.email)
    expect(foundUser).toBeTruthy()
    expect(foundUser?.email).toBe(userDoc.email)
  })

  it("Finding user by id", async () => {
    const user = new UserModel({
      email: `gio3@gmail.com`,
      name: "Some name",
      password: "Random Password",
      createdOn: Date.now(),
      exerciseIds: [],
      workoutSettings: {
        soundEnabled: true
      }
    })

    const userDoc = (await userServices.saveUser(user)) as User

    const foundUser = await userServices.getUserById(userDoc._id as string)
    expect(foundUser).toBeTruthy()
    expect(`${foundUser?._id}`).toBe(`${userDoc._id}`)
  })
})
