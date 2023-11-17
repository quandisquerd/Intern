
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import BookApi from '../api/book'
import categoryApi from '../api/category'
import recyclebinApi from '../api/recyclebin'
import userApi from '../api/user'
import promotionApi from '../api/promotion'
import discountApi from '../api/discount'
import cartApi from '../api/cart'
import countryApi from '../api/country'
import checkoutApi from '../api/checkout'
import orderApi from '../api/order'
import vnpayApi from '../api/vnpay'

const rootReducer = combineReducers({
    [BookApi.reducerPath]: BookApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [recyclebinApi.reducerPath]: recyclebinApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [promotionApi.reducerPath]: promotionApi.reducer,
    [discountApi.reducerPath]: discountApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [vnpayApi.reducerPath]: vnpayApi.reducer
})
const middleReducer = [BookApi.middleware, categoryApi.middleware, userApi.middleware, checkoutApi.middleware, recyclebinApi.middleware, promotionApi.middleware, vnpayApi.middleware, countryApi.middleware, discountApi.middleware, cartApi.middleware, orderApi.middleware]
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({}).concat(...middleReducer)
})