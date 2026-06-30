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
const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";

    const postId = req.params.postId;
    const payload = req.body;

    if (!postId) {
      throw new Error("post id required in params");
    }

    const result = await postService.updatePost(
      postId as string,
      payload,
      authorId as string,
      isAdmin as boolean,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post updated successfully",
      data: result,
    });
  },
);
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
