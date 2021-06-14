import express from "express"
import * as exerciseControllers from "../controllers/exercise_controllers"

const router = express.Router()

router.post("/exercise", exerciseControllers.addExercise)
router.get("/exercise", exerciseControllers.getExercises)

export default router
