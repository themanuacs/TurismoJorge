import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { EmpleoyeeServices } from "../services";

class EmpleoyeeValidator {
  public validateEmpleoyee = [
    body("name").notEmpty().withMessage("Empleoyee Name is required"),
    body("name").isString().withMessage("Empleoyee Name must be string"),
    body("last_name").notEmpty().withMessage("Empleoyee last_name is required"),
    body("last_name").isString().withMessage("Empleoyee last_name must be string"),
    body("Tshirt_size").notEmpty().withMessage("Empleoyee Tshirt_size is required"),
    body("Tshirt_size").isInt().withMessage("Empleoyee Tshirt_size must be Integer"),
    body("Pants_size").notEmpty().withMessage("Empleoyee Pants_size is required"),
    body("Pants_size").isInt().withMessage("Empleoyee Pants_size must be Integer"),
    body("Shoes_size").notEmpty().withMessage("Empleoyee Shoes_size is required"),
    body("Shoes_size").isInt().withMessage("Empleoyee Shoes_size must be Integer"),
    
  ];

  //un middleware en el caso de campo id
  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await EmpleoyeeServices.getOne(id);
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
    const { status, message, data } = await EmpleoyeeServices.findByName(name);
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 200) {
      const service: any = data?.Empleoyee;
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
export { EmpleoyeeValidator };
