import { Request, Response } from "express";
import { userService } from "./user.service";

const registerUser = async (req: Request, res: Response) => {
  const payload = req.body;

  try {
    const user = await userService.registerUserIntoDB(payload);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(501).json({
      success: false,
      message: "Failed to register user",
      error: (error as Error).message,
    });
  }
};

export const userController = {
  registerUser,
};
