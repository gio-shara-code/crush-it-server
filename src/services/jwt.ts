import jwt from "jsonwebtoken"
import config from "../config/index"

interface TokenData {
  _id: string
  email: string
}

const signToken = async (data: TokenData) => {
  let result
  try {
    result = await jwt.sign({id: data._id, email: data.email}, config.jWTSecretKey, {
      algorithm: "HS256"
    })
  } catch (e) {
    console.log(`Signing token failed. ${e}`)
    return
  }
  return result
}

const compareToken = async (token: string) => {
  let result
  try {
    result = await jwt.verify(token, config.jWTSecretKey)
  } catch (e) {
    console.log(`Signing token failed. ${e}`)
    return
  }
  return result
}
export {signToken, compareToken}
