import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 2,
}

export const wallpaperSlice = createSlice({
  name: 'wallpaper',
  initialState,
  reducers: {
    currentWallpaper: (state, action) => {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { currentWallpaper } = wallpaperSlice.actions

export default wallpaperSlice.reducer