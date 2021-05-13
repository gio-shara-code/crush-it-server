import request, {Response} from "supertest"
import express from "express"
import {expressLoader} from "../../loaders/express_loader"
import {mongooseTestLoader} from "../../loaders/mongoose_loader"
import * as userServices from "../../services/user_services"
import * as exerciseServices from "../../services/exercise_services"
import * as bcrypt from "bcrypt"

let app: any
let connection: any

beforeAll(async () => {
  connection = await mongooseTestLoader()
  app = await expressLoader(express())
})

afterAll(async () => {
  await connection.disconnect()
})

describe("Auth Routes", () => {
  const testUserData = {
    email: "giorgi@code.berlin",
    password: "password",
    name: "Giorgi S."
  }
  describe("POST /login", () => {
    const uri = "/login"

    it("Missing neccessary fields", async (done) => {
      const response: Response = await request(app).post(uri).set("Accept", "application/json")
      expect(response.body.success).toBeFalsy()
      expect(response.status).toBe(422)
      done()
    })

    it("Input wrong password", async (done) => {
      const hashedPassword = await bcrypt.hash(testUserData.password, 10)

      const getUserByEmail = jest.spyOn(userServices, "getUserByEmail")
      getUserByEmail.mockImplementation(async (email: string) => {
        return {
          password: hashedPassword
        } as any
      })

      testUserData.password = `differennt password`
      const response: Response = await request(app)
        .post(uri)
        .set("Accept", "application/json")
        .send(testUserData)

      expect(response.body.success).toBeFalsy()
      expect(response.status).toBe(403)

      done()
    })

    it("Input correct password", async (done) => {
      const hashedPassword = await bcrypt.hash(testUserData.password, 10)

      const getUserByEmail = jest.spyOn(userServices, "getUserByEmail")
      getUserByEmail.mockImplementation(async (email: string) => {
        return {
          password: hashedPassword
        } as any
      })

      const response: Response = await request(app)
        .post(uri)
        .set("Accept", "application/json")
        .send(testUserData)
      expect(response.body.success).toBeTruthy()
      expect(response.status).toBe(200)
      done()
    })

    it("Input email doesn't exist", async (done) => {
      const getUserByEmail = jest.spyOn(userServices, "getUserByEmail")
      getUserByEmail.mockImplementation(async (email: string) => {
        return undefined
      })
      const response: Response = await request(app)
        .post(uri)
        .set("Accept", "application/json")
        .send(testUserData)

      expect(response.body.success).toBeFalsy()
      expect(response.status).toBe(404)
      done()
    })
  })

  describe("POST /register", () => {
    const uri = "/register"
    it("Missing neccessary fields", async (done) => {
      const response: Response = await request(app).post(uri)
      expect(response.body.success).toBeFalsy()
      expect(response.status).toBe(422)
      done()
    })

    it("User already exists", async (done) => {
      const getUserByEmail = jest.spyOn(userServices, "getUserByEmail")
      getUserByEmail.mockImplementation(async (email: string) => {
        return {email: "Some email"} as any
      })

      const response: Response = await request(app)
        .post(uri)
        .set("Accept", "application/json")
        .send(testUserData)

      expect(response.body.success).toBeFalsy()
      expect(response.status).toBe(409)
      done()
    })

    it("User was successfully create", async (done) => {
      const getUserByEmail = jest.spyOn(userServices, "getUserByEmail")
      getUserByEmail.mockImplementation(async (email: string) => {
        return null
      })

      const insertDefaultExercises = jest.spyOn(exerciseServices, "insertDefaultExercises")
      insertDefaultExercises.mockImplementation(async () => {
        return []
      })

      const saveUser = jest.spyOn(userServices, "saveUser")
      saveUser.mockImplementationOnce((userModel) => {
        return {_id: "Some id", email: "some.email@gmail.com"} as any
      })

      const response: Response = await request(app)
        .post(uri)
        .set("Accept", "application/json")
        .send(testUserData)

      expect(response.body.success).toBeTruthy()
      expect(response.status).toBe(200)
      done()
    })
  })
})
