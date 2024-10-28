import { Action, AnyAction, createSlice } from "@reduxjs/toolkit";
import { ActionTypes } from "redux-undo";

interface HistoryData extends AnyAction {

}
interface HistoryState {
    past: HistoryData[],
    future: HistoryData[],
}
const initialHistoryState: HistoryState = {
    past: [],
    future: [],
}

const historySlice = createSlice({
    name: "history",
    initialState: initialHistoryState,
    reducers: {
        addHistory: (state, action) => {
            state.past.push(action.payload);
        },
        undo: (state) => {
            const previous = state.past.pop();
            if (previous) {
                state.future.push(previous);
            }
        },
        redo: (state) => {
            const next = state.future.pop();
            if (next) {
                state.past.push(next);
            }
        }

    }
}

)

export const { addHistory , redo, undo} = historySlice.actions;
export default historySlice.reducer;