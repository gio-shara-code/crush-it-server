import mongoose, {Schema, Types} from "mongoose"
import {Exercise} from "../interfaces/exercise"

const exerciseSchema = new Schema({
  name: {type: String, required: true},
  muscleGroup: {type: String, required: true}
})

export default mongoose.model<Exercise & Types.Subdocument>("Exercise", exerciseSchema)

export {exerciseSchema}
