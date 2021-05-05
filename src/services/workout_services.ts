import UserModel from "../models/user_model";
// import { Types } from "mongoose";
import * as userServ from "./user_services";
import { response } from "express";
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

export { getWorkouts, addWorkout };
