import { Application } from "express";
import { json } from "body-parser";
import cors from "cors";
import * as authRoute from "../routes/auth_routes";
import * as userRoute from "../routes/user_routes";
import { verifyToken } from "../middlewares/verify_token";
import { UserService } from "../services/user_services";

const userService = new UserService();
const expressLoader = async (app: Application) => {
  app.use(json());
  app.use(cors());

  app.post("/register", authRoute.register);
  app.post("/login", authRoute.login);
  app.post("/add_user", verifyToken, userRoute.addUser);
  app.get("/get_user_by_id", verifyToken, userRoute.getUserById);
};

export { expressLoader };
