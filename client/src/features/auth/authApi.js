import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/api/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (args, { queryFulfilled, dispatch }) => {
        try {
          const result = await queryFulfilled;

          // set data in localstorage
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.token,
              user: result.data.user,
            })
          );

          // dispatch userLoggedIn action
          dispatch(
            userLoggedIn({
              accessToken: result.data.token,
              user: result.data.user,
            })
          );
        } catch (err) {
          // do nothing
          console.log(err);
        }
      },
    }),
    accountVerify: builder.mutation({
      query: (data) => ({
        url: "/api/auth/account-verify",
        method: "POST",
        body: data,
      }),
    }),
    getUserByEmail: builder.query({
      query: (email) => `/api/auth/${email}`,
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/api/auth/reset-password/${token}`,
        method: "PUT",
        body: {
          password,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useAccountVerifyMutation,
  useGetUserByEmailQuery,
  useResetPasswordMutation,
} = authApi;
