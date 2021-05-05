import UserModel from "../models/user_model";
import * as userServ from "./user_services";

const getExercises = async (userId: string) => {
  let userDoc;
  try {
    userDoc = await userServ.getUserById(userId);
  } catch (e) {
    console.log(
      `exercise_service [getExercises]: fetching userDoc failed. ${e}`
    );
    return;
  }

  if (!userDoc) {
    console.log(`exercise_service [getExercises]: user document is undefined.`);
    return;
  }

  return userDoc.exercises;
};

export { getExercises };
