import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";

const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const payload = req.body;
    const result = await postService.createPost(payload, id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post created successfully",
      data: result,
    });
  },
);
const getAllPost = async () => {};
const getMyPost = async () => {};
const getPostByID = async () => {};
const updatePost = async () => {};
const deletePost = async () => {};
const getPostsStats = async () => {};

export const postController = {
  createPost,
  getAllPost,
  getMyPost,
  getPostByID,
  updatePost,
  deletePost,
  getPostsStats,
};
