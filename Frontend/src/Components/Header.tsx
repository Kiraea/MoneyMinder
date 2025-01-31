
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router";
import {useState, useContext} from 'react'

import { useGetUserPublicDetails } from "../Hooks/QueryHooks";
import { AuthContext } from "../Context/AuthContext";
import { axiosInstance } from "../axios";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
export default function Header(){

    const [isOpen, setIsOpen] = useState(false);
    const [pos, setPos] = useState({x: 0, y:0});
    const queryClient = useQueryClient()

    const navigate = useNavigate();
    const {data, isPending, error, isError} = useGetUserPublicDetails()
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
    console.log(data?.displayName);

    console.log(data?.displayName, "dksaodkaso")

    if (isPending){
        return <div>...loading</div>
    }
    if (isError){
        return <div>{error.message}</div>
    }
    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        setPos({y: rect.bottom, x: rect.left})
        setIsOpen((prev)=> !prev)
    }
    
    const logout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try{
            let result = await axiosInstance.post(`${import.meta.env.VITE_BASE_URL_LINK}/api/auth/logout`)
            if (result.status === 200){
                setIsLoggedIn(false);
                navigate('/login');
                queryClient.clear() //
            }
        }catch(e: unknown){
            if (e instanceof AxiosError){
                console.log("cannot Login");
            }
        }

    }

    return (
        <div className="w-full flex items-center justify-between p-5 bg-primary-purple3 text-white font-semibold">
            <span className="font-bold text-2xl">Money<span className="text-primary-bluegray3">Minder</span></span>


            {isLoggedIn &&
                <div className="flex items-center justify-center gap-3">
                Welcome, {data?.displayName} <button onClick={handleOpen}>   <FaUserCircle className="text-4xl"/> </button>
                </div>            
            }


            { isOpen && <div className="absolute z-20 bg-primary-lightpurple4 text-black" style={{top: pos.y+20, left: pos.x-80}}>
                <button className="p-2" onClick={logout}>Logout</button>
            </div>
            }           
        </div>
    )
}