import { ReactNode } from "react"
import { createContext, useState, useEffect } from "react"
import { axiosInstance } from "../axios"
import { AxiosError,} from "axios"




type AuthContextType = {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    isLoading: true,
    setIsLoading: () => {}
})

type AuthContextProviderType = {
    children: ReactNode
}
export const AuthContextProvider = ({children}: AuthContextProviderType) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading ] = useState(true)
    console.log(isLoggedIn, "AuthContextProvider");



    useEffect(()=> {
        console.log("USEeFFECT AUTH CONTEXT PROVIDER")
        checkSessionToken()
    },[])

    const checkSessionToken = async () =>  {

        try{
            let result = await axiosInstance.post(`${import.meta.env.VITE_BASE_URL_LINK}/api/auth/checkSessionToken`)
            if (result.status === 200){
                setIsLoggedIn(true)
            }
    
        }catch(e: unknown){
            if (e instanceof AxiosError){
                console.log(e)
                setIsLoading(false);
            }
        }


    }

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, isLoading, setIsLoading}}>
            {children}
        </AuthContext.Provider>
    )

}