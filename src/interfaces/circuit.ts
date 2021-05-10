import {SubExercise} from "./sub_exercise"

export interface Circuit {
  _id?: string
  setAmount: number
  timeBetweenSetsSec: number
  exercises?: SubExercise[]
}
