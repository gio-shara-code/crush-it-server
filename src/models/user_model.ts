import {model, Schema, Document, Types} from "mongoose"
import {workoutSchema} from "./workout_model"
import {User} from "../interfaces/user"
import {exerciseSchema} from "./exercise_model"
//When creating a document

const userSchema = new Schema({
  email: {type: String, required: true},
  name: {type: String, required: true},
  password: {type: String, required: true, select: false},
  createdOn: {type: Number, required: true},
  exerciseIds: {type: [String], required: true},
  workouts: {type: [String], required: false},
  workoutSettings: {
    soundEnabled: {
      type: String,
      required: true
    }
  }
})

export default model<User & Document>("User", userSchema)
