import { catchAsync } from "./../../utils/catchAsync";
import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { CommentService } from "./comment.service";
import { sendResponse } from "../../utils/sendResponse";

const createComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const payload = req.body;

    const result = await CommentService.createComment(
      authorId as string,
      payload,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "comment created successsfully",
      data: result,
    });
  },
);
const getCommentByAuthorId = async () => {};
const getCommentByCommentId = async () => {};
const updateComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const commentId = req.params.commentId;
    const authorId = req.user?.id;
    const result = await CommentService.updateComment(
      commentId as string,
      payload,
      authorId as string,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "comment updated successsfully",
      data: result,
    });
  },
);
const deleteComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId;
    const authorId = req.user?.id;
    const result = await CommentService.deleteComment(
      commentId as string,
      authorId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "comment deleted successsfully",
      data: result,
    });
  },
);
const moderateComment = async () => {};

export const commnetController = {
  createComment,
  getCommentByAuthorId,
  getCommentByCommentId,
  updateComment,
  deleteComment,
  moderateComment,
};
