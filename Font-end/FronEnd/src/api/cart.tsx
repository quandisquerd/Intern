
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { pause } from '../util/pause'

const cartApi = createApi({
    reducerPath: 'cart',
    tagTypes: ['Cart'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...args) => {
            await pause(1000)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        addToCart: builder.mutation({
            query: ({ data, token }) => ({
                url: `/addtocart`,
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: ['Cart'],
        }),
        getAllCart: builder.query({
            query: (token) => ({
                url: `/getcart`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            providesTags: ['Cart'],
        }),
        removeCart: builder.mutation({
            query: (id) => ({
                url: `/cart/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Cart'],
        })
    })
})
export const { useAddToCartMutation, useGetAllCartQuery , useRemoveCartMutation} = cartApi
export default cartApi