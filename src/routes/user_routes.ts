import { Request, Response } from "express";
import { addUser as addUserToDB } from "../services/user_services";

const addUser = async (req: Request, res: Response) => {
  const doc = await addUserToDB({
    email: "gio@demo.com",
    createdOn: Date.now(),
    password: "gio123",
    name: "Giorgi Sharashenidze",
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

  console.log(query);
  res.json({
    success: true,
    id: req.body.userId,
  });
};

export { getUserById, addUser };
