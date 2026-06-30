import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { postController } from "./post.controller";

const router = Router();

router.post(
  "/",
  auth(Role.User, Role.ADMIN, Role.AUTHOR),
  postController.createPost,
);
router.patch(
  "/:postId",
  auth(Role.User, Role.ADMIN, Role.AUTHOR),
  postController.updatePost,
);

export const postRoutes = router;
