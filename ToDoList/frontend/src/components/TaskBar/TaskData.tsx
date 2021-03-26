import axios from 'axios';
import { connectionStringTasks } from '../../BLL/store';

export interface Task {
  id?: number;
  content: string;
  done: boolean;
  inProgress: boolean;
  listId: number;
}

export const getTasks = async (): Promise<Task[]> => {
  let getTasks: Task[] = [];
  await axios.get(connectionStringTasks).then((response) => {
    response.data.map((task: Task) => getTasks.push(task));
  });
  return getTasks;
};
