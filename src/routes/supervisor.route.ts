import { Router } from "express";
import { validateFields } from "../middlewares";
import { SupervisorController } from "../controllers";
import { SupervisorValidator } from "../validators";
const router = Router();
const supervisorValidator = new SupervisorValidator();
const supervisorController = new SupervisorController();

router.get("/", supervisorController.all);

router.get("/:id", supervisorController.one);

router.post(
  "/",
  supervisorValidator.validateSupervisor,
  supervisorValidator.validateIfNameIsUse,
  validateFields,
  supervisorController.create
);

router.put(
  "/:id",
  supervisorValidator.validateSupervisor,
  supervisorValidator.validateIfIdExist,
  supervisorValidator.validateIfNameIsUse,
  validateFields,
  supervisorController.update
);

router.delete("/:id", supervisorController.delete); 
export default router;
