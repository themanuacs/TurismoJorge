import { Router } from "express";
import { validateFields } from "../middlewares";
import { PerformanceEvaluationController } from "../controllers";
import { PerformanceEvaluationValidator } from "../validators";
const router = Router();
const performanceEvaluationValidator = new PerformanceEvaluationValidator();
const performanceEvaluationController = new PerformanceEvaluationController();

router.get("/", performanceEvaluationController.all);

router.get("/:id", performanceEvaluationController.one);

router.post(
  "/",
  performanceEvaluationValidator.validatePerformanceEvaluation,
  performanceEvaluationValidator.validateIfNameIsUse,
  validateFields,
  performanceEvaluationController.create
);

router.put(
  "/:id",
  performanceEvaluationValidator.validatePerformanceEvaluation,
  performanceEvaluationValidator.validateIfIdExist,
  performanceEvaluationValidator.validateIfNameIsUse,
  validateFields,
  performanceEvaluationController.update
);

router.delete("/:id", performanceEvaluationController.delete); 
export default router;
