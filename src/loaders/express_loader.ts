import {Application} from "express"
import {json, urlencoded} from "body-parser"
import cors from "cors"
import * as authRoutes from "../routes/auth_routes"
import * as userRoutes from "../routes/user_routes"
import * as workoutRoutes from "../routes/workout_routes"
import * as circuitsRoutes from "../routes/circuits_routes"
import {verifyToken} from "../middlewares/verify_token"

// const userService = new UserService();
const expressLoader = async (app: Application) => {
  app.use(json())
  app.use(urlencoded({extended: false}))
  app.use(cors())

  app.get("/user", verifyToken, userRoutes.getUser)
  app.get("/workouts", verifyToken, workoutRoutes.workouts)
  app.get("/circuits", verifyToken, circuitsRoutes.circuits)
  // app.get("/exercises", verifyToken, exerciseRoutes.exercises)

  app.post("/register", authRoutes.register)
  app.post("/login", authRoutes.login)
  //add workout
  app.post("/workout", verifyToken, workoutRoutes.addWorkout)
  //update workout
  app.patch("/workout", verifyToken, workoutRoutes.updateWorkout) //patch = update

  app.patch("/circuits", verifyToken, circuitsRoutes.updateCircuits)

  // app.post("/exercise", verifyToken, exerciseRoutes.addExercise);
}

export {expressLoader}
