import { Request, Response } from "express";
import { User } from "../model/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const userCreate = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const isExistUser = await User.findOne({ email });

    if (isExistUser)
      return res.status(400).send({ message: "user already existed" });

    const hashPass = bcryptjs.hashSync(password, 10);

    await User.create({
      firstName,
      lastName,
      password: hashPass,
      email,
    });

    res.status(201).json({ message: "user successfully create" });
  } catch (error) {
    console.log(`error while create user : ${error}`);
    res.status(400).send({ message: "error while create user" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const isExistUser = await User.findOne({ email });

    if (!isExistUser)
      return res.status(404).send({ message: "user not found !!" });

    const matchPass = bcryptjs.compareSync(password, isExistUser.password);

    if (!matchPass)
      return res.status(404).send({ message: "Incorrect password!!" });

    const token = jwt.sign(
      { userId: isExistUser._id },
      process.env.SECREATE_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    const { password: xyz, ...userData } = isExistUser;

    res
      .cookie("cookie", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      })
      .status(202)
      .json(userData);
  } catch (error) {
    console.log(`error while create user : ${error}`);
    res.status(400).send({ message: "error while login user" });
  }
};

export const userLogout = async (req: Request, res: Response) => {
  res
    .clearCookie("cookie")
    .status(200)
    .json({ message: "user successfully logout" });
};

export const veryfyToken = (req: Request, res: Response) => {
  try {
    res.status(200).send({ userId: req.userId });
  } catch (error) {
    console.log(`Error while veryfyToken : ${error}`);
  }
};
