import { Request, Response } from "express";
import { EmpleoyeeUserServices } from "../services";
export class EmpleoyeeUserController {
  constructor() {
    
  }

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await EmpleoyeeUserServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await EmpleoyeeUserServices.getOne(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };
  create = async (req: Request, res: Response) => {
    const { status, message, data } = await EmpleoyeeUserServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };
  update = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await EmpleoyeeUserServices.update(Number(id),req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await EmpleoyeeUserServices.delete(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };
}
