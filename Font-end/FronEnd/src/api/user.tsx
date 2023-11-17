
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { pause } from '../util/pause'

const userApi = createApi({
    reducerPath: 'user',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...args) => {
            await pause(1000)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        Signup: builder.mutation({
            query: (data) => ({
                url: `/user/signup`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User'],
        }),
        Signin: builder.mutation({
            query: (data) => ({
                url: `/user/signin`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User'],
        }),
        getOneUser: builder.query({
            query: (id) => ({
                url: `/user/${id}/getone`

            }),
            providesTags: ['User'],
        }),
    })
})
export const { useSignupMutation, useSigninMutation, useGetOneUserQuery } = userApi
export default userApi