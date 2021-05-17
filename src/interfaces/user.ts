export interface User {
  email: string
  name: string
  createdOn: number
  exerciseIds: String[]
  workoutSettings: {
    soundEnabled: boolean
  }
  workouts: String[]
  password?: string,
  _id?: string,
}
