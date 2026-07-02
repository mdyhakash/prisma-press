import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { userRoutes } from "./modules/user/user.route";
import { authRoutes } from "./modules/auth/auth.route";
import { postRoutes } from "./modules/post/post.route";
import { CommentRoutes } from "./modules/comment/comment.route";
import { SubscriptionRoutes } from "./modules/subscription/subscription.route";

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

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", CommentRoutes);
app.use("/api/subscription", SubscriptionRoutes);
export default app;
