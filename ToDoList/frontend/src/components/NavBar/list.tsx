import axios from 'axios';
import { connectionStringLists } from '../../BLL/store';

export interface List {
  id?: number;
  title: string;
  Focused?: boolean;
}

export const getLists = async (): Promise<List[]> => {
  let getLists: List[] = [];
  await axios.get(connectionStringLists).then((response) => {
    response.data.map((list: List) => getLists.concat(list));
  });
  return getLists;
};
