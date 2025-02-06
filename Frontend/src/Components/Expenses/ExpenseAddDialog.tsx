
import { useState } from "react"
import { useAddExpense } from "../../Hooks/QueryHooks" 
import { useGetCategoryBasedOnType } from "../../Hooks/QueryHooks"
import { IoMdCloseCircle } from "react-icons/io"
import { useEffect } from "react"

type ExpenseAddDialogProps = {
    addExpenseDialog: React.MutableRefObject<HTMLDialogElement | null>
}

export const ExpenseAddDialog  = ({addExpenseDialog}: ExpenseAddDialogProps) => {

    
    const {data: categoryData, isPending: categoryIsPending, isError:  categoryIsError, error: categoryError}= useGetCategoryBasedOnType("expenses")

    const {useAddExpenseAsync} = useAddExpense()    

    useEffect(() => {
    if (categoryData && categoryData.length > 0 && !addExpenseInputs.category) { // im adding this cause it doesnt auto select the category in select when adding
        setAddExpenseInputs((prev) => ({ ...prev, category: categoryData[0].id }));
    }
    }, [categoryData]);

    const [addExpenseInputs, setAddExpenseInputs] = useState(
        {
            description: "",
            category: 0,
            amount: 0,
            date: ""
        }
    )

    const handleAddExpenseInput = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const {name, value} = e.target
        setAddExpenseInputs((prev)=> ({...prev, [name]: value}))
    }

    const submitAddExpense = async () => {

        if (addExpenseInputs.amount && addExpenseInputs.category && addExpenseInputs.date && addExpenseInputs.description){
            useAddExpenseAsync({description: addExpenseInputs.description, categoryId: addExpenseInputs.category, amount: addExpenseInputs.amount, date: addExpenseInputs.date })
        }else{
            console.log("fields not complete");
        }
    }

    return (
        <dialog ref={addExpenseDialog} className="absolute m-auto shadow-gray shadow-lg rounded-lg">
        <div className="flex flex-col p-5 gap-2 bg-primary-purple3 text-white ">
            <IoMdCloseCircle className="absolute top-2 right-2 hover:text-primary-bluegray2" onClick={()=>addExpenseDialog.current?.close()}/>
            <label className="font-medium"> Title </label>
            <input onChange={handleAddExpenseInput} name='description' value={addExpenseInputs.description} className="text-black rounded-xl p-2 text-xs" type="text" placeholder="Bought Eggs"/>
            <label className="font-medium"> Category</label>

            <select onChange={handleAddExpenseInput} className="text-black rounded-xl p-2 text-xs" name='category' value={addExpenseInputs.category} >
                {categoryData.map((option: any)=> {
                    return (<option className="text-black" value={option.id}>{option.name}</option>)
                })}
            </select>                    

            <label className="font-medium"> Amount </label>
            <input onChange={handleAddExpenseInput} name='amount' value={addExpenseInputs.amount} className="text-black rounded-xl p-2 text-xs" type="number"/>
            <label className="font-medium"> Date </label>
            <input onChange={handleAddExpenseInput} name='date' value={addExpenseInputs.date} className="text-black rounded-xl p-2 text-xs" type="date"/>
            <div className="w-full flex justify-end">
                <button onClick={submitAddExpense} className="bg-primary-purple3 p-2 text-xs shadow-primary-bluegray2 shadow-sm rounded-lg hover:bg-primary-bluegray" type="submit">Submit</button>
            </div>


        </div>
    </dialog>



    )
}