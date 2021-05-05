import { Workout } from "./workout";

export interface User {
  email: string;
  name: string;
  password: string;
  createdOn?: number;
  workouts?: Workout[];
  exercises: Exercise[];
}
