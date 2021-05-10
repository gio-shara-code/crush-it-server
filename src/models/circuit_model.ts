import {model, Schema} from "mongoose"
import {subExerciseSchema} from "./sub_exercise_model"

const circuitSchema = new Schema({
  setAmount: {type: Number, required: true},
  timeBetweenSetsSec: {type: Number, required: true},
  exercises: {type: [subExerciseSchema], required: false}
})

export default model("Circuit", circuitSchema)

export {circuitSchema}
