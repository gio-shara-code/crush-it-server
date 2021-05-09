import {Request, Response} from "express"
import {defaultExercises} from "../const"
import * as exerciseService from "../services/exercise_services"

// const exercises = async (req: Request, res: Response) => {
//   let exercises
//   try {
//     exercises = await exerciseService.getExercises(req.body.userId)
//     if (!exercises) {
//       return res.json({success: false})
//     }
//   } catch (e) {
//     return res.json({success: false, message: "Something went wrong"})
//   }
//   res.json({success: true, exercises: exercises})
// }

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
