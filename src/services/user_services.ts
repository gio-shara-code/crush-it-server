import UserModel from "../models/user_model"
import {Types} from "mongoose"
import {User} from "../interfaces/user"

const addUser = async (user: User) => {
  const usr = new UserModel(user)
  try {
    const doc = await usr.save()
    return doc
  } catch (e) {
    console.log(`UserService[addUser] failed: ${e}`)
    return
  }
}

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

const pushUserWorkoutId = async (userId: string, workoutId: string) => {
  let user
  user = await getUserById(userId)
  if (!user) {
    console.log(`Fetching user by id either failed or not found!`)
    return
  }
  user.workouts?.push(workoutId)

  try {
    user = await user.save()
  } catch (e) {
    console.log(`user_services[pushUserWorkoutId]: Saving user into database failed. ${e}`)
    return
  }
  return workoutId
}

export {addUser, getUserById, checkUserExistencyByEmail, getUserByEmail, pushUserWorkoutId}
