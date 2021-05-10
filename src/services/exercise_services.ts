import {Document, Types} from "mongoose"
import {Exercise} from "../interfaces/exercise"
import ExerciseModel from "../models/exercise_model"

const getExercises = async (exerciseIds: Types.ObjectId[]) => {
  let exerciseDocs

  try {
    exerciseDocs = await ExerciseModel.findById({_id: {$in: exerciseIds}})
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

// const addExercise = async (data: { userId: string; exerciseId: Exercise }) => {
//   let userDoc;
//   try {
//     userDoc = await userServ.getUserById(data.userId);
//   } catch (e) {
//     console.log(
//       `exercise_service [addExercise]: fetching userDoc failed. ${e}`
//     );
//     return;
//   }
//   if (!userDoc) {
//     console.log(`exercise_service [addExercise]: user document is undefined.`);
//     return;
//   }

//   userDoc.exercises.push(data.exercise);

//   let doc;
//   try {
//     doc = await userDoc.save();
//   } catch (e) {
//     console.log(`exercise_service [addExercise]: Saving user failed. ${e}`);
//     return;
//   }
//   return data.exercise;
// };

export {getExercises, saveExercise}
