
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { pause } from '../util/pause'

const checkoutApi = createApi({
    reducerPath: 'checkout',
    tagTypes: ['Checkout'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...args) => {
            await pause(1000)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        addBCheckout: builder.mutation({
            query: (data: any) => ({
                url: '/checkout/add',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Checkout']
        }),
        getOneChekout: builder.query({
            query: (id) => ({
                url: `/checkout/${id}`,
            }),
            providesTags: ['Checkout'],
        }),
    })
})
export const { useAddBCheckoutMutation,useGetOneChekoutQuery } = checkoutApi
export default checkoutApi