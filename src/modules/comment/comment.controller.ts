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
const getCommentByAuthorId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.id;
    const result = await CommentService.getCommentByAuthorId(
      authorId as string,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "comment retrived successsfully",
      data: result,
    });
  },
);
const getCommentByPostId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;

    const result = await CommentService.getCommentByPostId(postId as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "comment retrieved successsfully",
      data: result,
    });
  },
);
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
const moderateComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId;
    const payload = req.body;
    const result = await CommentService.moderateComment(
      commentId as string,
      payload,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "comment moderated successsfully",
      data: result,
    });
  },
);

export const commnetController = {
  createComment,
  getCommentByAuthorId,
  getCommentByPostId,
  updateComment,
  deleteComment,
  moderateComment,
};
