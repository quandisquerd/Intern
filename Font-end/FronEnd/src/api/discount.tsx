
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { pause } from '../util/pause'

const discountApi = createApi({
    reducerPath: 'discount',
    tagTypes: ['Discount'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...args) => {
            await pause(1000)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getAllDiscount: builder.query({
            query: () => ({
                url: `/promotion`,
            }),
            providesTags: ['Discount'],
        })
    })
})
export const { useGetAllDiscountQuery } = discountApi
export default discountApi