import { Request, Response } from "express";
import config from "../config/index";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { addUser, checkUserExistencyByEmail, getUserByEmail } from "../services/user_services";


const register = async (req: Request, res: Response) => {
  //retieve email and password
  const { email, password, name } = req.body;
  //check if email and password exist in the body
  if (!email || !password || !name) {
    return res.json({
      success: false,
      message: "Please provide neccessary fields for the registration!",
    });
  }

  //hash password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch {
    return res.json({
      success: false,
      message: "Internal server error: hashing password failed",
    });
  }

  //check if the email already exists
  const userExists = await checkUserExistencyByEmail(email);
  if (userExists)
    return res.json({
      success: false,
      message: `User with the email ${email} exists alreaady`,
    });

  //add user into database
  //...
  const doc = await addUser({
    email: email,
    password: hashedPassword,
    createdOn: Date.now(),
    name: name,
  });
  if (!doc) {
    return res.json({
      success: false,
      message: "Internal server: Writing user info into database failed",
    });
  }

  //signing token
  try {
    const token = await jwt.sign(
      { id: doc._id, email: doc.email },
      config.jWTSecretKey,
      {
        algorithm: "HS256",
      }
    );
    res.json({ success: true, token: token });
  } catch {
    res.json({
      message: "Internal server: signing jwt failed!",
      success: false,
    });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email or/and password is missing!",
    });
  }
  //get user from database
  const doc = await getUserByEmail(email);
  if (!doc) {
    return res.json({
      success: false,
      message: `Your email ${email} doesn't exist`,
    });
  }

  //Check if the password is correct
  try {
    const success = await bcrypt.compare(password, doc.password);
    if (!success)
      return res.json({
        success: false,
        message: "Password is wrong!",
      });
  } catch {
    res.json({
      success: false,
      message: "Internal server: comparing password doesn't work.",
    });
  }

  //generate token using jwt
  try {
    const token = await jwt.sign({ id: doc._id, email: doc.email }, config.jWTSecretKey, {
      algorithm: "HS256",
    });
    res.json({ success: true, token: token });
  } catch {
    res.json({
      message: "We couldn't generate a token for you!",
      success: false,
    });
  }
};

export { register, login };
