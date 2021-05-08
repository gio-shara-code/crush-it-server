import { model, Schema, Types } from "mongoose";
import { exerciseSchema } from "./exercise_model";

const circuitSchema = new Schema({
  set_amount: { type: Number, required: true},
  time_between_sets_sec: { type: Number, required: true},
  order: {type: Number, required: true},
  exercises: [exerciseSchema],
});

export default model<Exercise & Types.Subdocument>("Circuit", circuitSchema);

export { circuitSchema };
