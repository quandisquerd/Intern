
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { pause } from '../util/pause'

const vnpayApi = createApi({
    reducerPath: 'vnpay',
    tagTypes: ['Vnpay'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...args) => {
            await pause(1000)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        vnPay: builder.mutation({
            query: (data: any) => ({
                url: '/vnpay',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Vnpay']
        }),
    })
})
export const { useVnPayMutation } = vnpayApi
export default vnpayApi