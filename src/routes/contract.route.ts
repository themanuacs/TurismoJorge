import { Router } from "express";
import { validateFields } from "../middlewares";
import { ContractController } from "../controllers";
import { ContractValidator } from "../validators";
const router = Router();
const contractValidator = new ContractValidator();
const contractController = new ContractController();

router.get("/", contractController.all);

router.get("/:id", contractController.one);

router.post(
  "/",
  contractValidator.validateContract,
  contractValidator.validateIfNameIsUse,
  validateFields,
  contractController.create
);

router.put(
  "/:id",
  contractValidator.validateContract,
  contractValidator.validateIfIdExist,
  contractValidator.validateIfNameIsUse,
  validateFields,
  contractController.update
);

router.delete("/:id", contractController.delete); 
export default router;
