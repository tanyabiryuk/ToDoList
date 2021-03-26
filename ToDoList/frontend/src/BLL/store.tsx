import axios, { AxiosResponse } from 'axios';
import { List } from '../components/NavBar/list';
import { Task } from '../components/TaskBar/TaskData';

export interface storeType {
  lists: List[];
  tasks: Task[];
  isLoading: boolean;
  getLists: () => Promise<void>;
  getTasks: () => Promise<void>;
}

const doGetTasks = async () => {
  store.tasks = await getTasks();
};

const doGetLists = async () => {
  store.isLoading = true;
  store.lists = await getLists();
  store.isLoading = false;
  console.log("DoGetLists", store.lists);
};

let store: storeType = {
  lists: [],
  tasks: [],
  isLoading: false,
  getLists: doGetLists,
  getTasks: doGetTasks,
};

export const connectionStringLists = 'https://localhost:44345/api/Lists';
export const connectionStringTasks = 'https://localhost:44345/api/Tasks';

export const getLists = async (): Promise<List[]> => {
  const getLists = await axios
    .get(connectionStringLists)
    .then((response: AxiosResponse<List[]>) => {
      return response.data.map((list: List) => {
        console.log(response.statusText);
        return { ...list, focused: false };
      });
    });
  return getLists as List[];
};

export const getTasks = async (): Promise<Task[]> => {
  const getTasks = await axios
    .get(connectionStringTasks)
    .then((response: AxiosResponse<Task[]>) => {
      console.log(response.statusText);
      return response.data;
    });
  return getTasks;
};

export const getCurrentTasks = (focusedListId: number)=>
{
  const filtered: Task[] = [];
  doGetTasks();
  store.tasks.forEach((task) => {
    if (task.listId === focusedListId) filtered.push(task);
  });
  return filtered;
}

export const getAllTasks = ()=>
{
  let tasks: Task[] = [];
  doGetTasks();
  store.tasks.forEach((task)=>tasks.push(task));
  return tasks;
}

doGetLists();
doGetTasks();

export default store;
