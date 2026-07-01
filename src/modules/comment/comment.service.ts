import { prisma } from "../../lib/prisma";
import {
  ICreateCommnet,
  IModerateComment,
  IUpdateComment,
} from "./comment.interface";

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
const getCommentByAuthorId = async (authorId: string) => {
  const comments = await prisma.comment.findMany({
    where: { id: authorId },
    orderBy: { createdAt: "desc" },
    include: {
      post: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
  return comments;
};
const getCommentByPostId = async (postId: string) => {
  const comment = await prisma.comment.findMany({
    where: {
      postId,
    },
  });
  return comment;
};
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
const moderateComment = async (commentId: string, data: IModerateComment) => {
  const commentData = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (commentData.status === data.status) {
    throw new Error(
      `Your provided status (${data.status}) is already up to date.`,
    );
  }

  const comment = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data,
  });
  return comment;
};

export const CommentService = {
  createComment,
  getCommentByAuthorId,
  getCommentByPostId,
  updateComment,
  deleteComment,
  moderateComment,
};
