import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  value: string;
}

const initialState: CounterState = {
  value: "#764ABC"
};


export const colorSlice = createSlice({
  name: 'color',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    random: (state) => {

    const randomColor =  Math.floor(Math.random()*16777215).toString(16);
    state.value = "#" + randomColor;

    }
  }
});

export const { random} = colorSlice.actions;

export default colorSlice.reducer;
