
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { pause } from '../util/pause'

const recyclebinApi = createApi({
    reducerPath: 'recyclebin',
    tagTypes: ['Recyclebin'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...args) => {
            await pause(1000)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getAllRecyclebin: builder.query({
            query: (page) => ({
                url: `/recyclebin/pagination?sort=created_at&page=${page}&order=desc&limit=10`,
            }),
            providesTags: ['Recyclebin'],
        }),
        restoreBook: builder.mutation({
            query: (id) => ({
                url: `/recyclebin/${id}`,
            }),
            invalidatesTags: ['Recyclebin'],
        }),
        removeRecyclebin: builder.mutation({
            query: (id) => ({
                url: `/recyclebin/${id}`,
                method:'DELETE'
            }),
            invalidatesTags: ['Recyclebin'],
        })
    })
})
export const { useGetAllRecyclebinQuery, useRestoreBookMutation, useRemoveRecyclebinMutation } = recyclebinApi
export default recyclebinApi