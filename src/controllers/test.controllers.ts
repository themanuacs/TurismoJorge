import { Request, Response } from "express";
import { testServices } from "../services";

export class TestController {
  constructor() {}

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await testServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  create = async (req: Request, res: Response) => {
    const { status, message, data } = await testServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };
  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await testServices.update(id, req.body);
    return res.status(status).json({
      message,
      data,
    });
  };
  /*
  one = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await testServices.getOne(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };
  

  delete = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await testServices.delete(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };*/
}
