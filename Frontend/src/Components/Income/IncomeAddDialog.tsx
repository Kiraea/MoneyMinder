
import { useState } from "react"
import { useAddIncome} from "../../Hooks/QueryHooks" 
import { useGetCategoryBasedOnType } from "../../Hooks/QueryHooks"
import { IoMdCloseCircle } from "react-icons/io"
import { useEffect } from "react"

type IncomeAddDialogProps = {
    addIncomeDialog: React.MutableRefObject<HTMLDialogElement | null>
}

export const IncomeAddDialog  = ({addIncomeDialog}: IncomeAddDialogProps) => {

    
    const {data: categoryData, isPending: categoryIsPending, isError:  categoryIsError, error: categoryError}= useGetCategoryBasedOnType("income")
    const [addIncomeInputs, setAddIncomeInputs] = useState(
        {
            description: "",
            category: 0,
            amount: 0,
            date: ""
        }
    )
    const {useAddIncomeAsync} = useAddIncome()    

    useEffect(() => {
    if (categoryData && categoryData.length > 0 && !addIncomeInputs.category) { // im adding this cause it doesnt auto select the category in select when adding
        setAddIncomeInputs((prev) => ({ ...prev, category: categoryData[0].id }));
    }
    }, [categoryData]);



    const handleAddIncomeInput = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const {name, value} = e.target
        setAddIncomeInputs((prev)=> ({...prev, [name]: value}))
    }

    const submitAddIncome = async () => {

        if (addIncomeInputs.amount && addIncomeInputs.category && addIncomeInputs.date && addIncomeInputs.description){
            useAddIncomeAsync({description: addIncomeInputs.description, categoryId: addIncomeInputs.category, amount: addIncomeInputs.amount, date: addIncomeInputs.date })
        }else{
            console.log("fields not complete");
        }
    }

    return (
        <dialog ref={addIncomeDialog} className="absolute m-auto shadow-gray shadow-lg rounded-lg">
        <div className="flex flex-col p-5 gap-2 bg-primary-purple3 text-white ">
            <IoMdCloseCircle className="absolute top-2 right-2 hover:text-primary-bluegray2" onClick={()=>addIncomeDialog.current?.close()}/>
            <label className="font-medium"> Title </label>
            <input onChange={handleAddIncomeInput} name='description' value={addIncomeInputs.description} className="text-black rounded-xl p-2 text-xs" type="text" placeholder="Bought Eggs"/>
            <label className="font-medium"> Category</label>

            <select onChange={handleAddIncomeInput} className="text-black rounded-xl p-2 text-xs" name='category' value={addIncomeInputs.category} >
                {categoryData.map((option: any)=> {
                    return (<option className="text-black" value={option.id}>{option.name}</option>)
                })}
            </select>                    

            <label className="font-medium"> Amount </label>
            <input onChange={handleAddIncomeInput} name='amount' value={addIncomeInputs.amount} className="text-black rounded-xl p-2 text-xs" type="number"/>
            <label className="font-medium"> Date </label>
            <input onChange={handleAddIncomeInput} name='date' value={addIncomeInputs.date} className="text-black rounded-xl p-2 text-xs" type="date"/>
            <div className="w-full flex justify-end">
                <button onClick={submitAddIncome} className="bg-primary-purple3 p-2 text-xs shadow-primary-bluegray2 shadow-sm rounded-lg hover:bg-primary-bluegray" type="submit">Submit</button>
            </div>


        </div>
    </dialog>



    )
}