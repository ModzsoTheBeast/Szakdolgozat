export interface taskListDTO {
  id?: number;
  name: string;
  items: taskListItemDTO[];
}

export interface taskListItemDTO {
  name: string;
  isDone: boolean;
}
