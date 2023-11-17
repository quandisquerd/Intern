
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { pause } from '../util/pause'
const baseUrl = 'https://vapi.vnappmob.com/api/province/';
const countryApi = createApi({
    reducerPath: 'province',
    tagTypes: ['Province'],
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        fetchFn: async (...args) => {
            await pause(1000)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getAllProvince: builder.query({
            query: () => ({
                url: baseUrl,
            }),
            providesTags: ['Province'],
        }),
        getAllDistrict: builder.query({
            query: (id) => ({
                url: `${baseUrl}district/${id}`
            }),
            providesTags: ['Province'],
        }),
        getAllWard: builder.query({
            query: (id) => ({
                url: `${baseUrl}ward/${id}`
            }),
            providesTags: ['Province'],
        })
        // getDistrictsByProvinceId(provinceId: number): Observable<any[]> {
        //     const url = `${this.apiUrl}district/${provinceId}`;
        //     return this.http.get<any[]>(url);
        // }
    })
})
export const { useGetAllProvinceQuery, useGetAllDistrictQuery, useGetAllWardQuery } = countryApi
export default countryApi