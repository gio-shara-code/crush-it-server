import express from "express"
import * as circuitControllers from "../controllers/circuit_controllers"
const router = express.Router()

router.get("/circuits", circuitControllers.circuits)
router.patch("/circuits", circuitControllers.updateCircuits)

export default router
