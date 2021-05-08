import { Request, Response } from "express"
import config from "../config/index"
import jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import * as userServices from "../services/user_services"
import { defaultExercises } from "../const"

const register = async (req: Request, res: Response) => {
  //retieve email and password
  const { email, password, name } = req.body
  //check if email and password exist in the body
  if (!email || !password || !name) {
    return res.json({
      success: false,
      message: "Please provide neccessary fields for the registration!"
    })
  }

  //hash password
  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(password, 10)
  } catch {
    return res.json({
      success: false,
      message: "Internal server error: hashing password failed"
    })
  }

  //check if the email already exists
  const userExists = await userServices.checkUserExistencyByEmail(email)
  if (userExists)
    return res.json({
      success: false,
      message: `User with the email ${email} exists alreaady`
    })

  //add user into database
  //...
  const doc = await userServices.addUser({
    email: email,
    password: hashedPassword,
    createdOn: Date.now(),
    name: name,
    workouts: [],
    exercises: defaultExercises,
    workout_settings: {
      sound_enabled: true
    }
  })
  if (!doc) {
    return res.json({
      success: false,
      message: "Internal server: Writing user info into database failed"
    })
  }

  //signing token
  try {
    const token = await jwt.sign(
      { id: doc._id, email: doc.email },
      config.jWTSecretKey,
      {
        algorithm: "HS256"
      }
    )
    res.json({ success: true, token: token })
  } catch {
    res.json({
      message: "Internal server: signing jwt failed!",
      success: false
    })
  }
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email or/and password is missing!"
    })
  }
  //get user from database
  const doc = await userServices.getUserByEmail(email)
  if (!doc) {
    return res.json({
      success: false,
      message: `Your email ${email} doesn't exist`
    })
  }

  //Check if the password is correct
  if (doc.password === undefined) return

  let correctPassword
  try {
    correctPassword = await bcrypt.compare(password, doc.password)
  } catch {
    return res.json({
      success: false,
      message: "Internal server: comparing password doesn't work."
    })
  }

  if (!correctPassword)
    return res.json({
      success: false,
      message: "Password is wrong!"
    })

  //generate token using jwt
  let token
  try {
    token = await jwt.sign(
      { id: doc._id, email: doc.email },
      config.jWTSecretKey,
      { algorithm: "HS256" }
    )
  } catch (e) {
    return res.json({
      message: "auth_routes [login]: Token generation failed!",
      success: false
    })
  }
  res.json({ success: true, token: token })
}

export { register, login }
