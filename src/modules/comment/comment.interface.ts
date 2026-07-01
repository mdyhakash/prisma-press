import { CommentStatus } from "../../../generated/prisma/enums";

export interface ICreateCommnet {
  postId: string;
  content: string;
}

export interface IUpdateComment {
  content?: string;
  status?: CommentStatus;
}
