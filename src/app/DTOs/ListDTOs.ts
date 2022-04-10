import { taskDTO } from './TaskDTO';

export interface CreteListObj {
  listPosition: number;
  listName: string;
}

export interface ListDTO {
  id?: number;
  listPosition?: number;
  listName: string;
  tasks: taskDTO[];
}

export interface ListsDataObj {
  listName: string;
  listTasksNumber: number;
}
