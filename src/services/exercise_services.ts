import {Exercise} from "../interfaces/exercise"
import {exerciseSchema} from "../models/exercise_model"
import UserModel from "../models/user_model"
import * as userServ from "./user_services"

// const getExercises = async (userId: string) => {
//   let userDoc
//   try {
//     userDoc = await userServ.getUserById(userId)
//   } catch (e) {
//     console.log(`exercise_service [getExercises]: fetching userDoc failed. ${e}`)
//     return
//   }

//   if (!userDoc) {
//     console.log(`exercise_service [getExercises]: user document is undefined.`)
//     return
//   }

//   return userDoc.exercisesIds
// }

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

// export {getExercises}
