
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { pause } from '../util/pause'

const BookApi = createApi({
    reducerPath: 'book',
    tagTypes: ['Book'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...args) => {
            await pause(1000)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getAllBook: builder.query({
            query: (page) => ({
                url: `/book/pagination?sort=price&page=${page}&order=desc&limit=9`,
            }),
            providesTags: ['Book'],
        }),
        getOutstan: builder.query({
            query: () => ({
                url: `/outstan`,
            }),
            providesTags: ['Book'],
        }),
        getDiscount: builder.query({
            query: () => ({
                url: `/discount`,
            }),
            providesTags: ['Book'],
        }),
        getOneBook: builder.query({
            query: (id) => ({
                url: `/book/${id}`,
            }),
            providesTags: ['Book'],
        }),
        removeBook: builder.mutation({
            query: (id) => ({
                url: `/book/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Book']
        }),
        addBook: builder.mutation({
            query: (data: any) => ({
                url: '/book/add',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Book']
        }),
        searchBook: builder.mutation({
            query: (data: any) => ({
                url: '/book/search',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Book']
        }),
        updateBook: builder.mutation({
            query: (data: any) => ({
                url: `/book/edit/${data.id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Book']
        }),
        relatedBook: builder.mutation({
            query: (data: any) => ({
                url: `/book/related`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Book']
        }),
        postOneBook: builder.mutation({
            query: (data: any) => ({
                url: `/book/cart`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Book']
        })
    })
})
export const { useGetAllBookQuery,usePostOneBookMutation, useRemoveBookMutation, useAddBookMutation, useGetOneBookQuery, useUpdateBookMutation, useGetOutstanQuery, useGetDiscountQuery, useSearchBookMutation, useRelatedBookMutation } = BookApi
export default BookApi