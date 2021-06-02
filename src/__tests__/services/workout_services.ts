import {Workout} from "../../interfaces/workout"
import * as workoutServices from "../../services/db/workout_services"
import {mongooseTestLoader} from "../../loaders/mongoose_loader"
import mongoose from "mongoose"

let connection: any

beforeAll(async () => {
  connection = await mongooseTestLoader()
})

afterAll(async () => {
  await connection.disconnect()
})

afterEach(async () => {
  await mongoose.connection.db.dropCollection("workouts")
})

describe("Workout Services", () => {
  it("Adding workout", async () => {
    const newWorkout: Workout = {
      name: "Workout Name 1",
      circuitIds: ["id1", "id2"],
      description: "Workout Description",
      exerciseTotalAmount: 10,
      setTotalAmount: 10
    }
    const workoutDoc = await workoutServices.addWorkout(newWorkout)
    expect(workoutDoc).toBeTruthy()
    expect(workoutDoc?.name).toBe(newWorkout.name)
  })

  it("Fetching workout by id", async () => {
    const newWorkout: Workout = {
      name: "Workout Name 2",
      circuitIds: ["id1", "id2"],
      description: "Workout Description",
      exerciseTotalAmount: 10,
      setTotalAmount: 10
    }
    const workoutDoc = (await workoutServices.addWorkout(newWorkout)) as Workout

    const doc = await workoutServices.getWorkoutById(workoutDoc._id as string)
    expect(doc?.name).toBe(newWorkout.name)
    expect(doc?.description).toBe(newWorkout.description)
  })

  it("Updating workout name and description", async () => {
    const newWorkout: Workout = {
      name: "Workout Name 3",
      circuitIds: ["id1", "id2"],
      description: "Workout Description",
      exerciseTotalAmount: 10,
      setTotalAmount: 10
    }
    const workoutDoc = (await workoutServices.addWorkout(newWorkout)) as Workout

    const updateInfo = await workoutServices.updateWorkoutNameAndDescription({
      _id: workoutDoc._id as string,
      name: "Different Name",
      description: "Bla bla"
    })
    expect(updateInfo).toBeTruthy()
    expect(updateInfo?.ok).toBe(1)
  })

  it("Updating circuits ids in workout document", async () => {
    const newWorkout: Workout = {
      name: "Workout Name 3",
      circuitIds: ["id1", "id2"],
      description: "Workout Description",
      exerciseTotalAmount: 10,
      setTotalAmount: 10
    }
    const workoutDoc = (await workoutServices.addWorkout(newWorkout)) as Workout

    const updateInfo = await workoutServices.updateWorkoutCircuitIds({
      workoutId: workoutDoc._id as string,
      circuitIds: ["id1", "id2"]
    })
    expect(updateInfo).toBeTruthy()
    expect(updateInfo?.ok).toBe(1)
  })
})
