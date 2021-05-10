import mongoose, {Schema, Types} from "mongoose"
import {Workout} from "../interfaces/workout"

const workoutSchema = new Schema({
  name: {type: String, required: true},
  exerciseTotalAmount: {type: Number, required: true},
  setTotalAmount: {type: Number, required: true},
  description: {type: String, required: false},
  circuitIds: {type: [String], required: false}
})

export default mongoose.model<Workout & Types.Subdocument>("Workout", workoutSchema)

export {Workout, workoutSchema}
