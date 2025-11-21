import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/lib/features/users/authSlice"
import { authApi } from "./features/users/authApi"

const rootReducer = {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer
}

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
    })
}

const store = makeStore()
export default store

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']