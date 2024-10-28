import { configureStore, ThunkAction, Action, combineReducers, PayloadAction, AnyAction, getDefaultMiddleware, Middleware } from '@reduxjs/toolkit';
import counterReducer, { increment } from '../features/counter/counterSlice';
import colorReducer, { random } from '../features/color/ColorSlice';
import historyReducer from '../app/history';
import historyMiddleware from './historyMiddleware'
import undoable, { includeAction, excludeAction } from 'redux-undo';
import { ignoreActions } from 'redux-ignore'

// Actions can be set to be ignored withthis filter fuction... see random Color dispatch call
type RecordAction = {wouldLikeToBeInHistory: boolean} & Action
function isActionSelfExcluded(action: RecordAction) {
  return action.wouldLikeToBeInHistory
}

// 1.
// The Color State still not ok, the old state is stored and goes back to it (color value is not ignored, stored in history)
// const myReducer = undoable(combineReducers({
//   color: colorReducer,
//   counter: counterReducer,
// }), {filter: isActionSelfExcluded})
// export const selectCount = (state: RootState) => state.present.counter.value;
// export const selectColor = (state: RootState) => state.present.color.value

// 2.
// The Color State still not ok, the old state is stored and goes back to it (color value is not ignored, stored in history)
const myReducer = {
  color: colorReducer ,
  counter: counterReducer,
  history: historyReducer,
}
export const selectCount = (state: RootState) => state.counter.value;
export const selectColor = (state: RootState) => state.color.value

// const rootReducer = ignoreActions(
//   myReducer,["color/random"]) as typeof myReducer

export const store = configureStore({
  reducer: myReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(historyMiddleware),

});
console.log(increment);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
