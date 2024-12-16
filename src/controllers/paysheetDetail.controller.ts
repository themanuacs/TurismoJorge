import { Request, Response } from "express";
import { PaysheetDetailServices } from "../services";
export class PaysheetDetailController {
  constructor() {
    
  }

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await PaysheetDetailServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await PaysheetDetailServices.getOne(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };
  create = async (req: Request, res: Response) => {
    const { status, message, data } = await PaysheetDetailServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };
  update = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await PaysheetDetailServices.update(Number(id),req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await PaysheetDetailServices.delete(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };
}
