import { Exercise } from "./exercise"
import { Workout } from "./workout"

export interface User {
  email: string
  name: string
  createdOn: number
  exercises: Exercise[]
  workout_settings: {
    sound_enabled: boolean
  }
  workouts?: Workout[]
  password?: string
}
