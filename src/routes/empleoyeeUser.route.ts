import { Router } from "express";
import { validateFields } from "../middlewares";
import { EmpleoyeeUserController } from "../controllers";
import { EmpleoyeeUserValidator } from "../validators";
const router = Router();
const empleoyeeUserValidator = new EmpleoyeeUserValidator();
const empleoyeeUserController = new EmpleoyeeUserController();

router.get("/", empleoyeeUserController.all);

router.get("/:id", empleoyeeUserController.one);

router.post(
  "/",
  empleoyeeUserValidator.validateEmpleoyeeUser,
  empleoyeeUserValidator.validateIfNameIsUse,
  validateFields,
  empleoyeeUserController.create
);

router.put(
  "/:id",
  empleoyeeUserValidator.validateEmpleoyeeUser,
  empleoyeeUserValidator.validateIfIdExist,
  empleoyeeUserValidator.validateIfNameIsUse,
  validateFields,
  empleoyeeUserController.update
);

router.delete("/:id", empleoyeeUserController.delete); 
export default router;
