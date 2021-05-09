import {Request, Response} from "express"
import * as workoutServices from "../services/workout_services"
import * as circuitServices from "../services/circuit_services"
import * as userServices from "../services/user_services"
import {Circuit} from "../interfaces/circuit"
import {Types} from "mongoose"

const addWorkout = async (req: Request, res: Response) => {
  const {workoutName, workoutDescription, circuits} = req.body
  if (!workoutName || !workoutDescription) {
    return res.json({
      success: false,
      message: "Please provide all fields"
    })
  }

  let circuitIds

  // add all circuits in db
  if (circuits) {
    const circuitDocs = await circuitServices.insertManyCircuits(circuits)
    if (!circuitDocs) {
      return res.json({
        success: false,
        message: "Inserting ciruits failed"
      })
    }
    circuitIds = circuitDocs.map((circuit: Circuit) => circuit._id)
  }

  //calculate exercise total amount
  //...
  //calculate total amount of sets total amount
  //...

  let workout

  workout = await workoutServices.addWorkout({
    description: workoutDescription,
    exerciseTotalAmount: 0,
    setTotalAmount: 0,
    name: workoutName,
    circuitIds: circuitIds ?? []
  })

  if (!workout) return res.json({success: false, message: "Adding workout failed."})

  //user update
  const user = await userServices.getUserById(req.body.userId)
  if (!user) {
    console.log(`Fetching user by id either failed or not found!`)
    return
  }
  user.workouts?.push(workout._id)

  const userDoc = await userServices.saveUser(user)
  if (!userDoc) {
    return res.json({success: false, workoutId: "Adding workout failed."})
  }

  res.json({success: true, workoutId: userDoc})
}

const workouts = async (req: Request, res: Response) => {
  //find the user
  const user = await userServices.getUserById(req.body.userId)
  if (!user) {
    return res.json({
      success: false,
      message: "Fetching a user failed"
    })
  }
  if (user.workouts.length === 0) {
    return res.json({
      success: true,
      workouts: []
    })
  }

  const workoutsIds = user.workouts.map((workoutId) => Types.ObjectId(`${workoutId}`))
  const workoutDocs = await workoutServices.getWorkoutsBasedOnIds(workoutsIds)
  if (!workoutDocs) {
    return res.json({
      success: false,
      message: "Fetching workouts failed!"
    })
  }
  res.json({
    success: true,
    workouts: workoutDocs
  })

  //find workouts based on the ids
  //

  // let workouts
  // try {
  //   workouts = await workoutServices.getWorkouts(req.body.userId)
  //   if (!workouts) {
  //     return res.json({success: false})
  //   }
  // } catch (e) {
  //   return res.json({success: false, message: "Something went wrong"})
  // }
  // res.json({success: true, workouts: workouts})
  //   const workouts = await workoutServices.getWorkouts(req.body.userId);
}

export {workouts, addWorkout}
