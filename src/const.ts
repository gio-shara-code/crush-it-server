import {SubExercise} from "./interfaces/sub_exercise"

const defaultExercises: SubExercise[] = [
  {
    name: "Burpees",
    break_sec: 10,
    exercise_type: "time",
    exercise_time_sec: 20
  },
  {
    name: "Push-ups",
    break_sec: 10,
    exercise_type: "reps",
    reps_amount: 20
  },
  {
    name: "Push-ups",
    break_sec: 10,
    exercise_type: "reps",
    reps_amount: 10
  }
]

export {defaultExercises}
