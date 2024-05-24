import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sidebarToggle: false
}

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebarToggle: (state, action) => {
        state.sidebarToggle = action.payload
    }
  }
});

export const {setSidebarToggle} = sidebarSlice.actions

export default sidebarSlice.reducer