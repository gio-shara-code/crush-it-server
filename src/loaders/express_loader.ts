import { Application } from "express";
import { json } from "body-parser";
import cors from "cors";
import * as authRoute from "../routes/auth_routes";
import * as userRoute from "../routes/user_routes";
import { verifyToken } from "../middlewares/verify_token";
const expressLoader = (app: Application) => {
  app.use(json());
  app.use(cors());

  app.post("/register", authRoute.register);
  app.post("/login", authRoute.login);
  app.post("/add_user", userRoute.addUser);

  app.get("/my_info", verifyToken, userRoute.myInfo);
};

export { expressLoader };
