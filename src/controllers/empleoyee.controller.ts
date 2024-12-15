import { Request, Response } from "express";
import { EmpleoyeeServices } from "../services";
export class EmpleoyeeController {
  constructor() {
    
  }

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await EmpleoyeeServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await EmpleoyeeServices.getOne(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };
  create = async (req: Request, res: Response) => {
    const { status, message, data } = await EmpleoyeeServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };
  update = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await EmpleoyeeServices.update(Number(id),req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await EmpleoyeeServices.delete(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };
}
