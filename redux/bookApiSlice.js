import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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


