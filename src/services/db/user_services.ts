import UserModel from "../../models/user_model"
import {Types, Document} from "mongoose"
import {User} from "../../interfaces/user"

const getUserById = async (id: string) => {
  let userDoc

  try {
    userDoc = await UserModel.findOne({
      _id: new Types.ObjectId(id)
    })
  } catch (e) {
    console.log(`UserService[getUserById]: fetching user by id failed. ${e}`)
    return
  }

  return userDoc
}

const getUserByEmail = async (email: string) => {
  let doc
  try {
    doc = await UserModel.findOne({
      email: email
    })
  } catch (e) {
    console.log(`UserService[getUserByEmail]: fetching user by email failed. ${e}`)
    return
  }
  return doc
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

export {getUserById, getUserByEmail, saveUser}
