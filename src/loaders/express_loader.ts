import { Application } from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import * as authRoutes from "../routes/auth_routes";
import * as userRoutes from "../routes/user_routes";
import * as workoutRoutes from "../routes/workout_routes";
import { verifyToken } from "../middlewares/verify_token";

// const userService = new UserService();
const expressLoader = async (app: Application) => {
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cors());

  app.post("/register", authRoutes.register);
  app.post("/login", authRoutes.login);
  app.get("/user/:id", verifyToken, userRoutes.getUserById); //get user with a certain id

  app.get("/workouts", verifyToken, workoutRoutes.workouts);
  app.post("/workout", workoutRoutes.addWorkout);

  //app.get(/users) //for retrieving the users
  //app.post(/users or /user) //for retrieving the users
  //app.post(/user-edit-id) //for retrieving the users
  //New commit
  //Another commit
};

export { expressLoader };
