import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import productSlice from "../features/products/prodSlice"

export const store = configureStore({
    reducer: {
        "auth": authSlice,
        "prod": productSlice,
    }
})