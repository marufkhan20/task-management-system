import { apiSlice } from "../api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasksByCategory: builder.query({
      query: (id) => `/api/task/by-category/${id}`,
      providesTags: ["getTasks"],
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: `/api/task`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getTasks"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/api/task/${id}`,
        method: "DELETE",
      }),
    }),
    updateTaskStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/task/update-task-status/${id}`,
        method: "PUT",
        body: { status },
      }),
    }),
    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/task/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetTasksByCategoryQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskStatusMutation,
  useUpdateTaskMutation,
} = taskApi;