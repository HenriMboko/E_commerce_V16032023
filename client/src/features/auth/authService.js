import axios from "axios"

const API_URL = "/api/users";
const API_URL_2 = "/api/users/login"

const register = async (formData) => {

    const response = await axios.post(API_URL, formData)

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data


}






const loginUsers = async (formData) => {


    const response = await axios.post(API_URL_2, formData)

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data



}


const getProfilUser = async () => {



    const response = await axios.post(API_URL_2)



}



const authService = {
    register,
    loginUsers
}


export default authService;