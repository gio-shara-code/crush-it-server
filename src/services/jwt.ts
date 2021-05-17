import jwt from "jsonwebtoken"
import config from "../config/index"

const signToken = async (data: {_id: string; email: string}) => {
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

export {signToken}
