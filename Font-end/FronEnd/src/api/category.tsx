
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { pause } from '../util/pause'

const categoryApi = createApi({
    reducerPath: 'category',
    tagTypes: ['Category'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...args) => {
            await pause(1000)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => ({
                url: `/category`,
            }),
            providesTags: ['Category'],
        })
    })
})
export const { useGetAllCategoryQuery } = categoryApi
export default categoryApi