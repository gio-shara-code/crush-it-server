import mongoose, { Schema, Document, Types } from "mongoose";
import { workoutSchema, WorkoutInterface } from "./workout_model";
export interface UserInterface {
  email: string;
  name: string;
  password: string;
  createdOn: number;
  workouts: WorkoutInterface[];
}

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  createdOn: { type: Number, required: true },
  workouts: [workoutSchema],
});

type UserModelAndDocument = UserInterface & Document;

export default mongoose.model<UserModelAndDocument>("User", userSchema);
