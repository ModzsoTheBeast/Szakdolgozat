import { taskDTO } from './TaskDTO';

export interface CreteListObj {
  listName: string;
}

export interface ListDTO {
  listName: string;
  tasks: taskDTO[];
}
