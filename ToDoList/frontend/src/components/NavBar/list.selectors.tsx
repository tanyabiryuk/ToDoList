import { listReducerStateType } from './listReducer';

export const isLoadingListDataSelector = (state: listReducerStateType) =>
  state.isLoadingData;
