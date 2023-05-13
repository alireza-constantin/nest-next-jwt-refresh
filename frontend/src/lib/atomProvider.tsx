"use client"

import { Provider } from "jotai"

export default function ({
    children
}: {
    children: React.ReactNode
}){
    return <Provider>
        {children}
    </Provider>
}