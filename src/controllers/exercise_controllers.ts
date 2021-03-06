import {Request, Response} from "express"
import {Types} from "mongoose"
import ExerciseModel from "../models/exercise_model"
import * as exerciseServices from "../services/db/exercise_services"
import * as userServices from "../services/db/user_services"
import {isExercisesEmpty} from "../utils/validation"

const getExercises = async (req: Request, res: Response) => {
  const userDoc = await userServices.getUserById(req.body.userId)
  if (!userDoc) return res.json({success: false, message: "Fetching exercises failed."})

  if (isExercisesEmpty(userDoc.exerciseIds)) {
    return res.json({
      success: true,
      exercises: []
    })
  }

  const userObjectIds: Types.ObjectId[] = userDoc.exerciseIds.map((exerciseId: String) =>
    Types.ObjectId(`${exerciseId}`)
  )

  const exercises = await exerciseServices.getExercises(userObjectIds)
  if (!exercises) return res.json({success: false, message: "Fetching exercises failed."})

  res.json({success: true, exercises: exercises})
}

const addExercise = async (req: Request, res: Response) => {
  const {exerciseName, muscleGroup} = req.body
  if (!exerciseName || !muscleGroup) {
    return res.json({
      success: false,
      message: "Provide all fields"
    })
  }

  const exerciseDoc = await exerciseServices.saveExercise(
    new ExerciseModel({
      name: exerciseName,
      muscleGroup: muscleGroup
    })
  )

  if (!exerciseDoc) {
    return res.json({
      success: false,
      message: "Adding exercise failed."
    })
  }

  // try {
  //   //CAll 1

  //   //CAll 2
  //   throw Error("dsagfdsag")
  // } catch (e) {

  // }

  const userDoc = await userServices.getUserById(req.body.userId)
  if (!userDoc)
    return res.json({
      success: false,
      message: "Adding exercise failed."
    })

  userDoc.exerciseIds.push(exerciseDoc._id)

  const savedUserDoc = await userServices.saveUser(userDoc)
  if (!savedUserDoc)
    return res.json({
      success: false,
      message: "Adding exercise failed."
    })

  res.json({
    success: true,
    exercise: exerciseDoc
  })
}

export {getExercises, addExercise}

// const addExercise = async (req: Request, res: Response) => {
//   let exercise;
//   try {
//     exercise = await exerciseService.addExercise({
//       userId: req.body.userId,
//       exercise: defaultExercises[0],
//     });
//     if (!exercise) {
//       return res.json({ success: false });
//     }
//   } catch (e) {
//     return res.json({ success: false, message: "Something went wrong" });
//   }

//   res.json({ success: true, exercise: exercise });
// };
// export {exercises}
