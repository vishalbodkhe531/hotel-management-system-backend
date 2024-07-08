import { Request, Response } from "express";
import { User } from "../model/user.model";
import bcryptjs from "bcryptjs";

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

    res.status(202).json({ message: "user successfully login" });
  } catch (error) {
    console.log(`error while create user : ${error}`);
    res.status(400).send({ message: "error while login user" });
  }
};
