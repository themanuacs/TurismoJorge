import { Router } from "express";
import { validateFields } from "../middlewares";
import { ConceptController } from "../controllers";
import { ConceptValidator } from "../validators";
const router = Router();
const conceptValidator = new ConceptValidator();
const conceptController = new ConceptController();

router.get("/", conceptController.all);

router.get("/:id", conceptController.one);

router.post(
  "/",
  conceptValidator.validateConcept,
  conceptValidator.validateIfNameIsUse,
  validateFields,
  conceptController.create
);

router.put(
  "/:id",
  conceptValidator.validateConcept,
  conceptValidator.validateIfIdExist,
  conceptValidator.validateIfNameIsUse,
  validateFields,
  conceptController.update
);

router.delete("/:id", conceptController.delete); 
export default router;
