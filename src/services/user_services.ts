import UserModel from "../models/user_model"
import {Types, Document} from "mongoose"
import {User} from "../interfaces/user"

const getUserById = async (id: string) => {
  try {
    const docs = await UserModel.find({
      _id: new Types.ObjectId(id)
    }) //excludes password field when retrieving user info
    if (docs.length === 0) return
    return docs[0]
  } catch (e) {
    console.log(`UserService[getUserById]: fetching user by id failed. ${e}`)
    return
  }
}

const getUserByEmail = async (email: string) => {
  try {
    const docs = await UserModel.find({
      email: email
    })
    if (docs.length === 0) return
    return docs[0]
  } catch (e) {
    console.log(`UserService[getUserByEmail]: fetching user by email failed. ${e}`)
    return
  }
}

const checkUserExistencyByEmail = async (email: string): Promise<boolean> => {
  try {
    const docs = await UserModel.find({email: email})
    if (docs.length !== 0) return true
  } catch (e) {
    console.log(`UserService[checkUserExistency] failed: ${e}`)
    return true
  }

  return false
}

const saveUser = async (user: User & Document) => {
  let userDoc
  try {
    userDoc = await user.save()
  } catch (e) {
    console.log(`user_services[userSave]: Saving user into database failed. ${e}`)
    return
  }
  return userDoc
}

export {getUserById, checkUserExistencyByEmail, getUserByEmail, saveUser}
