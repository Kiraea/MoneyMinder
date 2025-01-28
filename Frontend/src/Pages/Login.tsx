import Header from "../Components/Header"
import { Link } from "react-router"

function Login (){
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-primary-lightpurple4 box-border">
            <Header/>
            <div className="bg-primary-purple w-full flex-grow flex flex-col justify-center items-center">
                <div className="border-[1px] border-black flex rounded-md">
                    <div className="flex bg-primary-bluegray3 px-10 text-white font-bold items-center rounded-bl-md"><span className="text-xl">LOGIN</span> </div>
                    <form className="bg-white flex-grow flex flex-col gap-2 p-5 rounded-e-lg"onSubmit={()=> {}}>
                        <label>Username</label>
                        <input className="border-black border-[1px] rounded-lg p-2" type="text"/>
                        <label>Password</label>
                        <input className="border-black border-[1px] rounded-lg p-2" type="text"/>
                        <span className="text-gray-500 text-xs">Don't have an account yet? <Link to="/register"><button className="rounded-lg text-white bg-primary-purple p-[1px]">Click Here</button></Link> </span>
                    </form>
                </div>


            </div>
        </div>
    )
}


export default Login 