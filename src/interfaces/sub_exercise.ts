interface SubExercise {
  name: string
  reps_amount?: number
  exercise_time_sec?: number
  exercise_type: "time" | "reps"
  break_sec: number
}

export { SubExercise  }
