import CircuitModel from "../models/circuit_model"
import {Circuit} from "../interfaces/circuit"
import {Document, Types} from "mongoose"

const getCircuits = async (circuitIds: Types.ObjectId[]) => {
  let circuitDocs
  try {
    circuitDocs = await CircuitModel.find({_id: {$in: circuitIds}})
  } catch (e) {
    console.log(`circuit_services[getCircuits]: Fetching circuits failed. ${e}`)
    return
  }
  return circuitDocs
}

const insertManyCircuits = async (circuits: Circuit[]) => {
  let circuitDocs
  try {
    circuitDocs = await CircuitModel.insertMany(circuits)
  } catch (e) {
    console.log(`circuit_services[insertManyCircuits]: inserting many circuits failed. ${e}`)
    return
  }
  return circuitDocs
}

const saveCircuit = async (circuit: Circuit & Document) => {
  let circuitDoc
  try {
    circuitDoc = await circuit.save()
  } catch (e) {
    console.log(`circuit_services[saveCircuit]: Saving circuit failed. ${e}`)
    return
  }
  return circuitDoc
}

const bulkWrite = async (bulkWrites: any[]) => {
  let result
  try {
    result = await CircuitModel.bulkWrite(bulkWrites)
  } catch (e) {
    console.log(`circuit_services[bulkWrite]: bulk write on circuits failed. ${e}`)
    return
  }
  return result
}
export {insertManyCircuits, getCircuits, saveCircuit, bulkWrite}
