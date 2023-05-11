import { createApi } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { useCookie } from "next-cookie";

const cookie = useCookie();
interface LoginProps {
  email: string;
  password: string;
}

interface UserProps {
  id: string | string[] | undefined;
  role?: string;
}

interface RemoveUser {
  id?: string;
}

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: "http://2.56.154.227:7000/graphql",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${cookie.get("user")}`);
      return headers;
    },
    customErrors: ({ response }) => {
      if (response.errors![0].extensions?.response.statusCode == 401) {
        cookie.remove("user");
      }
    },
  }),
  tagTypes: ["USERS", "ROLE"],
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginProps>({
      query: ({ email, password }) => ({
        document: gql`
          mutation Login($authUserInput: AuthUserInput!) {
            login(authUserInput: $authUserInput) {
              email
              id
              isAdmin
              access_token
            }
          }
        `,
        variables: {
          authUserInput: { email, password },
        },
      }),
    }),
    getUsers: builder.query<any, void>({
      query: () => ({
        document: gql`
          query users($option: EntityQueryInput) {
            users(options: $option) {
              results {
                email
                id
              }
              total
            }
          }
        `,
        variables: {
          options: {},
        },
      }),
      providesTags: () => ["USERS"],
    }),
    getUser: builder.query<any, UserProps>({
      query: ({ id }) => ({
        document: gql`
          query user($id: String!) {
            user(id: $id) {
              email
            }
          }
        `,
        variables: {
          id: id,
        },
      }),
    }),
    getUserRole: builder.query<any, UserProps>({
      query: ({ id }) => ({
        document: gql`
          query userRole($id: String!) {
            userRoles(id: $id) {
              roles
              id
            }
          }
        `,
        variables: {
          id: id,
        },
      }),
      providesTags: () => ["ROLE"],
    }),
    addUserRole: builder.mutation<any, UserProps>({
      query: ({ id, role }) => ({
        document: gql`
          mutation addRole($assignRoleInput: EditRoleInput!) {
            assignRole(assignRoleInput: $assignRoleInput) {
              roles
              id
            }
          }
        `,
        variables: {
          assignRoleInput: {
            userId: id,
            role: role,
          },
        },
      }),
      invalidatesTags: ["ROLE"],
    }),
    removeUserRole: builder.mutation<any, UserProps>({
      query: ({ id, role }) => ({
        document: gql`
          mutation removeRole($removeRoleInput: EditRoleInput!) {
            removeRole(removeRoleInput: $removeRoleInput)
          }
        `,
        variables: {
          removeRoleInput: {
            userId: id,
            role: role,
          },
        },
      }),
      invalidatesTags: ["ROLE"],
    }),
    deleteUser: builder.mutation<any, RemoveUser>({
      query: ({ id }) => ({
        document: gql`
          mutation delete($id: String!) {
            removeUser(id: $id)
          }
        `,
        variables: {
          id: id,
        },
      }),
      invalidatesTags: ["USERS"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserQuery,
  useGetUserRoleQuery,
  useAddUserRoleMutation,
  useRemoveUserRoleMutation,
} = api;
