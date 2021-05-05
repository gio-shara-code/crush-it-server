import { Request, Response } from "express";
import * as userServices from "../services/user_services";

const addUser = async (req: Request, res: Response) => {
  // const doc = await userServices.addUser();
  let doc;
  // let newSubDoc = <any>{ property1: "example1", property2: "example2" };
  // doc.workouts.push(newSubDoc);

  if (!doc) {
    return res.json({
      success: false,
      message: "We couldn't add the user",
    });
  }
  res.json({
    success: true,
    doc: doc,
  });
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
