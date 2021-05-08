import { Request, Response } from "express";
import * as userServices from "../services/user_services";

// const addUser = async (req: Request, res: Response) => {
//   // const doc = await userServices.addUser();
//   let doc;
//   // let newSubDoc = <any>{ property1: "example1", property2: "example2" };
//   // doc.workouts.push(newSubDoc);

//   if (!doc) {
//     return res.json({
//       success: false,
//       message: "We couldn't add the user",
//     });
//   }
//   res.json({
//     success: true,
//     doc: doc,
//   });
// };

const getUser = async (req: Request, res: Response) => {
  console.log(req.body.userId);
  const user = await userServices.getUserById(req.body.userId);
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

export { getUser };
