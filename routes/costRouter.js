import express from "express";
import {
  deleteCost,
  getAllCosts,
  getCostById,
  getCostByUserId,
  getCostByUserIdByMonth,
  saveCost,
  updateCost,
} from "../controller/costController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const costRouter = express.Router();

costRouter.get("/", getAllCosts);
costRouter.post("/", saveCost);
costRouter.get("/:id", getCostById);
costRouter.patch("/:id", updateCost);
costRouter.delete("/:id", deleteCost);
costRouter.get("/id/:userId", getCostByUserId);
costRouter.get("/month/:userId", getCostByUserIdByMonth);

export default costRouter;
