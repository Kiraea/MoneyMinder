import Header from "../Components/Header"
import { Link } from "react-router"
import { useNavigate } from "react-router"
import {AxiosError} from 'axios'

import {useState} from 'react'
import { axiosInstance } from "../axios"
function Signup (){

    const navigate = useNavigate()

    const [user, setUser] = useState({
        username: "",
        password: "",
        displayName: ""
    })

    console.log(user.username)
    console.log(user.password)
    console.log(user.displayName)

    const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const {name, value} = e.currentTarget
        setUser((prev)=> ({...prev, [name]: value}))
    }
    console.log(import.meta.env.VITE_BASE_URL_LINK)
    const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try{
            let result = await axiosInstance.post(`${import.meta.env.VITE_BASE_URL_LINK}/api/users/`, {username: user.username, password: user.password, displayName: user.displayName })
            if (result.status === 200) {
                navigate('/login');
            }
        }catch(e: unknown){
            if (e instanceof AxiosError){
                console.log(e);
            }
        }
        
    }


    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-primary-lightpurple4 box-border">
            <Header/>
            <div className="bg-primary-purple w-full flex-grow flex flex-col justify-center items-center">
                <div className="border-[1px] border-black flex rounded-md">
                    <div className="flex bg-primary-bluegray3 px-10 text-white font-bold items-center rounded-bl-md"><span className="text-xl">Register</span> </div>
                    <form className="bg-white flex-grow flex flex-col gap-2 p-5 rounded-e-lg" onSubmit={()=> {}}>
                        <label>Username</label>
                        <input className="border-black border-[1px] rounded-lg p-2" name="username" onChange={handleInputs} type="text"/>
                        <label>Password</label>
                        <input className="border-black border-[1px] rounded-lg p-2" name="password" onChange={handleInputs} type="password"/>
                        <label>Display Name</label>
                        <input className="border-black border-[1px] rounded-lg p-2" name="displayName" onChange={handleInputs} type="text"/>
                        <span className="text-gray-500 text-xs">Already have an account? <Link to="/login"><button className="rounded-lg text-white bg-primary-purple p-[1px]">Click Here</button></Link> </span>
                        <div className="flex justify-end mt-4">
                            <button onClick={submitForm} className="bg-primary-purple2 rounded-lg p-2 text-white">Submit</button>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    )
}


export default Signup 