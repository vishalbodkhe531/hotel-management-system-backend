import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const isAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const cookie = req.cookies["cookie"];
  const { cookie } = req.cookies;

  if (!cookie) return res.status(401).json({ message: "Unauthorized User" });

  try {
    const data = jwt.verify(
      cookie,
      process.env.SECREATE_KEY as string
    ) as JwtPayload;

    req.userId = data.userId;
    next();
  } catch (error) {
    next(error);
  }
};
