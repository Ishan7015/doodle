import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: "cmd",
}

export const activeWindowSlice = createSlice({
  name: 'activeWindow',
  initialState,
  reducers: {
    activeWindow: (state, action) => {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { activeWindow } = activeWindowSlice.actions

export default activeWindowSlice.reducer