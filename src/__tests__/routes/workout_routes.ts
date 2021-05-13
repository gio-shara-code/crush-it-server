import {expressLoader} from "../../loaders/express_loader"
import * as workoutServices from "../../services/workout_services"
import * as userServices from "../../services/user_services"
import * as circuitServices from "../../services/circuit_services"
import {mongooseTestLoader} from "../../loaders/mongoose_loader"
import express from "express"
import request from "supertest"
import jwt from "jsonwebtoken"
import {Types, Document} from "mongoose"
import {Circuit} from "../../interfaces/circuit"
import {Workout} from "../../interfaces/workout"
import {User} from "../../interfaces/user"

let app: any
let connection: any

beforeAll(async () => {
  connection = await mongooseTestLoader()
  app = await expressLoader(express())
})

afterAll(async () => {
  await connection.disconnect()
})

const mockVerifyToken = () =>
  jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
    return {id: "user_id"}
  })

describe("Workout Routes", () => {
  describe("GET /workouts", () => {
    const uri = "/workouts"
    it("Requires token", async (done) => {
      const response = await request(app).get(uri)
      expect(response.body.success).toBeFalsy()
      expect(response.status).toBe(422)
      done()
    })

    it("Inputing invalid token", async (done) => {
      const response = await request(app)
        .get(uri)
        .set("authorization", "Bearer SomeRandomCharachters")
      expect(response.body.success).toBeFalsy()
      expect(response.status).toBe(401)
      done()
    })

    it("Fetching Empty workout list", async (done) => {
      //mock verify jwt function
      mockVerifyToken()
      jest.spyOn(userServices, "getUserById").mockImplementationOnce((id: string) => {
        return {workouts: []} as any
      })

      const response = await request(app)
        .get(uri)
        .set("authorization", "Bearer SomeRandomCharachters")

      expect(response.body.success).toBeTruthy()
      expect(response.status).toBe(200)
      done()
    })

    it("Fetching workouts successfully", async (done) => {
      mockVerifyToken()

      const workoutSampleData = [
        {
          name: "Workout Name",
          description: "Some Description"
        },
        {
          name: "Workout Name",
          description: "Some Description"
        }
      ]
      const workoutIds = ["609a1795acd69358e2ef1ae3", "609a1795acd69358e2ef1ae3"]
      jest.spyOn(userServices, "getUserById").mockImplementationOnce((id: string) => {
        return {
          workouts: workoutIds
        } as any
      })

      jest
        .spyOn(workoutServices, "getWorkoutsBasedOnIds")
        .mockImplementationOnce((workoutIds: Types.ObjectId[]) => {
          return workoutSampleData as any
        })

      const response = await request(app)
        .get(uri)
        .set("authorization", "Bearer SomeRandomCharachters")

      expect(response.body.success).toBeTruthy()
      expect(response.status).toBe(200)
      expect(response.body.workouts).toEqual(workoutSampleData)
      done()
    })
  })

  describe("POST /workout", () => {
    const uri = "/workout"
    it("Adding default workout successfully", async (done) => {
      mockVerifyToken()
      jest
        .spyOn(circuitServices, "saveCircuit")
        .mockImplementationOnce(async (circuit: Circuit & Document) => {
          return {_id: "Some circuit id"} as any
        })
      jest.spyOn(workoutServices, "addWorkout").mockImplementationOnce(async (workout: Workout) => {
        return {_id: "Some workout id"} as any
      })
      jest.spyOn(userServices, "getUserById").mockImplementationOnce(async (id: string) => {
        return {_id: "Some user id", workouts: []} as any
      })
      jest.spyOn(userServices, "saveUser").mockImplementationOnce(async (user: User & Document) => {
        return {_id: "Some user id", workouts: []} as any
      })

      const response = await request(app)
        .post(uri)
        .set("authorization", "Bearer SomeRandomCharachters")

      expect(response.body.success).toBeTruthy()
      expect(response.status).toBe(200)
      expect(response.body.workout).toEqual({_id: "Some workout id"})
      done()
    })
  })

  describe("PATCH /workout", () => {
    const uri = "/workout"

    it("Missing required parameters", async (done) => {
      mockVerifyToken()
      const response = await request(app).post(uri)

      expect(response.body.success).toBeFalsy()
      expect(response.status).toBe(422)
      done()
    })

    it.only("Updating Workout Successfully", async (done) => {
      mockVerifyToken()
      const workoutData = {
        workoutName: "Workout Name",
        workoutDescription: "Desc",
        workoutId: "Workout Id"
      }

      jest
        .spyOn(workoutServices, "updateWorkoutNameAndDescription")
        .mockImplementationOnce(async (input: {name: string; description: string; _id: string}) => {
          return {ok: 1} as any
        })

      const response = await request(app)
        .patch(uri)
        .set("authorization", "Bearer Some_Random_Token")
        .set("Content-Type", "application/json")
        .send(workoutData)

      expect(response.body.success).toBeTruthy()
      expect(response.status).toBe(200)
      expect(response.body.updateInfo.ok).toBe(1)
      done()
    })
  })
})
