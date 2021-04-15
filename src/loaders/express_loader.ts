import { Application } from "express";
import { json } from "body-parser";
import cors from "cors";
import * as authRoutes from "../routes/auth_utils";
import * as userRoutes from "../routes/user_utils";
import { verifyToken } from "../middlewares/verify_token";
const expressLoader = (app: Application) => {
  app.use(json());
  app.use(cors());

  app.post("/register", authRoutes.register);
  app.post("/login", authRoutes.login);
  app.post("/add_user", userRoutes.addUser);

  app.get("/my_info", verifyToken, userRoutes.myInfo);
};

export { expressLoader };
