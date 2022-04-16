import { commentDTO } from './CommentDTO';
import { contributorsDTO } from './ContributorDTO';
import { taskListDTO } from './TaskListDTO';

export interface taskDTO {
  taskId?: number;
  taskPosition?: number;
  TaskName: string;
  taskDescription: string;
  done: boolean;
}

export interface createTaskDTO {
  taskId?: number;
  positionInList?: number;
  taskName: string;
  listId: number;
}

export interface taskDetailDTO {
  name: string;
  desc?: string;
  done: boolean;
  contributors: contributorsDTO[];
  comments?: commentDTO[];
  cretedBy: string;
  createdOn: Date;
  deadline?: Date;
  taskLists: taskListDTO[];
}
