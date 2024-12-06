import { Router } from "express";
import { TestController } from "../controllers";
const router = Router();
const testController=new TestController();
router.get("/", testController.all);//http://localhost:3600/api/tests
router.post("/", testController.create);//http://localhost:3800/api/tests
router.put("/:id", testController.update);//http://localhost:3800/api/tests/1

export default router;