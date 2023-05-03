const API_URL = 'http://localhost:3000/auth'

type FetchReq = {
    url: string,
    method: 'GET' | 'POST' | 'DELETE' | 'UPDATE',
    body: { }
}

export async function fetchReq({ url, method, body }: FetchReq) {
    const res = await fetch(API_URL + url, {
        method,
        headers: {
            'Accept': 'application / json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    })
    const data = await res.json()

    if(!res.ok) {
        throw new Error('something went wrong', { cause: data })
    }

    return data
}
