import { configureStore } from '@reduxjs/toolkit'
import wallpaperSlice from '@/app/desktop/slice/wallpaperSlice'
import  activeWindowSlice  from '@/app/desktop/slice/currentWindow'

export const store = configureStore({
  reducer: {
    wallpaper: wallpaperSlice,
    activeWindow: activeWindowSlice,
  },
})