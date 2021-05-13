import {Workout} from "../../interfaces/workout"
import * as workoutServices from "../../services/workout_services"
import {mongooseTestLoader} from "../../loaders/mongoose_loader"
import WorkoutModel from "../../models/workout_model"
import {Types} from "mongoose"

let connection: any

beforeAll(async () => {
  connection = await mongooseTestLoader()
})

afterAll(async () => {
  await connection.disconnect()
})

describe.only("Workout Services", () => {
  let workoutDoc: any
  const newWorkout: Workout = {
    name: "Workout Name",
    circuitIds: ["id1", "id2"],
    description: "Workout Description",
    exerciseTotalAmount: 10,
    setTotalAmount: 10
  }
  it("Adding workout", async () => {
    workoutDoc = await workoutServices.addWorkout(newWorkout)
    expect(workoutDoc).toBeTruthy()
    expect(workoutDoc.name).toBe(newWorkout.name)
  })
  it("Fetching workout by id", async () => {
    const doc = await workoutServices.getWorkoutById(workoutDoc._id)
    expect(doc?.name).toBe(newWorkout.name)
    expect(doc?.description).toBe(newWorkout.description)
  })
  it("Fetching multiple workout documents base on workout ids", async () => {
    // let ids
    // try {
    //   ids = await WorkoutModel.insertMany([newWorkout as any, newWorkout as any])
    // } catch (e) {
    //   process.exit(1)
    // }
    // const workoutIds = ids.map((id) => Types.ObjectId(id))
    // workoutServices.getWorkoutsBasedOnIds(ids)
  })
  it("Updating workout name and description", async () => {
    const updateInfo = await workoutServices.updateWorkoutNameAndDescription({
      _id: workoutDoc._id,
      name: "Different Name",
      description: "Bla bla"
    })
    expect(updateInfo).toBeTruthy()
    expect(updateInfo?.ok).toBe(1)
  })

  it("Updating circuits ids in workout document", async () => {
    const updateInfo = await workoutServices.updateWorkoutCircuitIds({
      workoutId: workoutDoc._id,
      circuitIds: ["Differrent id", "Another id"]
    })
    expect(updateInfo).toBeTruthy()
    expect(updateInfo?.ok).toBe(1)
  })
})
