import axios from "axios";
import { get } from "@/functions/storage";
import { showError,dismiss } from "@/functions/widget";

// const token = window.token
const baseURL = 'https://lookout-ng.herokuapp.com/api/'
const token = get('token');

export const http = axios.create({
            baseURL: baseURL,
            timeoutErrorMessage: 'Unknown error ocurred',
            headers:{
                "Access-Control-Allow-Origin": "*",
                "Accept": 'application/json',
                "Authorization": "Bearer " + token,
            }

        })

    http.interceptors.response.use((response) => 
        {
            console.log("Response recieved ", response)
            return response
        },
        error => {
            console.log(error)
            showError(error)
            dismiss()
        }
    );


    // on successful request
    http.interceptors.request.use((request) => 
        {
            console.log("Request Successfull", request)
            return request
        }, 
        error => {
            showError(error)
            dismiss()
        }
    );
