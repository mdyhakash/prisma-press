import { Router } from "express";
import { userController } from "./user.controller";

import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/register", userController.registerUser);
router.get(
  "/me",
  auth(Role.ADMIN, Role.User, Role.AUTHOR),
  userController.getMyProfile,
);

export const userRouter = router;
