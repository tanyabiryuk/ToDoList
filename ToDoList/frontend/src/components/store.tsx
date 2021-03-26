import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import listReducer from './NavBar/listReducer';

const rootReducer = combineReducers({
  lists: listReducer,
  // tasks: taskReducer,
});

type rootReducerType = typeof rootReducer;
export type rootStateType = ReturnType<rootReducerType>;

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
