import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { undo, redo } from './history';
import { incrementAsync, incrementIfOdd } from '../features/counter/counterSlice';

type AcceptedAction = AnyAction ;

const undoRedoMiddleware: Middleware = (store) => (next) => (action) => {
    if (!action) return next(action); // Early return if action is undefined

  if (action.type === undo.type) {
    const state = store.getState();
    const lastAction = state.history.past[state.history.past.length - 1];
    if (lastAction) {
        console.log(lastAction.type, lastAction.oldValue, "mi<");
      store.dispatch({ type: lastAction.type, payload: lastAction.oldValue });
    }
  } else if (action.type === redo.type) {
    const state = store.getState();
    const nextAction = state.history.future[state.history.future.length - 1];
    if (nextAction) {
        
        
      store.dispatch({ type: nextAction.type, payload: nextAction.newValue });
    }
  }
  return next(action);
};

export default undoRedoMiddleware;