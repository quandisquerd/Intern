
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { pause } from '../util/pause'

const promotionApi = createApi({
    reducerPath: 'promotion',
    tagTypes: ['Promotion'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...args) => {
            await pause(1000)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getAllPromotion: builder.query({
            query: () => ({
                url: `/promotion`,
            }),
            providesTags: ['Promotion'],
        })
    })
})
export const { useGetAllPromotionQuery } = promotionApi
export default promotionApi