interface Exercise {
  name: string;
  reps_amount?: number;
  exercise_time_sec?: number;
  type: "time" | "reps";
  break_sec: number;
}
