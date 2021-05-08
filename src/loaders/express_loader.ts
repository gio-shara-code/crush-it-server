import { Application } from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import * as authRoutes from "../routes/auth_routes";
import * as userRoutes from "../routes/user_routes";
import * as workoutRoutes from "../routes/workout_routes";
import * as exerciseRoutes from "../routes/exercise_routes";
import { verifyToken } from "../middlewares/verify_token";

// const userService = new UserService();
const expressLoader = async (app: Application) => {
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cors());

  app.post("/register", authRoutes.register);
  app.post("/login", authRoutes.login);

  app.get("/user/", verifyToken, userRoutes.getUser);
  app.get("/workouts", verifyToken, workoutRoutes.workouts);

  app.post("/workout", workoutRoutes.addWorkout);

  app.get("/exercises", verifyToken, exerciseRoutes.exercises);
  app.post("/exercise", verifyToken, exerciseRoutes.addExercise);
};

export { expressLoader };
