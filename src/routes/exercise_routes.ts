import { Request, Response } from "express";
import * as exerciseService from "../services/exercise_services";

const exercises = async (req: Request, res: Response) => {
  let exercises;
  try {
    exercises = await exerciseService.getExercises(req.body.userId);
    if (!exercises) {
      return res.json({ success: false });
    }
  } catch (e) {
    return res.json({ success: false, message: "Something went wrong" });
  }
  res.json({ success: true, exercises: exercises });
};

export {exercises}