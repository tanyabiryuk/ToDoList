//import { store } from '../store';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { List } from './list';
import {
  ADD_LIST,
  EDIT_LIST,
  LISTS_DATA_RECIEVED,
  SHOW_SPINNER,
  SWITCH_LIST,
} from './list.action.types';
import { fetchLists, switchList } from './list.actions';

export type listReducerStateType = {
  lists: List[];
  isLoadingData: boolean;
};

const initialData: listReducerStateType = {
  lists: [] as List[],
  isLoadingData: false,
};

const listReducer = (state = initialData, action: any) => {
  switch (action.type) {
    case ADD_LIST: {
      return {
        ...state,
        lists: state.lists.concat(action.payload.listsData),
      };
    }
    case EDIT_LIST: {
      const updatedLists: List[] = state.lists.map((list) => {
        if (list.id === action.payload.id) {
          return { list: action.payload.listData };
        } else {
          return list;
        }
      }) as List[];

      return {
        ...state,
        lists: updatedLists,
      };
    }
    case SWITCH_LIST: {
      const updatedLists: List[] = state.lists.map((list: List) => {
        if (list.id === action.payload.listId) {
          return {
            ...list,
            Focused: true,
          };
        } else {
          return {
            ...list,
            Focused: false,
          };
        }
      });
      return {
        ...state,
        lists: updatedLists,
      };
    }
    case LISTS_DATA_RECIEVED: {
      const recievedlists = action.payload.listsData.map((list: List) => {
        return {
          ...list,
          Focused: false,
        };
      });
      return {
        ...state,
        isLoadingData: false,
        lists: recievedlists,
      };
    }

    case SHOW_SPINNER: {
      return {
        ...state,
        isLoadingData: true,
      };
    }
    default: {
      return state;
    }
  }
};

const store = createStore(listReducer, applyMiddleware(thunk));

store.dispatch(fetchLists());
console.log(store.getState());
console.log('.......');
store.dispatch(switchList(3));
console.log(store.getState());

export default listReducer;
