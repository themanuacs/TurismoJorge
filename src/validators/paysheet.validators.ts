import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { PaysheetServices } from "../services";

class PaysheetValidator {
  public validatePaysheet = [
    body("name").notEmpty().withMessage("Paysheet Name is required"),
    body("name").isString().withMessage("Paysheet Name must be string"),
    body("start_date").notEmpty().withMessage("Paysheet start_date is required"),
    body("start_date").isDate().withMessage("Paysheet start_date must be Date"),
    body("end_date").notEmpty().withMessage("Paysheet end_date is required"),
    body("end_date").isDate().withMessage("Paysheet end_date must be Date"),
    body("id_contract").notEmpty().withMessage("Paysheet Name is required"),
    body("id_contract").isInt().withMessage("Paysheet Name must be integer"),
  ];

  //un middleware en el caso de campo id
  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await PaysheetServices.getOne(id);
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
    const { status, message, data } = await PaysheetServices.findByName(name);
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 200) {
      const service: any = data?.Paysheet;
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
export { PaysheetValidator };
