import {Request, Response} from "express"
import {Types} from "mongoose"
import * as circuitServices from "../services/circuit_services"

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

const updateCircuit = async (req: Request, res: Response) => {
  const {bulkWrites, circuitIds} = req.body

  if(!bulkWrites) {
    return res.json({
      success: false,
    })
  }
}

export {circuits}
