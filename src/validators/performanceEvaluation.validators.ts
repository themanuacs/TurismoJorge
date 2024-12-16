import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { PerformanceEvaluationServices } from "../services";

class PerformanceEvaluationValidator {
  public validatePerformanceEvaluation = [
    body("name").notEmpty().withMessage("PerformanceEvaluation Name is required"),
    body("name").isString().withMessage("PerformanceEvaluation Name must be string"),
    body("date").notEmpty().withMessage("PerformanceEvaluation date is required"),
    body("date").isDate().withMessage("PerformanceEvaluation date must be Date"),
    body("qualification").notEmpty().withMessage("PerformanceEvaluation qualification is required"),
    body("qualification").isInt().withMessage("PerformanceEvaluation qualification must be integer"),
    body("comments").notEmpty().withMessage("PerformanceEvaluation comments is required"),
    body("comments").isString().withMessage("PerformanceEvaluation comments must be string"),
    body("id_empleoyee").notEmpty().withMessage("PerformanceEvaluation id_empleoyee is required"),
    body("id_empleoyee").isInt().withMessage("PerformanceEvaluation id_empleoyee must be integer"),
    body("id_supervisor").notEmpty().withMessage("PerformanceEvaluation id_supervisor is required"),
    body("id_supervisor").isInt().withMessage("PerformanceEvaluation id_supervisor must be integer"),
  ];

  //un middleware en el caso de campo id
  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await PerformanceEvaluationServices.getOne(id);
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 404) {
      if (id) {
        return res.status(404).json({
          errors: [
            {
              type: "field",
              msg: `El parametro id : ${id}, no existe en la base de datos.`,
              path: "id",
              location: "param",
            },
          ],
        });
      }
    }
    next();
  };
  //un middleware en el caso de campo unico
  public validateIfNameIsUse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    let { name } = req.body;
    const { status, message, data } = await PerformanceEvaluationServices.findByName(name);
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 200) {
      const service: any = data?.PerformanceEvaluation;
      if (id) {
        //caso si es para actualizar datos
        if (id != service.id) {
          return res.status(400).json({
            errors: [
              {
                type: "field",
                msg: `Nombre en uso : ${name}, para el registro actual`,
                path: "name",
                location: "body",
              },
            ],
          });
        }
      } else {
        //caso si es para registrar un nuevo rol
        return res.status(400).json({
          errors: [
            {
              type: "field",
              msg: `Nombre en uso : ${name}, para el nuevo registro`,
              path: "name",
              location: "body",
            },
          ],
        });
      }
    }
    next();
  };
}
export { PerformanceEvaluationValidator };
