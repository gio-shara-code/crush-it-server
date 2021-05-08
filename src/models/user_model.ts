import { model, Schema, Document } from "mongoose";
import { workoutSchema } from "./workout_model";
import { User } from "../interfaces/user";
import { exerciseSchema } from "./exercise_model";
//When creating a document

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  createdOn: { type: Number, required: true },
  workouts: [workoutSchema],
  exercises: [exerciseSchema],
  workout_settings: {
    sound_enabled: {
      type: String,
      required: true
    }
  }
});

export default model<User & Document>("User", userSchema);
