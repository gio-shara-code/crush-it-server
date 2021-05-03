import { Request, Response } from "express";
import * as workoutServices from "../services/workout_services";

const workouts = async (req: Request, res: Response) => {
  let workouts;
  try {
    workouts = await workoutServices.getWorkouts(req.body.userId);
    if (!workouts) {
      return res.json({ success: false });
    }
  } catch (e) {
    return res.json({ success: false, message: "Something went wrong" });
  }
  res.json({ success: true, workouts: workouts });

  //   const workouts = await workoutServices.getWorkouts(req.body.userId);
};

const addWorkout = async (req: Request, res: Response) => {
  let workout;
  try {
    workout = await workoutServices.addWorkout(req.body.userId);
    if (!workout) {
      return res.json({ success: false });
    }
  } catch (e) {
    return res.json({ success: false, message: "Something went wrong" });
  }
  return res.json({ success: true, workout: workout });
};

export { workouts, addWorkout };
