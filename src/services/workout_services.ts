import WorkoutModel, {Workout} from "../models/workout_model"
import {Types} from "mongoose"

const addWorkout = async (workout: Workout) => {
  const workoutModel = new WorkoutModel(workout)

  let workoutDoc
  try {
    workoutDoc = await workoutModel.save()
  } catch (e) {
    console.log(`workout_service[addWorkout]: Adding workout into database failed. ${e}`)
    return
  }
  return workoutDoc
}

const getWorkoutById = async (workoutId: string) => {
  let workout
  try {
    workout = await WorkoutModel.find({
      _id: new Types.ObjectId(workoutId)
    })
  } catch (e) {
    console.log(`Couldn't find workout by id. ${e}`)
    return
  }

  return workout
}

const getWorkoutsBasedOnIds = async (workoutIds: Types.ObjectId[]) => {
  let workoutDocs
  try {
    workoutDocs = await WorkoutModel.find({_id: {$in: workoutIds}})
  } catch (e) {
    console.log(`Fetching workouts based on ids failed. ${e}`)
    return
  }

  return workoutDocs
}

const updateWorkoutNameAndDescription = (input: {
  name: string
  description: string
  _id: string
}) => {
  let workoutDoc
  try {
    workoutDoc = WorkoutModel.updateOne(
      {_id: Types.ObjectId(input._id)},
      {$set: {name: input.name, description: input.description}}
    )
  } catch (e) {
    console.log(`Updating workouts name and description failed. ${e}`)
    return
  }
  return workoutDoc
}

const updateWorkoutCircuitIds = (input: {circuitIds: string[]; workoutId: string}) => {
  let result
  try {
    result = WorkoutModel.updateOne(
      {_id: input.workoutId},
      {
        $set: {circuitIds: input.circuitIds}
      }
    )
  } catch (e) {
    console.log(`workout_services[updateCircuitIds]: Updating workouts circuit ids failed. ${e}`)
    return
  }

  return result
}
export {
  addWorkout,
  getWorkoutById,
  getWorkoutsBasedOnIds,
  updateWorkoutNameAndDescription,
  updateWorkoutCircuitIds
}
