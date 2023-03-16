import axios from "axios"

const API_URL = "/api/products"


const getProduct = async () => {

    const response = await axios.get(API_URL)


    return response.data

}



const getProductByID = async (id) => {


    const response = await axios.get(`API_URL/${id}`)

    return response.data

}



const productService = {
    getProduct,
    getProductByID
}


export default productService;