import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: null,
    author: null,
    title: null,
    subTitle: null,
    imageLink: null,
    audioLink: null,
    totalRating: null,
    averageRating: null,
    keyIdeas: null,
    type: null,
    status: null,
    subscriptionRequired: null,
    summary: null,
    tags: null,
    bookDescription: null,
    authorDescription: null
}

const bookSlice = createSlice({
  name: second,
  initialState,
  reducers: {}
});

export const {} = bookSlice.actions

export default bookSlice.reducer