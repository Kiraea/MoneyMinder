
import { useState } from "react"
import { useAddSaving} from "../../Hooks/QueryHooks" 
import { useGetCategoryBasedOnType } from "../../Hooks/QueryHooks"
import { IoMdCloseCircle } from "react-icons/io"
import { useEffect } from "react"

type SavingAddDialogProps = {
    addSavingDialog: React.MutableRefObject<HTMLDialogElement | null>
}

export const SavingAddDialog = ({addSavingDialog}: SavingAddDialogProps) => {

    
    const {data: categoryData, isPending: categoryIsPending, isError:  categoryIsError, error: categoryError}= useGetCategoryBasedOnType("savings")
    const [addSavingInputs, setAddSavingInputs] = useState(
        {
            description: "",
            category: 0,
            amount: 0,
            date: ""
        }
    )
    const {useAddSavingAsync} = useAddSaving()    

    useEffect(() => {
    if (categoryData && categoryData.length > 0 && !addSavingInputs.category) { // im adding this cause it doesnt auto select the category in select when adding
        setAddSavingInputs((prev) => ({ ...prev, category: categoryData[0].id }));
    }
    }, [categoryData]);



    const handleAddSavingInput= (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const {name, value} = e.target
        setAddSavingInputs((prev)=> ({...prev, [name]: value}))
    }

    const submitAddSaving= async () => {

        if (addSavingInputs.amount && addSavingInputs.category && addSavingInputs.date && addSavingInputs.description){
            useAddSavingAsync({description: addSavingInputs.description, categoryId: addSavingInputs.category, amount: addSavingInputs.amount, date: addSavingInputs.date })
        }else{
            console.log("fields not complete");
        }
    }

    return (
        <dialog ref={addSavingDialog} className="absolute m-auto shadow-gray shadow-lg rounded-lg">
        <div className="flex flex-col p-5 gap-2 bg-primary-purple3 text-white ">
            <IoMdCloseCircle className="absolute top-2 right-2 hover:text-primary-bluegray2" onClick={()=>addSavingDialog.current?.close()}/>
            <label className="font-medium"> Title </label>
            <input onChange={handleAddSavingInput} name='description' value={addSavingInputs.description} className="text-black rounded-xl p-2 text-xs" type="text" placeholder="Bought Eggs"/>
            <label className="font-medium"> Category</label>

            <select onChange={handleAddSavingInput} className="text-black rounded-xl p-2 text-xs" name='category' value={addSavingInputs.category} >
                {categoryData.map((option: any)=> {
                    return (<option  key={option.id} className="text-black" value={option.id}>{option.name}</option>)
                })}
            </select>                    

            <label className="font-medium"> Amount </label>
            <input onChange={handleAddSavingInput} name='amount' value={addSavingInputs.amount} className="text-black rounded-xl p-2 text-xs" type="number"/>
            <label className="font-medium"> Date </label>
            <input onChange={handleAddSavingInput} name='date' value={addSavingInputs.date} className="text-black rounded-xl p-2 text-xs" type="date"/>
            <div className="w-full flex justify-end">
                <button onClick={submitAddSaving} className="bg-primary-purple3 p-2 text-xs shadow-primary-bluegray2 shadow-sm rounded-lg hover:bg-primary-bluegray" type="submit">Submit</button>
            </div>


        </div>
    </dialog>



    )
}