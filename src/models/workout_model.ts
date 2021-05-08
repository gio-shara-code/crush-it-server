import mongoose, { Schema, Types } from "mongoose";
import { Workout } from "../interfaces/workout";

const workoutSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  exercise_total_amount: { type: Number, required: true },
  set_total_amount: { type: String, required: true },
  circuits: { }
});

export default mongoose.model<Workout & Types.Subdocument>(
  "Workout",
  workoutSchema
);

export { Workout as WorkoutInterface, workoutSchema };
