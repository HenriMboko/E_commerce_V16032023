import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import productService from "./poductService"


//const product = JSON.parse(localStorage.getItem("product"))

const initialState = {
    products: [],
    product: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''

}


export const getProduct = createAsyncThunk("product/getProduct",
    async (_, thunkAPI) => {

        try {

            await productService.getProduct()

        } catch (err) {

            const message = (err.response && err.response.data &&
                err.response.data.message) || err.message || err.ToSTring()

            return thunkAPI.rejectWithValue(message)

        }

    })


export const getProductsByID = createAsyncThunk("product/getProductByid",
    async (id, thunkAPI) => {
        try {
            await productService.getProductByID(id)
        } catch (err) {

            const message = (err.response && err.response.data &&
                err.response.data.message) || err.message || err.ToSTring()

            return thunkAPI.rejectWithValue(message)

        }
    })


const productSlice = createSlice({
    name: "prod",
    initialState,
    reducers: {

        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ""
        }

    },
    extraReducers: (builder) => {

        builder.addCase(getProduct.pending, (state) => {
            state.isLoading = true
        })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.isLoading = true
                state.isSuccess = true
                state.products = action.payload
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
                state.products = null
            })
            .addCase(getProductsByID.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductsByID.fulfilled, (state, action) => {
                state.isLoading = true
                state.isSuccess = true
                state.products = action.payload
            })
            .addCase(getProductsByID.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
                state.products = null
            })



    }
})



export const { reset } = productSlice.actions

export default productSlice.reducer






