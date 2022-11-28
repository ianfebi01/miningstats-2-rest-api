import express from "express";
import { getOverview } from "../controller/data.js";

const dataRouter = express.Router();

dataRouter.get("/overview", getOverview);

export default dataRouter;
