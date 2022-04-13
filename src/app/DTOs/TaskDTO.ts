import { commentDTO } from './CommentDTO';
import { contributorsDTO } from './ContributorDTO';
import { taskListDTO } from './TaskListDTO';

export interface taskDTO {
  id?: number;
  taskPosition?: number;
  name: string;
  desc: string;
  done: boolean;
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
