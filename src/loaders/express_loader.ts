import { Application } from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import * as authRoute from "../routes/auth_routes";
import * as userRoute from "../routes/user_routes";
import { verifyToken } from "../middlewares/verify_token";

// const userService = new UserService();
const expressLoader = async (app: Application) => {
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cors());

  
  app.post("/register", authRoute.register);
  app.post("/login", authRoute.login);
  app.post("/user", verifyToken, userRoute.addUser);
  app.get("/user/:id", verifyToken, userRoute.getUserById); //get user with a certain id
  //app.get(/users) //for retrieving the users
  //app.post(/users or /user) //for retrieving the users
  //app.post(/user-edit-id) //for retrieving the users
  //New commit
  //Another commit
};

export { expressLoader };
