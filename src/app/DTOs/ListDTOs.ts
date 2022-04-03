import { taskDTO } from './TaskDTO';

export interface CreteListObj {
  listName: string;
}

export interface ListDTO {
  id?: number;
  listName: string;
  tasks: taskDTO[];
}
