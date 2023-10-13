'use client'

import {SessionProvider} from 'next-auth/react'

type props = {
    children:React.ReactNode
}

export default function AuthProvider({children}:props){
    return (<SessionProvider>{children}</SessionProvider>)
}