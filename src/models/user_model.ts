import mongoose, { Schema, Document } from "mongoose";

export interface UserInterface {
  email: string;
  name: string;
  password: string;
  createdOn: number;
}

const UserSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  createdOn: { type: Number, required: true },
});

type UserModelAndDocument = UserInterface & Document;

export default mongoose.model<UserModelAndDocument>("User", UserSchema);
