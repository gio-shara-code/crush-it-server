import { Request, Response } from "express";
import * as userServices from "../services/user_services";

const addUser = async (req: Request, res: Response) => {
  const doc = await userServices.addUser({
    email: "gio@demo.com",
    createdOn: Date.now(),
    password: "gio123",
    name: "Giorgi Sharashenidze",
    workouts: [],
  });

  if (!doc) {
    res.json({
      success: false,
      message: "We couldn't add the user",
    });
  } else {
    res.json({
      success: true,
      doc: doc,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const query = req.params;
  const user = await userServices.getUserById(query.id);
  console.log(user);
  if (!user) {
    return res.json({
      success: false,
      message: "User not found.",
    });
  }
  res.json({
    success: true,
    user: user,
  });
};

export { getUserById, addUser };
