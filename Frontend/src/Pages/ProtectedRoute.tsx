import { PropsWithChildren, ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";


type ProtectedRouteProps = {
    children: ReactNode
}
 const ProtectedRoute = ({children} : ProtectedRouteProps) => {

    const navigate = useNavigate()

    const {isLoggedIn, isLoading}= useContext(AuthContext)
    console.log(isLoggedIn, "ProtectedRoute")

    useEffect(() => {
        if (!isLoading){
            if (!isLoggedIn){
                console.log("redirecting to /lgoin")
                navigate('/login', {replace:true})
            }
        }


    },  [isLoggedIn, navigate, isLoading])

    return ( 
        <>
            {isLoggedIn && children}
        </>
    )
}
export default ProtectedRoute