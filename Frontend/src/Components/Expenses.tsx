import Table from "./Table";
import { MouseEventHandler, useContext, useEffect, useRef } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { FaExchangeAlt } from "react-icons/fa";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { SettingsContext } from "../Context/SettingsContext";
import { useAddCategoryBasedOnType, useAddExpense, useDeleteExpense, useGetCategoryBasedOnType, useGetExpenses } from "../Hooks/QueryHooks";
import { useMutation } from "@tanstack/react-query";
import { ICategoryType } from "../Types/categoryT";
import { IYear } from "../Types/categoryT";
import { convertToPerYear } from "../Hooks/monthMoneyPerYear";
import { convertToCategoryXAmount } from "../Hooks/categoryXAmount";
import { axiosInstance } from "../axios";
import { sortByOptions } from "../Hooks/Sort";
import { formatDate, reverseFormatDate } from "../Hooks/LongDateToISO";
import { usePatchExpense } from "../Hooks/QueryHooks";
import { ExpensePieChart } from "./Expenses/ExpensePieChart";
import { ExpenseLineChart } from "./Expenses/ExpenseLineChart";
import { ExpenseAddDialog } from "./Expenses/ExpenseAddDialog";
const yearList = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050];
const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fullMonthList = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

export default function Expenses(){




    const {usePatchExpenseAsync} = usePatchExpense()
    const {useDeleteExpenseAsync} = useDeleteExpense() 
    const {data: categoryData, isPending: categoryIsPending, isError:  categoryIsError, error: categoryError}= useGetCategoryBasedOnType("expenses")
    const {data: expenseData = [] , isPending: expenseIsPending, isError:  expenseIsError, error: expenseError} = useGetExpenses();
    const {currency} = useContext(SettingsContext);
    const [dropdownIsVisible, setDropdownIsVisible] = useState(false);
    const [dropdownPosition, setDropDownPosition ] = useState({top:0, left:0})
    const addExpenseDialog = useRef<HTMLDialogElement | null>(null)
    const updateExpenseDialog = useRef<HTMLDialogElement | null>(null)
    const [selectedExpenseId, setSelectedExpenseId] = useState(-1) // for delete



    const [selectedExpense, setSelectedExpense] = useState<Record<string, any>>(
         {
            description: "",
            category_id: 0,
            amount: 0,
            date: ""
        }           
    )

    const [modifiedExpense, setModifiedExpense] = useState<Record<string, any>>({ // for comparing to the selected expense cause i will use "PATCH"
            description: "",
            category_id: 0,
            amount: 0,
            date: ""
    })
    
    const [sort, setSort] = useState("date")
    const [orderBy, setOrderBy] = useState("ascending")




    
    let sortedData: any = []
    if (expenseData && !expenseIsPending){
        sortedData = sortByOptions(expenseData, sort, orderBy);
    }







    const openDialogBox = () => {
        addExpenseDialog.current?.showModal()
    }


    const openUpdateDialogBox= () => {
        setDropdownIsVisible(false);
        updateExpenseDialog.current?.showModal()
    }


    const handleDropdownClick = (event: React.MouseEvent<HTMLButtonElement>, chosenExpenseId: number, description: string, category_id:number, amount:number, date: string ) => {
        event.stopPropagation()
        const dropdownElement = event.currentTarget
        const rect = dropdownElement.getBoundingClientRect();
        setDropDownPosition({top:rect.bottom, left:rect.left})
        setDropdownIsVisible((prev)=> !prev)
        setSelectedExpense({description: description, category_id: category_id,amount: amount, date:date})
        setModifiedExpense({description: description, category_id: category_id,amount: amount, date:date})
        setSelectedExpenseId(chosenExpenseId);
    }



    const handleUpdateExpenseInput = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const {name, value} = e.target
        setModifiedExpense((prev)=> ({...prev, [name]: value}))
    }

    const submitUpdateExpense = async (e: React.MouseEvent<HTMLButtonElement>) => {
        let modified: {[key: string]: any} = {};
        for (const [key, value] of Object.entries(selectedExpense)) {
            let selectedExpenseSolo = selectedExpense[key]
            let modifiedExpenseSolo = modifiedExpense[key] 
            // We doing checks cause objects referrence by value and u have to do this, and some econversion is also needed eg dates
            if (key === 'category_id' || key === 'amount'){
                modifiedExpenseSolo = Number(modifiedExpenseSolo)
                selectedExpenseSolo= Number(selectedExpenseSolo)
            }

            if (key === 'date'){
                modifiedExpenseSolo = formatDate(modifiedExpenseSolo);
                selectedExpenseSolo = formatDate(selectedExpenseSolo);    

            }
            if (selectedExpenseSolo !== modifiedExpenseSolo){
                modified[key] = modifiedExpense[key]
            }
        }
        if (Object.keys(modified).length === 0){
            updateExpenseDialog.current?.close()
        }else{
            usePatchExpenseAsync({expenseObj: modified, expenseId: selectedExpenseId})
            updateExpenseDialog.current?.close()
        }

    } 

    const handleDeleteExpense = async () => {
        console.log("handle it ");
        setDropdownIsVisible(false);
        useDeleteExpenseAsync({expenseId: selectedExpenseId})
    }
    console.log(categoryData);

    if (categoryIsError){
        return <div>{categoryError.message}</div>
    }
    if (categoryIsPending){
        return <div>...loading</div>
    }

    if (expenseIsPending){
        return <div>...loading</div>
    }

    return (
        <div className="bg-primary-gray w-full flex flex-col p-5 gap-2 ">


            

            <ExpenseAddDialog addExpenseDialog={addExpenseDialog} />


            <dialog ref={updateExpenseDialog} className="absolute m-auto shadow-gray shadow-lg rounded-lg">
                <div className="flex flex-col p-5 gap-2 bg-primary-purple3 text-white ">
                    <IoMdCloseCircle className="absolute top-2 right-2 hover:text-primary-bluegray2" onClick={()=>updateExpenseDialog.current?.close()}/>
                    <label className="font-medium"> Description </label>
                    <input onChange={handleUpdateExpenseInput} name='description' value={modifiedExpense.description} className="text-black rounded-xl p-2 text-xs" type="text" placeholder="Bought Eggs"/>
                    <label className="font-medium"> Category</label>
                    <select onChange={handleUpdateExpenseInput} className="text-black rounded-xl p-2 text-xs" name='category_id' value={modifiedExpense.category_id} >
                        {categoryData.map((option: any)=> {
                            return (<option className="text-black" value={option.id}>{option.name}</option>)
                        })}
                    </select>                    
                    <label className="font-medium"> Amount </label>
                    <input onChange={handleUpdateExpenseInput} name='amount' value={modifiedExpense.amount} className="text-black rounded-xl p-2 text-xs" type="number"/>
                    <label className="font-medium"> Date </label>
                    <input onChange={handleUpdateExpenseInput} name='date' value={formatDate(modifiedExpense.date)} className="text-black rounded-xl p-2 text-xs" type="date"/>
                    <div className="w-full flex justify-end">
                        <button onClick={submitUpdateExpense} className="bg-primary-purple3 p-2 text-xs shadow-primary-bluegray2 shadow-sm rounded-lg hover:bg-primary-bluegray" type="submit">Submit</button>
                    </div>
                </div>
            </dialog>

            
            <div className="flex justify-between gap-5">
                <ExpenseLineChart/>
                <ExpensePieChart/>
            </div>



            <div className="flex justify-between">
                <button className="font-semibold p-2 border-[1px] rounded-full bg-primary-lightpurple border-primary-bluegray2 hover:bg-primary-bluegray2 hover:text-white  text-black" onClick={openDialogBox}>Add Expenses</button>
                <div className="flex gap-5">
                    <select className="bg-primary-bluegray rounded-lg text-white text-xl"  onChange={(e)=> setSort(e.target.value)} value={sort}>
                        <option value='amount'>Amount</option>
                        <option value='date'>Date</option>
                        <option value='category'>category</option>
                    </select>
                    <select className="bg-primary-bluegray rounded-lg text-white text-xl" onChange={(e)=> setOrderBy(e.target.value)} value={orderBy}>
                        <option value='ascending'>ascending</option>
                        <option value='descending'>descending</option>
                    </select>
                </div>

            </div>
                        
            <table className="">
                <thead>
                    <tr className="text-left font-medium bg-primary-bluegray text-white">
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((value, index)=> {
                        return (
                        <tr key={index} className="odd:bg-gray-100 text-sm">
                            <td>{value.description}</td>
                            <td>{value.category_name}</td>
                            <td>{currency}{value.amount}</td>
                            <td>{value.date}</td>
                            <td className="relative">
                                <button onClick={(e)=>handleDropdownClick(e, value.id, value.description, Number(value.category_id), value.amount, value.date)}><IoMdArrowDropdown/></button>

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
                <button className="px-5 py-0  hover:bg-primary-bluegray  font-medium  hover:text-white " onClick={openUpdateDialogBox}>Update</button>
                <button className="px-5 py-0  hover:bg-primary-bluegray font-medium hover:text-white" onClick={handleDeleteExpense}>Delete</button>
            </div>
            }


                
            


        </div>
    )
}


