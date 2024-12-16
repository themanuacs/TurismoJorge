import { Router } from "express";
import { validateFields } from "../middlewares";
import { EmpleoyeeAssistanceController } from "../controllers";
import { EmpleoyeeAssistanceValidator } from "../validators";
const router = Router();
const empleoyeeAssistanceValidator = new EmpleoyeeAssistanceValidator();
const empleoyeeAssistanceController = new EmpleoyeeAssistanceController();

router.get("/", empleoyeeAssistanceController.all);

router.get("/:id", empleoyeeAssistanceController.one);

router.post(
  "/",
  empleoyeeAssistanceValidator.validateEmpleoyeeAssistance,
  empleoyeeAssistanceValidator.validateIfNameIsUse,
  validateFields,
  empleoyeeAssistanceController.create
);

router.put(
  "/:id",
  empleoyeeAssistanceValidator.validateEmpleoyeeAssistance,
  empleoyeeAssistanceValidator.validateIfIdExist,
  empleoyeeAssistanceValidator.validateIfNameIsUse,
  validateFields,
  empleoyeeAssistanceController.update
);

router.delete("/:id", empleoyeeAssistanceController.delete); 
export default router;
