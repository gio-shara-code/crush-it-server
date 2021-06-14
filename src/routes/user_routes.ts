import express from "express"
import * as userControllers from "../controllers/user_controllers"

const router = express.Router()

router.get("/user", userControllers.getUser)

export default router
