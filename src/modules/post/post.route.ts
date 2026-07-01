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
router.get("/", postController.getAllPost);
router.get(
  "/my-posts",
  auth(Role.ADMIN, Role.AUTHOR, Role.User),
  postController.getMyPost,
);
router.get(
  "/:postId",
  auth(Role.ADMIN, Role.AUTHOR, Role.User),
  postController.getPostByID,
);
router.patch(
  "/:postId",
  auth(Role.User, Role.ADMIN, Role.AUTHOR),
  postController.updatePost,
);
router.delete(
  "/:postId",
  auth(Role.User, Role.ADMIN, Role.AUTHOR),
  postController.deletePost,
);

export const postRoutes = router;
