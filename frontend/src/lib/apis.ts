import { accessToken, isAtValid } from "./utils"

export const API_URL = 'http://localhost:3000/auth'

type FetchReq = {
    url: string,
    method: 'GET' | 'POST' | 'DELETE' | 'UPDATE',
    body: {} | null,
    auth?: boolean
}

export async function fetchReq({ url, method, body, auth = false }: FetchReq) {
    //  check to see if we want to send token and get the token or return nothing

    let token = auth ? accessToken.getToken() : ""

    const isTokenValid = isAtValid(token!)

    if(auth && (!token || !isTokenValid)){
        const res = await fetchReq({
            url: '/refresh',
            body: null,
            method: 'POST'
        })

        token = res.accessToken;
        accessToken.setToken(token!)
    }

    const headers = {
        'authorization': `Bearer ${token}`,
        'Accept': 'application / json',
        'Content-Type': 'application/json',
    }

    const res = await fetch(API_URL + url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
        credentials: 'include'
    })
    const data = await res.json()

    if (!res.ok) {
        console.log(data)
        throw new Error('something went wrong', { cause: data })
    }

    return data
}
