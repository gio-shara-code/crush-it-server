import express from "express"
import * as authControllers from "../controllers/auth_controllers"

const router = express.Router()

router.post("register", authControllers.register)
router.post("register", authControllers.login)

export default router
