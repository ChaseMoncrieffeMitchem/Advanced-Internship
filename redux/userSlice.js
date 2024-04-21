import { auth } from '@/firebase';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.email = action.payload.email
    },

    signOutUser: (state) => {
        state.email = null
        state = auth.signOut()
    }
  }
});

export const {setUser, signOutUser} = userSlice.actions

export default userSlice.reducer