import {Request, Response} from "express"
import {Types} from "mongoose"
import * as circuitServices from "../services/db/circuit_services"
import * as workoutServices from "../services/db/workout_services"

const circuits = async (req: Request, res: Response) => {
  const {circuitIds} = req.body
  if (!circuitIds)
    return res.status(422).send({
      success: false,
      message: `Circuit ids are missing!`
    })

  const circuitObjectIds = circuitIds.map((circuitId: string) => Types.ObjectId(circuitId))
  const circuitDocs = await circuitServices.getCircuits(circuitObjectIds)
  if (!circuitDocs)
    return res.status(500).json({
      success: false,
      message: "Fetching circuits failed."
    })

  res.status(200).json({
    success: true,
    circuits: circuitDocs
  })
}

const updateCircuits = async (req: Request, res: Response) => {
  //Information about total exercises and sets

  const {bulkWrites, circuitIds, workoutId} = req.body

  if (!bulkWrites) {
    return res.status(422).json({
      success: false,
      message: "Operation for bulk writes missing!"
    })
  }

  const result = await circuitServices.bulkWrite(bulkWrites)

  if (!result)
    return res.status(500).json({
      success: false,
      message: "Updating circuit failed."
    })

  if (circuitIds) {
    const result = await workoutServices.updateWorkoutCircuitIds({circuitIds, workoutId})
    if (!result)
      return res.status(500).json({
        success: false,
        message: "Updating circuit failed."
      })
  }

  res.status(200).json({
    success: true,
    result: result
  })
}

export {circuits, updateCircuits}
