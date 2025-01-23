
import { FaUserCircle } from "react-icons/fa";
export default function Header(){


    return (
        <div className="flex items-center justify-between p-5 bg-primary-bluegray  text-white">
            <span className="font-bold text-2xl">Money<span className="text-primary-gold">Minder</span></span>
            <div className="flex items-center justify-center gap-3">
               Welcome, Jiea <FaUserCircle className="text-4xl"/>
            </div>
        </div>
    )
}