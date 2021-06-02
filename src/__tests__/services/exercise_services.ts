import mongoose from "mongoose"
import {mongooseTestLoader} from "../../loaders/mongoose_loader"
import * as exerciseServices from "../../services/db/exercise_services"
import ExerciseModel from "../../models/exercise_model"
import {v4 as uuidv4} from "uuid"
import {Exercise} from "../../interfaces/exercise"

let connection: any

beforeAll(async () => {
  connection = await mongooseTestLoader()
})

afterAll(async () => {
  await connection.disconnect()
})

afterEach(async () => {
  await mongoose.connection.db.dropCollection("exercises")
})

describe("Exercise Services", () => {
  
  const exerciseData: Exercise = {
    name: `Random Name: ${uuidv4()}`,
    muscleGroup: "Muscle Group"
  }

  it("Saving an exercise successfully", async () => {
    const createdExercise = (await exerciseServices.saveExercise(
      new ExerciseModel(exerciseData)
    )) as Exercise

    expect(createdExercise).toBeTruthy()
    expect(createdExercise?.name).toBe(exerciseData.name)
  })

  it("Fetching exercises successfully", async () => {
    const createdExercise = (await exerciseServices.saveExercise(
      new ExerciseModel(exerciseData)
    )) as Exercise

    const fetchedExercise = (await exerciseServices.getExercises([
      mongoose.Types.ObjectId(createdExercise._id)
    ])) as Exercise[]

    expect(fetchedExercise).toBeTruthy()
    expect(fetchedExercise[0].name).toBe(exerciseData.name)
  })

  it("Inserting default exercises successfully", async () => {

    const exerciseDatas: Exercise[] = [
      {
        name: `Random Name: ${uuidv4()}`,
        muscleGroup: "Muscle Group"
      },
      {
        name: `Random Name: ${uuidv4()}`,
        muscleGroup: "Muscle Group"
      }
    ]
    const fetchedExercises = (await exerciseServices.insertDefaultExercises(
      exerciseDatas
    )) as Exercise[]
    expect(fetchedExercises).toBeTruthy()
    expect(fetchedExercises.length).toBe(exerciseDatas.length)
    expect(fetchedExercises[0].name).toBe(exerciseDatas[0].name)
  })
})
