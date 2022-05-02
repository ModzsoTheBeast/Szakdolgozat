import { priority } from '../models/enums/priorityEnum';
import { commentDTO } from './CommentDTO';
import { contributorsDTO } from './ContributorDTO';
import { taskListDTO } from './TaskListDTO';

export interface taskDTO {
  taskId?: number;
  TaskName: string;
  taskDescription: string;
  priority: priority;
}

export interface createTaskDTO {
  taskId?: number;
  positionInList?: number;
  taskName: string;
  listId: number;
}

export interface taskDetailDTO {
  taskId?: number;
  taskName: string;
  taskDescription?: string;
  isDone: boolean;
  contributors: contributorsDTO[];
  comments?: commentDTO[];
  cretedBy?: string;
  createdOn: Date;
  deadline?: Date;
  taskLists: taskListDTO[];
  level?: priority;
}

export interface updateTaskDTO {
  taskId: number;
  taskName?: string;
  taskDescription?: string;
  level?: string;
  deadline?: Date;
}

export interface addDeadlineDTO {
  taskId: number;
  deadline: Date;
}

export interface setTaskPriorityDTO {
  taskId: number;
  priority: priority;
}
