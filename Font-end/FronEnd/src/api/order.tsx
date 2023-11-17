
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { pause } from '../util/pause'

const orderApi = createApi({
    reducerPath: 'order',
    tagTypes: ['Order'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...args) => {
            await pause(1000)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        addOrder: builder.mutation({
            query: (data) => ({
                url: `/order/add`,
                method: 'POST',
                body: data
            }),

            invalidatesTags: ['Order'],
        }),
        getOneOrder: builder.query({
            query: ({ id, token }) => ({
                url: `/order/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            providesTags: ['Order'],
        }),
        updateDone: builder.mutation({
            query: (id) => ({
                url: `/order/${id}/done`,
                method: 'PATCH'
            }),
            invalidatesTags: ['Order'],
        }),
        updateCancell: builder.mutation({
            query: (id) => ({
                url: `/order/${id}/cancell`,
                method: 'PATCH'
            }),
            invalidatesTags: ['Order'],
        }),
        updateShip: builder.mutation({
            query: (id) => ({
                url: `/order/${id}/ship`,
                method: 'PATCH'
            }),
            invalidatesTags: ['Order'],
        }),
        getAllOrder: builder.query({
            query: () => ({
                url: `/order`
            }),
            providesTags: ['Order'],
        }),
    })
})
export const { useAddOrderMutation, useGetOneOrderQuery, useUpdateDoneMutation, useUpdateCancellMutation, useGetAllOrderQuery, useUpdateShipMutation } = orderApi
export default orderApi