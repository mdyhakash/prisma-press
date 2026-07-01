import { prisma } from "../../lib/prisma";
import { ICreateCommnet, IUpdateComment } from "./comment.interface";

const createComment = async (authorId: string, payload: ICreateCommnet) => {
  await prisma.post.findUniqueOrThrow({
    where: {
      id: payload.postId,
    },
  });
  const comment = await prisma.comment.create({
    data: {
      ...payload,
      authorId,
    },
  });

  return comment;
};
const getCommentByAuthorId = async () => {};
const getCommentByCommentId = async () => {};
const updateComment = async (
  commentId: string,
  data: IUpdateComment,
  authorId: string,
) => {
  const commentData = await prisma.comment.findUniqueOrThrow({
    where: { id: commentId },
    select: {
      id: true,
    },
  });
  const comment = await prisma.comment.update({
    where: {
      id: commentId,
      authorId,
    },
    data,
  });
  return comment;
};
const deleteComment = async (commentId: string, authorId: string) => {
  await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
      authorId,
    },
    select: {
      id: true,
    },
  });
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
};
const moderateComment = async () => {};

export const CommentService = {
  createComment,
  getCommentByAuthorId,
  getCommentByCommentId,
  updateComment,
  deleteComment,
  moderateComment,
};
