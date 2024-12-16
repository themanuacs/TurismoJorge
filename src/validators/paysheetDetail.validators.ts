import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { PaysheetDetailServices } from "../services";

class PaysheetDetailValidator {
  public validatePaysheetDetail = [
    body("name").notEmpty().withMessage("PaysheetDetail Name is required"),
    body("name").isString().withMessage("PaysheetDetail Name must be string"),
    body("id_paysheet").notEmpty().withMessage("PaysheetDetail id_paysheet is required"),
    body("id_paysheet").isInt().withMessage("PaysheetDetail id_paysheet must be integer"),
    body("id_concept").notEmpty().withMessage("PaysheetDetail id_concept is required"),
    body("id_concept").isInt().withMessage("PaysheetDetail id_concept must be integer"),
    body("amount").notEmpty().withMessage("PaysheetDetail amount is required"),
    body("amount").isInt().withMessage("PaysheetDetail amount must be integer"),
  ];

  //un middleware en el caso de campo id
  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await PaysheetDetailServices.getOne(id);
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
    const { status, message, data } = await PaysheetDetailServices.findByName(name);
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 200) {
      const service: any = data?.PaysheetDetail;
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
export { PaysheetDetailValidator };
