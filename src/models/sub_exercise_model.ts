import mongoose, {Schema, Types} from "mongoose"
import {SubExercise} from "../interfaces/sub_exercise"

const subExerciseSchema = new Schema({
  reps_amount: {type: Number, required: false},
  exercise_time_sec: {type: Number, required: false},
  exercise_type: {type: String, required: true},
  name: {type: String, required: true},
  break_sec: {type: Number, required: true}
})

// export default mongoose.model<Exercise & Types.Subdocument>("Exercise", subExerciseSchema)

export {subExerciseSchema}
