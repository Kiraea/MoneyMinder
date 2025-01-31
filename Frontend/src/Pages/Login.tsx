import Header from "../Components/Header"
import { Link } from "react-router"
import {useContext, useState} from 'react'
import {  AxiosError } from "axios"
import { axiosInstance } from "../axios"
import { useNavigate } from "react-router"
import { AuthContext } from "../Context/AuthContext"
import GoogleButton from 'react-google-button'
import { FaGithub } from "react-icons/fa";
function Login (){
    const {setIsLoggedIn} = useContext(AuthContext)

    const navigate = useNavigate()

    const [user, setUser] = useState({
        username: "",
        password: "",
    })

    console.log(user.username)
    console.log(user.password)

    const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const {name, value} = e.currentTarget
        setUser((prev)=> ({...prev, [name]: value}))
    }
    console.log(`${import.meta.env.VITE_BASE_URL_LINK}/api/auth/login`);
    const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try{
            let result = await axiosInstance.post(`http://localhost:3001/api/auth/login`, {username: user.username, password: user.password})
            console.log(result.status);
            if (result.status === 200){
                setIsLoggedIn(true);
                console.log(result.data.message, result.data.status, result.data.data)
                navigate('/home');
            }
        }catch(e: unknown){
            if (e instanceof AxiosError){
                console.log(e.response?.data);
            }
        }
        
    }


    const GoogleLoginButton = () => {
        return (
          // Direct link to backend's Google auth route
          <a href="http://localhost:3001/api/auth/google">
            <GoogleButton type="light"/>
          </a>
        );
      };

    const GithubLoginButton = () => {
        return (
            <a href="http://localhost:3001/api/auth/github">
                <div className="h-[50px] w-[240px] flex p-5 gap-4 justify-start items-center shadow-gray-400 shadow-md">
                    <FaGithub className="h-10 w-10 text-primary-bluegray3" /> <span className="text-gray-500">Sign in with Github</span>
                </div>
            </a>
        )
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-primary-lightpurple4 box-border">
            <div className="bg-primary-purple w-full flex-grow flex flex-col justify-center items-center">
                
                <div className="border-[1px] border-black flex rounded-md">
                    <div className="flex bg-primary-bluegray3 px-20 text-white font-bold items-center rounded-bl-md"><span className="text-xl">LOGIN</span> </div>
                    <form className="bg-white flex-grow flex flex-col gap-2 p-10 rounded-e-lg">
                        <label>Username</label>
                        <input className="border-black border-[1px] rounded-lg p-2" name="username" value={user.username} onChange={handleInputs} type="text"/>
                        <label>Password</label>
                        <input className="border-black border-[1px] rounded-lg p-2" name="password" value={user.password} onChange={handleInputs} type="password"/>
                        <span className="text-gray-500 text-xs">Don't have an account yet? <Link to="/register"><button className="rounded-lg text-white bg-primary-purple p-[1px]">Click Here</button></Link> </span>
                                             <div className="flex flex-col justify-end mt-4 gap-5">
                            <GoogleLoginButton/>
                            <GithubLoginButton/> 
                        </div>   
                        <div className="flex justify-end mt-4 gap-5">


                            <button onClick={submitForm} className="bg-primary-purple2 rounded-lg p-2 text-white">Submit</button>
                        </div>

                    </form>
                </div>



            </div>
        </div>
    )
}


export default Login 