import { Request, Response } from "express";
import { UserService } from "../services/user_services";

const userService = new UserService();

const myInfo = (req: Request, res: Response) => {};

const addUser = async (req: Request, res: Response) => {
  const doc = await userService.addUser({
    email: "gio@demo.com",
    createdOn: Date.now(),
    password: "gio123",
    name: "Giorgi Sharashenidze",
  });
  if (!doc) {
    res.json({
      success: false,
      message: "We coulnd't add the user",
    });
  } else {
    res.json({
      success: true,
      doc: doc,
    });
  }
};
export { myInfo, addUser };
