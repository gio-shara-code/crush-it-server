import mongoose from "mongoose"
import config from "../config/index"

const mongooseLoader = async (): Promise<boolean | any> => {
  let connection: any
  try {
    connection = await mongoose.connect(
      `mongodb+srv://${config.db.username}:${config.db.password}@demo-cluster.ycsr4.mongodb.net/${config.db.name}?retryWrites=true&w=majority`,
      config.db.options
    )
  } catch (e) {
    console.log(`mongoose error: ${e}`)
    return process.exit(1)
  }
  console.log("Mongodb connection established!")
  return connection
}

const mongooseTestLoader = async (): Promise<boolean | any> => {
  let connection: any
  try {
    connection = await mongoose.connect(
      `mongodb+srv://${config.db.username}:${config.db.password}@demo-cluster.ycsr4.mongodb.net/crush-it-test-db?retryWrites=true&w=majority`,
      config.db.options
    )
  } catch (e) {
    console.log(`mongoose error: ${e}`)
    return process.exit(1)
  }
  console.log("Mongodb connection established with test-db!")
  return connection
}

export {mongooseLoader, mongooseTestLoader}
