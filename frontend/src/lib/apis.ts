export const API_URL = 'http://localhost:3000/auth'

type FetchReq = {
    url: string,
    method: 'GET' | 'POST' | 'DELETE' | 'UPDATE',
    body: {} | null,
    token?: string
}

export async function fetchReq({ url, method, body, token = '' }: FetchReq) {
    //  check to see if we want to send token and get the token or return nothing

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
        throw new Error('something went wrong', { cause: data })
    }

    return data
}
