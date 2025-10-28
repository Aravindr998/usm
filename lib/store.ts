import { configureStore } from "@reduxjs/toolkit"
import userSlice from "@/lib/features/users/userSlice"
import { userApi } from "./features/users/userApi"

const rootReducer = {
    user: userSlice,
    [userApi.reducerPath]: userApi.reducer
}

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware)
    })
}

const store = makeStore()
export default store

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']