import * as circuitServices from "../../services/db/circuit_services"
import * as workoutServices from "../../services/db/workout_services"
import express from "express"
import request, {Response} from "supertest"
import {expressLoader} from "../../loaders/express_loader"
import {mongooseTestLoader} from "../../loaders/mongoose_loader"
import * as mocks from "../mocks"
import {Types} from "mongoose"

let app: any
let connection: any

beforeAll(async () => {
  connection = await mongooseTestLoader()
  app = await expressLoader(express())
})

afterAll(async () => {
  await connection.disconnect()
})
afterEach(() => {
  jest.resetAllMocks() //resets usage data but not implementation
  jest.restoreAllMocks() //resets everything, which includes usage data, implementation and mock name.
})
describe("Circuit Routes", () => {
  const path = "/circuits"
  const circuitData = {
    setAmount: 0,
    timeBetweenSetsSec: 0,
    exercises: []
  }
  describe("GET /circuits", () => {
    it("Missing neccessary fields", async (done) => {
      mocks.verifyToken()

      const response: Response = await request(app)
        .get(path)
        .set("authorization", "Bearer SomeRandomCharachters")

      expect(response.body.success).toBeFalsy()
      expect(response.status).toBe(422)
      done()
    })

    it("Fetching circuits successfully", async (done) => {
      mocks.verifyToken()
      jest
        .spyOn(circuitServices, "getCircuits")
        .mockImplementationOnce((circuitIds: Types.ObjectId[]) => {
          return [circuitData, circuitData] as any
        })

      const response: Response = await request(app)
        .get(path)
        .set("Accept", "application/json")
        .set("authorization", "Bearer some_random_charachters")
        .send({circuitIds: ["609cb12cac669ce08bb4214c", "609cb12cac669ce08bb4214c"]})

      expect(response.body.success).toBeTruthy()
      expect(response.status).toBe(200)
      done()
    })
  })

  describe("PATCH /circuits", () => {
    it("Missing neccessary fields", async (done) => {
      mocks.verifyToken()

      const response: Response = await request(app)
        .patch(path)
        .set("authorization", "Bearer some_random_charachters")

      expect(response.body.success).toBeFalsy()
      expect(response.status).toBe(422)
      done()
    })

    it("Updating circuits without changing circuits order successfully", async (done) => {
      mocks.verifyToken()

      jest.spyOn(circuitServices, "bulkWrite").mockImplementationOnce((bulkWrites: any[]) => {
        return {
          result: {ok: 1},
          insertedIds: {"0": "609cafcf305f41df69ca4ad6", "1": "609cafcf305f41df69ca4ad7"}
        } as any
      })

      const bulkOps = [{updateOne: {filter: "<document>", update: "<document or pipeline>"}}]

      const response: Response = await request(app)
        .patch(path)
        .set("Accept", "application/json")
        .set("authorization", "Bearer SomeRandomCharachters")
        .send({bulkWrites: bulkOps})

      expect(response.body.success).toBeTruthy()
      expect(response.status).toBe(200)
      done()
    })

    it("Updating circuits with changing ciruicts order successfully", async (done) => {
      mocks.verifyToken()

      jest.spyOn(circuitServices, "bulkWrite").mockImplementationOnce((bulkWrites: any[]) => {
        return {
          result: {ok: 1},
          insertedIds: {"0": "609cafcf305f41df69ca4ad6", "1": "609cafcf305f41df69ca4ad7"}
        } as any
      })

      jest
        .spyOn(workoutServices, "updateWorkoutCircuitIds")
        .mockImplementationOnce((input: {circuitIds: string[]; workoutId: string}) => {
          return {
            result: {ok: 1},
            insertedIds: {"0": "609cafcf305f41df69ca4ad6", "1": "609cafcf305f41df69ca4ad7"}
          } as any
        })

      const response: Response = await request(app)
        .patch(path)
        .set("Accept", "application/json")
        .set("authorization", "Bearer SomeRandomCharachters")
        .send({
          bulkWrites: [{updateOne: {filter: "<document>", update: "<document or pipeline>"}}],
          circuitIds: ["609cafcf305f41df69ca4ad6", "609cafcf305f41df69ca4ad7"],
          workoutId: "609cafcf305f41df69ca4ad6"
        })

      expect(response.body.success).toBeTruthy()
      expect(response.status).toBe(200)
      done()
    })
  })
})
