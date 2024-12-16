import { Router } from "express";
import { validateFields } from "../middlewares";
import { PaysheetDetailController } from "../controllers";
import { PaysheetDetailValidator } from "../validators";
const router = Router();
const paysheetDetailValidator = new PaysheetDetailValidator();
const paysheetDetailController = new PaysheetDetailController();

router.get("/", paysheetDetailController.all);

router.get("/:id", paysheetDetailController.one);

router.post(
  "/",
  paysheetDetailValidator.validatePaysheetDetail,
  paysheetDetailValidator.validateIfNameIsUse,
  validateFields,
  paysheetDetailController.create
);

router.put(
  "/:id",
  paysheetDetailValidator.validatePaysheetDetail,
  paysheetDetailValidator.validateIfIdExist,
  paysheetDetailValidator.validateIfNameIsUse,
  validateFields,
  paysheetDetailController.update
);

router.delete("/:id", paysheetDetailController.delete); 
export default router;
