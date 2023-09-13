import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategoriesByUser: builder.query({
      query: () => "/api/category/by-user",
      providesTags: ["getCategories"],
    }),
    getCategory: builder.query({
      query: (id) => `/api/category/${id}`,
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/api/category/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getCategories"],
    }),
  }),
});

export const {
  useGetCategoriesByUserQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
} = authApi;
