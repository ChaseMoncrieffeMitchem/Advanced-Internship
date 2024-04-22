import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     id: null,
//     author: null,
//     title: null,
//     subTite: null,
//     imageLink: null,
//     audioLink: null,
//     totalRating: null,
//     averageRating: null,
//     keyIdeas: null,
//     type: null,
//     status: null,
//     subscriptionRequired: null,
//     summary: null,
//     tags: null,
//     bookDescription: null,
//     authorDescription: null
// }

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://us-central1-summaristt.cloudfunctions.net",
  }),
  endpoints: (builder) => ({
    getSelectedBooks: builder.query({
      query: () => "/getBooks?status=selected",
    }),
    getRecommendedBooks: builder.query({
      query: () => "/getBooks?status=recommended",
    }),
    getSuggestedBooks: builder.query({
      query: () => "/getBooks?status=suggested",
    }),
  }),
});

export const {
  useGetSelectedBooksQuery,
  useGetRecommendedBooksQuery,
  useGetSuggestedBooksQuery,
} = booksApi;

// export const {} = bookSlice.actions

// export default bookSlice.reducer
