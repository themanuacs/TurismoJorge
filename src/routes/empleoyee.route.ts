import { Router } from "express";
import { validateFields } from "../middlewares";
import { EmpleoyeeController } from "../controllers";
import { EmpleoyeeValidator } from "../validators";
const router = Router();
const empleoyeeValidator = new EmpleoyeeValidator();
const empleoyeeController = new EmpleoyeeController();

router.get("/", empleoyeeController.all);

router.get("/:id", empleoyeeController.one);

router.post(
  "/",
  empleoyeeValidator.validateEmpleoyee,
  empleoyeeValidator.validateIfNameIsUse,
  validateFields,
  empleoyeeController.create
);

router.put(
  "/:id",
  empleoyeeValidator.validateEmpleoyee,
  empleoyeeValidator.validateIfIdExist,
  empleoyeeValidator.validateIfNameIsUse,
  validateFields,
  empleoyeeController.update
);

router.delete("/:id", empleoyeeController.delete); 
export default router;
