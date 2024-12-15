import { Router } from "express";
import { validateFields } from "../middlewares";
import { PaysheetController } from "../controllers";
import { PaysheetValidator } from "../validators";
const router = Router();
const paysheetValidator = new PaysheetValidator();
const paysheetController = new PaysheetController();

router.get("/", paysheetController.all);

router.get("/:id", paysheetController.one);

router.post(
  "/",
  paysheetValidator.validatePaysheet,
  paysheetValidator.validateIfNameIsUse,
  validateFields,
  paysheetController.create
);

router.put(
  "/:id",
  paysheetValidator.validatePaysheet,
  paysheetValidator.validateIfIdExist,
  paysheetValidator.validateIfNameIsUse,
  validateFields,
  paysheetController.update
);

router.delete("/:id", paysheetController.delete); 
export default router;
