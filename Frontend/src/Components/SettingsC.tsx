 

import {useState,  useContext , useRef} from 'react'
import { SettingsContext } from '../Context/SettingsContext'
import { useAddCategoryBasedOnType, useDeleteCategory, useGetCategoryBasedOnType } from '../Hooks/QueryHooks'
import { IoMdCloseCircle } from 'react-icons/io'
import { ICategoryType } from '../Types/categoryT'
import { useQueryClient } from '@tanstack/react-query'
export default function SettingsC(){

    const {currency, setCurrency} = useContext(SettingsContext)    

    const changeCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => { 
        const newValue = e.target.value
        localStorage.setItem('currency', newValue)
        setCurrency(newValue)
    }

    const { data: expensesCategoryData, isPending: expensesCategoryIsPending, isError: expensesCategoryIsError, error: expensesCategoryError } = useGetCategoryBasedOnType("expenses");
    const { data: incomeCategoryData, isPending: incomeCategoryIsPending, isError: incomeCategoryIsError, error: incomeCategoryError } = useGetCategoryBasedOnType("income");
    const { data: savingsCategoryData, isPending: savingsCategoryIsPending, isError: savingsCategoryIsError, error: savingsCategoryError } = useGetCategoryBasedOnType("savings");
    
    const queryClient = useQueryClient()



    const {useAddCategoryAsync} = useAddCategoryBasedOnType()
    const [categoryName, setCategoryName] = useState("")

    const [selectedType, setSelectedType] = useState<ICategoryType>("expenses");


    const addCategoryDialog = useRef<HTMLDialogElement | null>(null)

    const handleAddCategory = async (e: React.MouseEvent<HTMLButtonElement>, categoryType: ICategoryType) => {
        e.preventDefault()
        useAddCategoryAsync({categoryType: categoryType, categoryName: categoryName})
        addCategoryDialog.current?.close();
    }
    const openCategoryDialogBox = (categoryType: ICategoryType) => {
        setSelectedType(categoryType)
        addCategoryDialog.current?.showModal()
    }
    const {useDeleteCategoryAsync} = useDeleteCategory()

    const handleDelete = async (categoryType: ICategoryType, categoryId: number, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        queryClient.invalidateQueries({queryKey: ['expenses']})
        queryClient.invalidateQueries({queryKey: ['income']})
        queryClient.invalidateQueries({queryKey: ['savings']})
        useDeleteCategoryAsync({categoryId: categoryId, categoryType: categoryType})
    }

    console.log(expensesCategoryData, "EXPENSESSETTINGS")

    if (expensesCategoryIsPending || incomeCategoryIsPending || savingsCategoryIsPending){
        return <div>...loading</div>
    }

// Iterate through all keys and get their values

    return (
        <div className="bg-primary-bluegray3 w-full m-5 rounded-2xl p-5 flex flex-col text-white font-medium gap-5">

            <dialog ref={addCategoryDialog} className="absolute m-auto shadow-gray shadow-lg rounded-lg">
                <div className="flex flex-col p-5 gap-2 bg-primary-purple3 text-wh-=ite ">
                    <IoMdCloseCircle className="absolute top-2 right-2 hover:text-primary-bluegray2" onClick={()=>addCategoryDialog.current?.close()}/>
                    <label className="font-medium"> Title </label>
                    <input className="text-black rounded-xl p-2 text-xs" type="text" value={categoryName} onChange={(e)=> {setCategoryName(e.target.value)}} placeholder="Lifestyle"/>
                    <div className="w-full flex justify-end">
                        <button className="bg-primary-purple3 p-2 text-xs shadow-primary-bluegray2 shadow-sm rounded-lg hover:bg-primary-bluegray" onClick={(e)=> {handleAddCategory(e, selectedType )}}>Submit</button>
                    </div>
                </div>
            </dialog>



            <div>
                Currency used: 
                <select className="text-black" value={currency || "$"} onChange={changeCurrency}>
                    <option value="$">$</option>
                    <option value="€">€</option>
                    <option value="£">£</option>
                    <option value="¥">¥</option>
                    <option value="₱">₱</option>
                </select>
            </div>

            <div>Manage Categories</div>

            <div className='flex flex-col bg-primary-bluegray gap-5 '>
                <span className='font-bold text-xl'>Expenses</span>
                    <div>
                        <button className="font-semibold p-2  border-[1px] rounded-full bg-primary-lightpurple border-primary-bluegray2 hover:bg-primary-bluegray2 hover:text-white  text-black" onClick={()=> openCategoryDialogBox("expenses")}>Add Category</button>
                    </div>

                    <div className='flex flex-col'>
                        {!expensesCategoryIsError && expensesCategoryData.map((expenses)=> {
                            if (expenses.name === 'uncategorized'){
                                return (<div className='bg-primary-bluegray2 inline'>{expenses.name}</div>)

                            }else{
                                return (<div className='bg-primary-bluegray2 inline'>{expenses.name} <button onClick={(e)=> {handleDelete(expenses.type, expenses.id, e)}}>-</button></div>)
                            }
                        })}
                    </div>
            </div>
            <div className='flex flex-col bg-primary-bluegray gap-5 '>
                <span className='font-bold text-xl'>Income</span>
                    <div>
                        <button className="font-semibold p-2  border-[1px] rounded-full bg-primary-lightpurple border-primary-bluegray2 hover:bg-primary-bluegray2 hover:text-white  text-black" onClick={()=> openCategoryDialogBox("income")}>Add Category</button>
                    </div>

                    <div className='flex flex-col'>
                        {!incomeCategoryIsError && incomeCategoryData.map((income)=> {
                            return (<div className='bg-primary-bluegray2 inline'>{income.name} <button onClick={(e)=> {handleDelete(income.type, income.id, e)}}>-</button></div>)
                        })}
                    </div>
            </div>
            <div className='flex flex-col bg-primary-bluegray gap-5 '>
                <span className='font-bold text-xl'>Savings</span>
                    <div>
                        <button className="font-semibold p-2  border-[1px] rounded-full bg-primary-lightpurple border-primary-bluegray2 hover:bg-primary-bluegray2 hover:text-white  text-black" onClick={()=> openCategoryDialogBox("savings")}>Add Category</button>
                    </div>

                    <div className='flex flex-col'>
                        {!savingsCategoryIsError && savingsCategoryData.map((savings)=> {
                            return (<div className='bg-primary-bluegray2 inline'>{savings.name} <button onClick={(e)=> {handleDelete(savings.type, savings.id, e)}}>-</button></div>)
                        })}
                    </div>
            </div>

        </div>
    )
}