import { Request, Response } from "express";
import config from "../config/index";
import jwt from "jsonwebtoken";

const verifyToken = async (req: Request, res: Response, next: any) => {
  const token = req.header("authorization")?.split(" ")[1];

  if (!token)
    return res.json({
      message: "token not found",
      success: false,
    });

  try {
    const payload: any = await jwt.verify(token, config.jWTSecretKey);
    req.body.userId = payload.id;
    next();
  } catch {
    return res.json({
      message: "Token is invalid.",
      success: false,
    });
  }
};

export { verifyToken };
