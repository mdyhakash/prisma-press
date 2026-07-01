import { Router } from "express";
import { commnetController } from "./comment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  auth(Role.ADMIN, Role.AUTHOR, Role.User),
  commnetController.createComment,
);
router.get("/author/:authorId", commnetController.getCommentByAuthorId);
router.get("/:postId", commnetController.getCommentByPostId);
router.patch(
  "/:commentId",
  auth(Role.ADMIN, Role.AUTHOR, Role.User),
  commnetController.updateComment,
);
router.delete(
  "/:commentId",
  auth(Role.ADMIN, Role.AUTHOR, Role.User),
  commnetController.deleteComment,
);
router.put(
  "/:commentId/moderate",
  auth(Role.ADMIN),
  commnetController.moderateComment,
);

export const CommentRoutes = router;
