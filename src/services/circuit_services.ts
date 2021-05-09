import CircuitModel from "../models/circuit_model"
import {Circuit} from "../interfaces/circuit"

const getCircuits = async () => {}

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

export {insertManyCircuits, getCircuits}

// {
//     "acknowledged" : true,
//     "insertedIds" : [
//        ObjectId("562a94d381cb9f1cd6eb0e1a"),
//        ObjectId("562a94d381cb9f1cd6eb0e1b"),
//        ObjectId("562a94d381cb9f1cd6eb0e1c")
//     ]
//  }
