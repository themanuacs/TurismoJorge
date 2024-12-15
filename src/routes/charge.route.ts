import { Router } from "express";
import { validateFields } from "../middlewares";
import { ChargeController } from "../controllers";
import { ChargeValidator } from "../validators";
const router = Router();
const chargeValidator = new ChargeValidator();
const chargeController = new ChargeController();

router.get("/", chargeController.all);

router.get("/:id", chargeController.one);

router.post(
  "/",
  chargeValidator.validateCharge,
  chargeValidator.validateIfNameIsUse,
  validateFields,
  chargeController.create
);

router.put(
  "/:id",
  chargeValidator.validateCharge,
  chargeValidator.validateIfIdExist,
  chargeValidator.validateIfNameIsUse,
  validateFields,
  chargeController.update
);

router.delete("/:id", chargeController.delete); 
export default router;
