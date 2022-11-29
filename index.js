import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import incomeRouter from "./routes/incomeRouter.js";
import costRouter from "./routes/costRouter.js";
import userRouter from "./routes/userRouter.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dataRouter from "./routes/dataRouter.js";

dotenv.config();

const { connection } = mongoose;

const app = express();
const port = process.env.PORT || 419;

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Connection error : " + err.message));

// const db = mongoose.connection;
// db.on("error", () => console.error(error));
// db.once("open", () => console.log("Connected"));

app.use(cors({ credentials: true, origin: process.env.FE2_URL }));
app.use(cookieParser());
app.use(express.json());
app.use("/income", incomeRouter);
app.use("/cost", costRouter);
app.use("/user", userRouter);
app.use("/", dataRouter);

app.listen(port, () => console.log("App running on port : ", port));
