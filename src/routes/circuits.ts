import { Request, Response } from "express";
import * as circuitServices from "../services/circuit_services";
import * as workoutServices from "../services/workout_services";

const circuits = async (req: Request, res: Response) => {
  //db.workouts.find({ _id: "workout_id"})
  //db.circuits.find({ _id: { $in: workout_circuits}})
  if (!req.params.workoutId)
    return res.send({
      success: false,
      message: `Workout id is missing!`,
    });

  let workout;
  try {
    workout = await workoutServices.getWorkoutById(req.params.workoutId);
  } catch (e) {
    return res.json({
      success: false,
      message: `circuits.ts [circuits]: fetching workout by id failed. ${e}`,
    });
  }

  // let circuits;
  // try {
  //   circuits = await
  // }catch() {

  // }
};
