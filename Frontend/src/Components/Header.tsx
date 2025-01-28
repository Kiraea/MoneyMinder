
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router";
import {useState} from 'react'
export default function Header(){

    const [isOpen, setIsOpen] = useState(false);
    const [pos, setPos] = useState({x: 0, y:0});


    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        setPos({y: rect.bottom, x: rect.left})
        setIsOpen((prev)=> !prev)
    }

    return (
        <div className="w-full flex items-center justify-between p-5 bg-primary-purple3 text-white font-semibold">
            <span className="font-bold text-2xl">Money<span className="text-primary-bluegray3">Minder</span></span>



            <div className="flex items-center justify-center gap-3">
               Welcome, Jiea <button onClick={handleOpen}>   <FaUserCircle className="text-4xl"/> </button>
            </div>

            { isOpen && <div className="absolute z-20 bg-primary-lightpurple4 text-black" style={{top: pos.y+20, left: pos.x-80}}>
                <Link to="/login"><button className="p-2">Logout</button></Link>
            </div>
            }           
        </div>
    )
}