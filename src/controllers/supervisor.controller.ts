import { Request, Response } from "express";
import { SupervisorServices } from "../services";
export class SupervisorController {
  constructor() {
    
  }

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await SupervisorServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await SupervisorServices.getOne(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };
  create = async (req: Request, res: Response) => {
    const { status, message, data } = await SupervisorServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };
  update = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await SupervisorServices.update(Number(id),req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await SupervisorServices.delete(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };
}
