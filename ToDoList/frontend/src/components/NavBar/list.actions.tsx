import { getLists, List } from './list';
import { Dispatch } from 'redux';
import {
  ADD_LIST,
  DELETE_LIST,
  EDIT_LIST,
  LISTS_DATA_RECIEVED,
  SHOW_SPINNER,
  SWITCH_LIST,
} from './list.action.types';
import axios from 'axios';

export const fetchLists = () => {
  return (dispatch: any) => {
    dispatch(showSpinner());
    axios.get('https://localhost:44396/api/List').then((response) => {
      dispatch(listsDataRecieved(response.data));
    });
  };
};

export const addList = (listData: List) => {
  return {
    type: ADD_LIST,
    payload: {
      listData,
    },
  };
};

export const switchList = (listId: number) => {
  return {
    type: SWITCH_LIST,
    payload: {
      listId,
    },
  };
};

export const editList = (listData: List) => {
  return {
    type: EDIT_LIST,
    payload: {
      listData,
    },
  };
};

export const deleteList = (listId: number) => {
  return {
    type: DELETE_LIST,
    payload: {
      listId,
    },
  };
};

export const listsDataRecieved = (listsData: List[]) => {
  return {
    type: LISTS_DATA_RECIEVED,
    payload: {
      listsData,
    },
  };
};

export const showSpinner = () => {
  return {
    type: SHOW_SPINNER,
  };
};
