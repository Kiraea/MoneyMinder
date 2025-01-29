import { Link } from "react-router";


import { MdDashboard } from "react-icons/md";
import { FaPiggyBank } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";
function Sidebar(){


    return (
        <div className=" w-1/5 flex flex-col items-start bg-primary-bluegray3 text-white text-md ">
            <Link to="/home" className="hover:bg-primary-bluegray w-full p-3"><button className='flex gap-2 '><MdDashboard/> Dashboard</button></Link>
            <Link to="/home/savings" className="hover:bg-primary-bluegray w-full p-3"> <button className='flex gap-2 '><FaPiggyBank/>Savings</button></Link>
            <Link to="/home/expenses" className="hover:bg-primary-bluegray w-full p-3"><button className='flex gap-2 '><FaMoneyBill1Wave/>Expenses</button></Link>
            <Link to="/home/incomes" className="hover:bg-primary-bluegray w-full p-3"><button className='flex gap-2 '><GiPayMoney/>Income</button></Link>
            <Link to="/home/settings" className="hover:bg-primary-bluegray w-full p-3"><button className='flex gap-2 ' ><IoIosSettings/>Settings</button></Link>
        </div>
    )
}

export default Sidebar