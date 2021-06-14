import express from "express"
import * as workoutsControllers from "../controllers/workout_controllers"

const router = express.Router()

router.get("/workouts", workoutsControllers.getWorkouts)
router.patch("/workout", workoutsControllers.updateWorkout)
router.post("/workout", workoutsControllers.addDefaultWorkout)

export default router
