import mongoose, { Schema, Types } from "mongoose";

const exerciseSchema = new Schema({
  name: { type: String, required: false },
  type: { type: String, required: false },
  reps_amount: { type: Number, required: false },
  break_sec: { type: Number, required: false },
  exercise_time_sec: { type: Number, required: false },
});

export default mongoose.model<Exercise & Types.Subdocument>(
  "Exercise",
  exerciseSchema
);

export { exerciseSchema };
