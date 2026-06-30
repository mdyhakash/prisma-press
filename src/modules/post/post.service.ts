import { prisma } from "../../lib/prisma";
import { IPost } from "./post.interface";

const createPost = async (payload: IPost, userId: string) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });
  return result;
};
const getAllPost = async () => {};
const getMyPost = async () => {};
const getPostByID = async () => {};
const updatePost = async () => {};
const deletePost = async () => {};
const getPostsStats = async () => {};

export const postService = {
  createPost,
  getAllPost,
  getMyPost,
  getPostByID,
  updatePost,
  deletePost,
  getPostsStats,
};
