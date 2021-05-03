import mongoose, { Schema, Types } from "mongoose";

interface WorkoutInterface {
  description: string;
  name: string;
  set_total_amount: number;
  exercise_total_amount: number;
}

const workoutSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  exercise_total_amount: { type: Number, required: true },
  set_total_amount: { type: String, required: true },
});

type WorkoutModelAndSubDocument = WorkoutInterface & Types.Subdocument;

export default mongoose.model<WorkoutModelAndSubDocument>(
  "Workout",
  workoutSchema
);

export {
  WorkoutInterface,
  workoutSchema,
  WorkoutModelAndSubDocument as WorkoutModelAndDocument,
};
