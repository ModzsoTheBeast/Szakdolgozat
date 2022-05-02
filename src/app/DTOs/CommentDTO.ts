export class commentDTO {
  commentId: number;
  createdOn: Date;
  createdBy: string;
  comment: string;
}

export interface createCommentDTO {
  taskId: number;
  userId: number;
  comment: string;
  createdOn?: Date;
  commentId?: number;
}

export interface updateCommentDTO {
  comment: string;
  taskCommentId: number;
}
