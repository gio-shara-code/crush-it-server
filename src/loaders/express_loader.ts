import {Application} from "express"
import {json, urlencoded} from "body-parser"
import cors from "cors"
import {verifyToken} from "../middlewares/verify_token"
import authRoutes from "../routes/auth_routes"
import userRoutes from "../routes/user_routes"
import workoutRoutes from "../routes/workout_routes"
import exerciseRoutes from "../routes/exercise_routes"
import circuitRoutes from "../routes/circuit_routes"
// const userService = new UserService();
const expressLoader = async (app: Application) => {
  app.use(json())
  app.use(urlencoded({extended: false}))
  app.use(cors())

  app.use("auth", authRoutes)
  app.use(verifyToken, userRoutes)
  app.use(verifyToken, workoutRoutes)
  app.use(verifyToken, exerciseRoutes)
  app.use(verifyToken, circuitRoutes)
  return app
}

export {expressLoader}
