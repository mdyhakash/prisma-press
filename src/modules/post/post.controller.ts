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
const getAllPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getAllPost();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post fetched successfully",
      data: result,
    });
  },
);
const getMyPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;

    const result = await postService.getMyPost(authorId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "My post retrive successfully",
      data: result,
    });
  },
);
const getPostByID = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;
    if (!postId) {
      throw new Error("Post Id needed in params");
    }
    const result = await postService.getPostByID(postId as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post retrived successfully",
      data: result,
    });
  },
);
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
const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";
    const postId = req.params.postId;

    const result = await postService.deletePost(
      postId as string,
      authorId as string,
      isAdmin as boolean,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post deleted",
      data: result,
    });
  },
);
const getPostsStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getPostsStats();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post stats retrieved successfully",
      data: result,
    });
  },
);

export const postController = {
  createPost,
  getAllPost,
  getMyPost,
  getPostByID,
  updatePost,
  deletePost,
  getPostsStats,
};
