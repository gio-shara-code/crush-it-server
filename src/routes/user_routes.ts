import { Request, Response } from "express";
import { UserService } from "../services/user_services";

const userService = new UserService();


/**
 * Think of the design your api.
 * Look at the frontend and think on how to design your api.
 *
 */

const getUserById = async (req: Request, res: Response) => {
  const userDoc = await userService.getUserById(req.body.email);

  if (!userDoc) {
    return res.json({
      success: false,
      message: "User doesn't exists",
    });
  }

  res.json({
    success: true,
    user: userDoc,
  });
};

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

export { getUserById, addUser };
