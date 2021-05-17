import {Document, Types} from "mongoose"
import {defaultExercises} from "../../const"
import {Exercise} from "../../interfaces/exercise"
import ExerciseModel from "../../models/exercise_model"

const getExercises = async (exerciseIds: Types.ObjectId[]) => {
  let exerciseDocs

  try {
    exerciseDocs = await ExerciseModel.find({_id: {$in: exerciseIds}})
  } catch (e) {
    console.log(`exercise_services[getExercises]: Fetching exercises failed: ${e}`)
    return
  }

  return exerciseDocs
}

const saveExercise = async (exercise: Exercise & Document) => {
  let exerciseDoc
  try {
    exerciseDoc = await exercise.save()
  } catch (e) {
    console.log(`exercise_services[saveExercise]: Saving exercise failed. ${e}`)
  }
  return exerciseDoc
}

const insertDefaultExercises = async (exercises: Exercise[]) => {
  let result
  try {
    result = await ExerciseModel.insertMany(exercises)
  } catch (e) {
    console.log(`Inserting default exercises failed. ${e}`)
    return
  }
  return result
}

export {getExercises, saveExercise, insertDefaultExercises}
