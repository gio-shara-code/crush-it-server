import {model, Schema, Types} from "mongoose"
import {exerciseSchema} from "./exercise_model"

const circuitSchema = new Schema({
  setAmount: {type: Number, required: true},
  timeBetweenSetsSec: {type: Number, required: true},
  exercises: {type: [exerciseSchema], required: false}
})

export default model("Circuit", circuitSchema)

export {circuitSchema}
