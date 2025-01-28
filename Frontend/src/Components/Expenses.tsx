import ButtonM from "./ButtonM"
import Table from "./Table";
import AddExpense from "../Pages/Expenses/AddExpenses";
import { MouseEventHandler, useEffect, useRef } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { FaExchangeAlt } from "react-icons/fa";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
const columnValues =  ["a", "b", "c"]
const dataValues = [
    {
        title: "HOW TO EARN BABY",
        category: "Housing",
        amount: 2323,
        date: "24/247/41",
        
    },
    {
        title: "HOW TO EARN BABY",
        category: "Housing",
        amount: 2323,
        date: "24/247/41",
        
    },
    {
        title: "HOW TO EARN BABY",
        category: "Housing",
        date: "24/247/41",
        amount: 2323,
        
    },
    {
        title: "HOW TO EARN BABY",
        category: "Housing",
        date: "24/247/41",
        amount: 2323,
        
    },
    {
        title: "HOW TO EARN BABY",
        category: "Housing",
        date: "24/247/41",
        amount: 2323,
        
    },


]


const dummyOptions = ["Food", "Lifestyle", "Education", "Games"]

export default function Expenses(){


    const [dropdownIsVisible, setDropdownIsVisible] = useState(false);
    const [dropdownPosition, setDropDownPosition ] = useState({top:0, left:0})

    const addExpenseDialog = useRef<HTMLDialogElement | null>(null)
    const updateExpenseDialog = useRef<HTMLDialogElement | null>(null)


    const openDialogBox = () => {
        addExpenseDialog.current?.showModal()
    }

    const handleDropdownClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        const dropdownElement = event.currentTarget
        const rect = dropdownElement.getBoundingClientRect();
        setDropDownPosition({top:rect.bottom, left:rect.left})
        setDropdownIsVisible((prev)=> !prev)

    }
    console.log(dropdownPosition)
    
    return (
        <div className="bg-primary-gray w-full flex flex-col p-5 gap-2 ">



            <dialog ref={addExpenseDialog} className="absolute m-auto shadow-gray shadow-lg rounded-lg">
                <div className="flex flex-col p-5 gap-2 bg-primary-purple3 text-white ">
                    <IoMdCloseCircle className="absolute top-2 right-2 hover:text-primary-bluegray2" onClick={()=>addExpenseDialog.current?.close()}/>
                    <label> Title </label>
                    <input className="text-black rounded-xl p-[2px] text-xs" type="text" placeholder="Bought Eggs"/>
                    <label> Category</label>

                    <select className="text-black rounded-xl p-[1px]" >
                        {dummyOptions.map((option)=> {
                            return (<option className="text-black">{option}</option>)
                        })}
                    </select>                    

                    <label> Amount </label>
                    <input className="text-black rounded-xl p-[1px]" type="text"/>
                    <label> Date </label>
                    <input className="text-black rounded-xl p-[1px]" type="date"/>
                    <div className="w-full flex justify-end">
                        <button className="bg-primary-purple3 p-[3px] shadow-primary-bluegray2 shadow-sm rounded-lg hover:bg-primary-bluegray" type="submit">Submit</button>
                    </div>


                </div>
            </dialog>
            
            <div className="flex justify-between gap-20">
                <LineChart/> 
                <PieChart title={"Expenses Distribution This Month"} labelNames={["Transportation", "Food"]} dataValues={[25000, 30000]}></PieChart>
            </div>



            <div className="flex">
                <button className="font-semibold p-2 border-[1px] rounded-full bg-primary-lightpurple border-primary-bluegray2 hover:bg-primary-bluegray2 hover:text-white  text-black" onClick={openDialogBox}>Add Expenses</button>
            </div>
                        
            <div>Transactions</div>
            <table className="">
                <thead>
                    <tr className="text-left font-medium bg-primary-bluegray text-white">
                        <th>Title</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dataValues.map((value, index)=> {
                        return (
                        <tr key={index} className="odd:bg-gray-100 text-sm">
                            <td>{value.title}</td>
                            <td>{value.category}</td>
                            <td>{value.amount}</td>
                            <td>{value.date}</td>
                            <td className="relative">
                                <button onClick={handleDropdownClick}><IoMdArrowDropdown/></button>

                            </td>
                        </tr>
                        )

                    })}
                    <tr>
                    </tr>

                </tbody>
            </table>
            {dropdownIsVisible &&
            <div className="absolute  z-20 flex flex-col bg-primary-bluegray2  gap-1 text-white text-sm rounded-md" style={{top: dropdownPosition.top-15, left:dropdownPosition.left-100}}>
                <button className="px-5 py-0  hover:bg-primary-bluegray  font-medium  hover:text-white ">Update</button>
                <button className="px-5 py-0  hover:bg-primary-bluegray font-medium hover:text-white">Delete</button>
            </div>
            }


                
            


        </div>
    )
}


/*

            <AddExpense addExpenseDialog={addExpenseDialog}/>
            */