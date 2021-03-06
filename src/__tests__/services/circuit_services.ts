import {Circuit} from "../../interfaces/circuit"
import {mongooseTestLoader} from "../../loaders/mongoose_loader"
import * as circuitServices from "../../services/db/circuit_services"
import mongoose, {Connection} from "mongoose"
import CircuitModel from "../../models/circuit_model"

let connection: Connection

beforeAll(async () => {
  connection = await mongooseTestLoader()
})

afterAll(async () => {
  await (connection as any).disconnect()
})

afterEach(async () => {
  await mongoose.connection.db.dropCollection("circuits")
})

describe("User Services", () => {
  const circuitData = {
    setAmount: 0,
    timeBetweenSetsSec: 0,
    exercises: []
  }

  it("Inserting circuits successfully", async () => {
    const circuitDocs = await circuitServices.insertManyCircuits([circuitData, circuitData])
    expect(circuitDocs).toBeTruthy()
    expect(circuitDocs.length).toBe(2)
  })

  it("Fetching multiple circuits by ids successfully", async () => {
    const circuitDocs = await circuitServices.insertManyCircuits([circuitData, circuitData])

    const circuitIds: mongoose.Types.ObjectId[] = circuitDocs.map((circuit: Circuit) =>
      mongoose.Types.ObjectId(circuit._id)
    )

    const cirDocs: Circuit[] = await circuitServices.getCircuits(circuitIds)
    expect(cirDocs).toBeTruthy()
    expect(cirDocs[0].setAmount).toEqual(circuitData.setAmount)
    expect(cirDocs[0].timeBetweenSetsSec).toEqual(circuitData.timeBetweenSetsSec)
  })

  it("Saving one single circuit successfully", async () => {
    const cirDoc: Circuit = (await circuitServices.saveCircuit(
      new CircuitModel(circuitData)
    )) as Circuit
    expect(cirDoc).toBeTruthy()
    expect(cirDoc.setAmount).toBe(circuitData.setAmount)
    expect(cirDoc.timeBetweenSetsSec).toBe(circuitData.timeBetweenSetsSec)
  })

  it("Inserting to documents with bulk writes successfully", async () => {
    const op1 = {insertOne: {document: circuitData}}
    const op2 = {insertOne: {document: circuitData}}

    const res = await circuitServices.bulkWrite([op1, op2])
    expect(res).toBeTruthy()
    expect(res?.result.ok).toBe(1)
  })
})
