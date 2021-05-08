import UserModel from "../models/user_model";
import WorkoutModel from "../models/workout_model";
import { Types } from "mongoose";

import * as userServ from "./user_services";
import { response } from "express";
import { mongooseLoader } from "../loaders/mongoose_loader";
const getWorkouts = async (userId: string) => {
  let userDoc;
  try {
    userDoc = await userServ.getUserById(userId);
  } catch (e) {
    console.log(`wokout_services [getWorkouts]: fetching userDoc failed: ${e}`);
    return;
  }

  if (!userDoc) {
    console.log(`wokout_services [getWorkouts]: user document is undefined.`);
    return;
  }
  return userDoc.workouts;
};

const addWorkout = async (userId: string) => {
  const user = new UserModel();
  user.workouts?.push({
    description: "asdf",
    exercise_total_amount: 20,
    name: "Workout Name",
    set_total_amount: 10,
  });

  let userDoc;
  try {
    userDoc = await user.save();
  } catch (e) {
    console.log(
      `wokout_service[addWorkout]: Adding workout into database failed. ${e}`
    );
    return response.json({
      success: false,
      message: "Adding workout into database failed.",
    });
  }
  response.json({
    success: true,
    user_doc: userDoc,
  });
};

const getWorkoutById = async (id: string) => {
  let workout;
  try {
    workout = await WorkoutModel.find({ _id: new Types.ObjectId(id) });
  } catch (e) {
    console.log(`Couldn't find workout by id ${id}. ${e}`);
    return;
  }

  return workout;
};
export { getWorkouts, addWorkout, getWorkoutById };
