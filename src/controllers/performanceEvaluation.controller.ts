import { Request, Response } from "express";
import { PerformanceEvaluationServices } from "../services";
export class PerformanceEvaluationController {
  constructor() {
    
  }

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await PerformanceEvaluationServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await PerformanceEvaluationServices.getOne(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };
  create = async (req: Request, res: Response) => {
    const { status, message, data } = await PerformanceEvaluationServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };
  update = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await PerformanceEvaluationServices.update(Number(id),req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await PerformanceEvaluationServices.delete(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };
}
