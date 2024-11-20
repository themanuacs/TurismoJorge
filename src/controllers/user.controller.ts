import { Request, Response } from "express";
import { userServices } from "../services";

export class UserController {
  constructor() {}

  allUser = async (req: Request, res: Response) => {
    const { status, message, data } = await userServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  oneUser = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await userServices.getOne(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };
  createUser = async (req: Request, res: Response) => {
    const { status, message, data } = await userServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };
  updateUser = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await userServices.update(parseInt(id) as number,req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  deleteUser = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await userServices.delete(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };
  
  loginUser = async (req: Request, res: Response) => {

    const { status, message, data } = await userServices.getByEmail(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };
}
