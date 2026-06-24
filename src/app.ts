import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { userRouter } from "./modules/user/user.route";
import { authRouter } from "./modules/auth/auth.route";

const app = express();
app.use(
  cors({
    origin: config.app_url,
  }),
);

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/users/", userRouter);
app.use("/api/auth", authRouter);
export default app;
