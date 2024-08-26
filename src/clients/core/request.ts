import axios from "axios"
import { RequestMethod } from "./common"

export const sendRequest = (type: RequestMethod, apiUrl: string, data?: any, headers?: any) => {
    return axios({
        method: type,
        url: apiUrl,
        data: data,
        headers: {
            ...headers,
            contentType: "application/json",
            dataType: 'json',
            "Access-Control-Allow-Origin": "*",
        },
    })
}

export const apiUrl = "https://6699bdd69ba098ed61fd35aa.mockapi.io/users"