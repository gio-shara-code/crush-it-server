import {Request, Response} from "express"
import {Types} from "mongoose"
import * as exerciseServices from "../services/exercise_services"
import * as userServices from "../services/user_services"

const exercises = async (req: Request, res: Response) => {
  const userDoc = await userServices.getUserById(req.body.userId)
  if (!userDoc) return res.json({success: false, message: "Fetching exercises failed."})

  if (userDoc.exerciseIds.length === 0) {
    return res.json({
      success: true,
      exercises: []
    })
  }
  const userObjectIds = userDoc.exerciseIds.map((exerciseId: any) =>
    Types.ObjectId(`${exerciseId}`)
  )

  const exercises = await exerciseServices.getExercises(userObjectIds)
  if (!exercises) return res.json({success: false, message: "Fetching exercises failed."})

  res.json({success: true, exercises: exercises})
}

export {exercises}

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
