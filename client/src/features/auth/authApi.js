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
    changePassword: builder.mutation({
      query: ({ data, userId }) => ({
        url: `/api/auth/change-password/${userId}`,
        method: "PATCH",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/api/auth/forgot-password",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const res = await queryFulfilled;
        const { data } = res || {};
        const { token } = data || {};

        // set local storage
        localStorage.setItem("verifyToken", token);
      },
    }),
    accountVerify: builder.mutation({
      query: (data) => ({
        url: "/api/auth/account-verify",
        method: "POST",
        body: data,
      }),
    }),
    createNewPassword: builder.mutation({
      query: (data) => ({
        url: "/api/auth/forgot-password/create-new-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useAccountVerifyMutation,
  useCreateNewPasswordMutation,
} = authApi;
