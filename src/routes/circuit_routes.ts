import {Request, Response} from "express"
import {Types} from "mongoose"
import * as circuitServices from "../services/circuit_services"
import * as workoutServices from "../services/workout_services"

const circuits = async (req: Request, res: Response) => {
  const {circuitIds} = req.body
  if (!circuitIds)
    return res.send({
      success: false,
      message: `Circuit ids are missing!`
    })

  const circuitObjectIds = circuitIds.map((circuitId: string) => Types.ObjectId(circuitId))
  const circuitDocs = await circuitServices.getCircuits(circuitObjectIds)
  if (!circuitDocs) {
    return res.json({
      success: false,
      message: "Fetching circuits failed."
    })
  }
  res.json({
    success: true,
    circuits: circuitDocs
  })
}

const updateCircuits = async (req: Request, res: Response) => {
  //Information about total exercises and sets

  const {bulkWrites, circuitIds, workoutId} = req.body

  if (!bulkWrites) {
    return res.json({
      success: false
    })
  }

  const result = await circuitServices.bulkWrite(bulkWrites)

  if (!result)
    return res.json({
      success: false,
      message: "Updating circuit failed."
    })

  if (circuitIds) {
    const result = await workoutServices.updateWorkoutCircuitIds({circuitIds, workoutId})
    if (!result)
      return res.json({
        success: false,
        message: "Updating circuit failed."
      })
  }

  res.json({
    success: true,
    result: result
  })
}

export {circuits, updateCircuits}
