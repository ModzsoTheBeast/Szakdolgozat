import { ListsDataObj } from './ListDTOs';

export interface ProjectsObj {
  projectID: number;
  projectName: string;
  listsData: ListsDataObj[];
}

export interface CreateProjectDTO {
  projectID?: number;
  userID: number;
  projectName: string;
}
