
import { FaUserCircle } from "react-icons/fa";
export default function Header(){


    return (
        <div className="w-full flex items-center justify-between p-5 bg-primary-purple3 text-white font-semibold">
            <span className="font-bold text-2xl">Money<span className="text-primary-bluegray3">Minder</span></span>
            <div className="flex items-center justify-center gap-3">
               Welcome, Jiea <FaUserCircle className="text-4xl"/>
            </div>
        </div>
    )
}