import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { ContractServices } from "../services";

class ContractValidator {
  public validateContract = [
    body("name").notEmpty().withMessage("Contract Name is required"),
    body("name").isString().withMessage("Contract Name must be string"),
    body("Date").notEmpty().withMessage("Contract Date is required"),
    body("Date").isDate().withMessage("Contract Date must be date"),
    body("salary").notEmpty().withMessage("Contract salary is required"),
    body("salary").isFloat().withMessage("Contract salary must be float"),
    body("state").notEmpty().withMessage("Contract state is required"),
    body("state").isBoolean().withMessage("Contract state must be boolean"),
    body("hours").notEmpty().withMessage("Contract hours is required"),
    body("hours").isInt().withMessage("Contract hours must be integer"),
    body("days").notEmpty().withMessage("Contract days is required"),
    body("days").isInt().withMessage("Contract days must be integer"),
    body("id_empleoyee").notEmpty().withMessage("Contract id_empleoyee is required"),
    body("id_empleoyee").isInt().withMessage("Contract id_empleoyee must be integer"),
    body("id_charge").notEmpty().withMessage("Contract id_charge is required"),
    body("id_charge").isInt().withMessage("Contract id_charge must be integer"),
    body("id_departament").notEmpty().withMessage("Contract id_departament is required"),
    body("id_departament").isInt().withMessage("Contract id_departament must be integer"),
  ];

  //un middleware en el caso de campo id
  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await ContractServices.getOne(id);
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
    const { status, message, data } = await ContractServices.findByname(name);
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 200) {
      const service: any = data?.Contract;
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
export { ContractValidator };
