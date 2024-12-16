import { Request, Response } from "express";
import { PaysheetServices } from "../services";
export class PaysheetController {
  constructor() {
    
  }

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await PaysheetServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await PaysheetServices.getOne(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };
  create = async (req: Request, res: Response) => {
    const { status, message, data } = await PaysheetServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };
  update = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await PaysheetServices.update(Number(id),req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await PaysheetServices.delete(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };
}
