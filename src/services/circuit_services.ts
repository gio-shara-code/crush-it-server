import CircuitModel from "../models/circuit_model"
import {Circuit} from "../interfaces/circuit"
import {Document, Types} from "mongoose"

const getCircuits = async (circuitIds: Types.ObjectId[]) => {
  let circuitDocs
  try {
    circuitDocs = await CircuitModel.find({_id: {$in: circuitIds}})
  } catch (e) {
    console.log(`Fetching circuits failed. ${e}`)
    return
  }
  return circuitDocs
}

const insertManyCircuits = async (circuits: Circuit[]) => {
  let circuitDocs
  try {
    circuitDocs = await CircuitModel.insertMany(circuits)
  } catch (e) {
    console.log(`inserting many circuits failed. ${e}`)
    return
  }
  return circuitDocs
}

const saveCircuit = async (circuit: Circuit & Document) => {
  let circuitDoc
  try {
    circuitDoc = await circuit.save()
  } catch (e) {
    console.log(`circuit_sercise[saveCircuit]: Saving circuit failed. ${e}`)
    return
  }
  return circuitDoc
}
export {insertManyCircuits, getCircuits, saveCircuit}

// {
//     "acknowledged" : true,
//     "insertedIds" : [
//        ObjectId("562a94d381cb9f1cd6eb0e1a"),
//        ObjectId("562a94d381cb9f1cd6eb0e1b"),
//        ObjectId("562a94d381cb9f1cd6eb0e1c")
//     ]
//  }
