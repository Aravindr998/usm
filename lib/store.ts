import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/lib/features/auth/authSlice"
import { authApi } from "./features/auth/authApi"
import { userApi } from "./features/user/userApi"

const rootReducer = {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer
}

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(userApi.middleware),
    })
}

const store = makeStore()
export default store

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']