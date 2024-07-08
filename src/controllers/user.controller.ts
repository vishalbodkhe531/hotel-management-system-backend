import { Request, Response } from "express";

export const userCreate = (req: Request, res: Response) => {
  res.send(req.body);
};
