import {Request, Response} from "express"
import config from "../config/index"
import jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import * as userServices from "../services/db/user_services"
import UserModel from "../models/user_model"
import * as exerciseServices from "../services/db/exercise_services"
import {defaultExercises} from "../const"
import {hashPassword} from "../services/bcrypt"
import {signToken} from "../services/jwt"

const register = async (req: Request, res: Response) => {
  //retieve email and password
  const {email, password, name} = req.body

  //check if email and password exist in the body

  if (!email || !password || !name)
    return res.status(422).json({
      success: false,
      message: "Please provide neccessary fields for the registration!"
    })

  const hashedPassword = await hashPassword(password)
  if (!hashedPassword) {
    return res.json({
      success: false,
      message: "Internal server error: registering user failed."
    })
  }

  const existingUser = await userServices.getUserByEmail(email)
  if (existingUser)
    return res.status(409).json({
      success: false,
      message: `User with the email ${email} exists already`
    })

  const exercises = await exerciseServices.insertDefaultExercises(defaultExercises)
  if (!exercises)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error: Registering user failed."
    })

  const exerciseIds = exercises.map((exercise: any) => exercise._id)

  const userDoc = await userServices.saveUser(
    new UserModel({
      email: email,
      password: hashedPassword,
      createdOn: Date.now(),
      name: name,
      workouts: [],
      exerciseIds: exerciseIds,
      workoutSettings: {
        soundEnabled: true
      }
    })
  )

  if (!userDoc)
    return res.json({
      success: false,
      message: "Internal server: Registering user failed"
    })

  const token = await signToken({_id: userDoc._id, email: userDoc.email})
  if (!token)
    return res.json({
      message: "Internal server: Registering user failed",
      success: false
    })

  res.status(200).json({success: true, token: token})
}

const login = async (req: Request, res: Response) => {
  const {email, password} = req.body
  if (!email || !password) {
    return res.status(422).json({
      success: false,
      message: "Email or/and password is missing!"
    })
  }

  //get user from database
  const doc = await userServices.getUserByEmail(email)
  if (!doc) {
    return res.status(404).json({
      success: false,
      message: `Your email ${email} doesn't exist`
    })
  }

  //Check if the password is correct
  if (doc.password === undefined)
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: Please contact the administration.`
    })

  let correctPassword
  try {
    correctPassword = await bcrypt.compare(password, doc.password)
  } catch {
    return res.status(403).json({
      success: false,
      message: "Internal server: comparing password failed."
    })
  }

  if (!correctPassword)
    return res.status(403).json({
      success: false,
      message: "Password is wrong!"
    })

  //generate token using jwt
  let token
  try {
    token = await jwt.sign({id: doc._id, email: doc.email}, config.jWTSecretKey, {
      algorithm: "HS256"
    })
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error: Token generation failed!",
      success: false
    })
  }
  res.status(200).json({success: true, token: token})
}

export {register, login}
