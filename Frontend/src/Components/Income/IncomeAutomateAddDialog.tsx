
import { useContext, useState } from "react"
import { useAddAutomatedIncome, useDeleteAutomatedIncome } from "../../Hooks/QueryHooks" 
import { useGetCategoryBasedOnType } from "../../Hooks/QueryHooks"
import { IoMdCloseCircle } from "react-icons/io"
import { useEffect } from "react"
import { useGetAutomatedIncome } from "../../Hooks/QueryHooks"
import { SettingsContext } from "../../Context/SettingsContext"

type IncomeAddDialogProps = {
    addAutomatedIncomeDialog : React.MutableRefObject<HTMLDialogElement | null>
}

export const IncomeAutomateAddDialog  = ({addAutomatedIncomeDialog}: IncomeAddDialogProps) => {
    const {currency} = useContext(SettingsContext)

    const {data: categoryData, isPending: categoryIsPending, isError:  categoryIsError, error: categoryError}= useGetCategoryBasedOnType("income")
    const [addAutomatedIncomeInputs, setAddAutomatedIncomeInputs] = useState(
        {
            description: "",
            category: 0,
            amount: 0,
            date: "",
            scheduleOption: ""
        }
    )
    const {useAddAutomatedIncomeAsync} = useAddAutomatedIncome()
    const {useDeleteAutomatedIncomeAsync} = useDeleteAutomatedIncome()

    const {data: automatedIncomeData = [], isPending: automatedInComeIsPending, isError: automatedIncomeIsError, error: automatedIncomeError} = useGetAutomatedIncome()

    useEffect(() => {
    if (categoryData && categoryData.length > 0 && !addAutomatedIncomeInputs.category) { // im adding this cause it doesnt auto select the category in select when adding
        setAddAutomatedIncomeInputs((prev) => ({ ...prev, category: categoryData[0].id }));
    }
    }, [categoryData]);

    useEffect(()=> {
            setAddAutomatedIncomeInputs((prev)=> ({...prev, scheduleOption: "daily"  }))
    }, [])

    const handleAddAutomatedIncomeInput = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const {name, value} = e.target
        setAddAutomatedIncomeInputs((prev)=> ({...prev, [name]: value}))
    }
    const submitAddAutomatedIncome = async () => {

        if (addAutomatedIncomeInputs.amount && addAutomatedIncomeInputs.category && addAutomatedIncomeInputs.date && addAutomatedIncomeInputs.description ){
            console.log("happens");
            useAddAutomatedIncomeAsync({description: addAutomatedIncomeInputs.description, categoryId: addAutomatedIncomeInputs.category, amount: addAutomatedIncomeInputs.amount, date: addAutomatedIncomeInputs.date, scheduleFrequency: addAutomatedIncomeInputs.scheduleOption})
            addAutomatedIncomeDialog.current?.close();
        }else{
            console.log("fields not complete");
        }
    }

    const deleteAutomatedIncome = async (automatedIncomeId: number) => {
        await useDeleteAutomatedIncomeAsync({automatedIncomeId})
    } 


    return (
        <dialog ref={addAutomatedIncomeDialog} className="absolute m-auto shadow-gray shadow-lg rounded-lg w-1/2">
            <div className="flex w-full">
                <div className="flex-grow">
                    {!automatedIncomeIsError && automatedIncomeData.length > 0 ? 
                    <table className="w-full">
                        <thead>
                            <tr className="text-left font-medium bg-primary-bluegray text-white">
                                <th>Description</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Frequency</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {automatedIncomeData && automatedIncomeData.map((value, index)=> {
                                return (
                                <tr key={index} className="odd:bg-gray-100 text-sm">
                                    <td>{value.description}</td>
                                    <td>{value.category_name}</td>
                                    <td>{currency}{value.amount}</td>
                                    <td>{value.date}</td>
                                    <td>{value.schedule_frequency}</td>
                                    <td><button onClick={()=> deleteAutomatedIncome(value.id)}>X</button></td>

                                </tr>
                                )

                            })}
                        </tbody>
                    </table> : <h1 className="font-bold text-2xl text-center place-content-center w-full h-full">No Automated Income Added</h1>}
                </div>
                <div className="flex flex-col p-5 gap-2 bg-primary-purple3 text-white ">
                    <IoMdCloseCircle className="absolute top-2 right-2 hover:text-primary-bluegray2" onClick={()=>addAutomatedIncomeDialog.current?.close()}/>
                    <label className="font-medium"> Title </label>
                    <input onChange={handleAddAutomatedIncomeInput} name='description' value={addAutomatedIncomeInputs.description} className="text-black rounded-xl p-2 text-xs" type="text" placeholder="Bought Eggs"/>
                    <label className="font-medium"> Category</label>

                    <select onChange={handleAddAutomatedIncomeInput} className="text-black rounded-xl p-2 text-xs" name='category' value={addAutomatedIncomeInputs.category} >
                        {categoryData.map((option: any)=> {
                            return (<option key={option.id} className="text-black" value={option.id}>{option.name}</option>)
                        })}
                    </select>                    

                    <label className="font-medium"> Amount </label>
                    <input onChange={handleAddAutomatedIncomeInput} name='amount' value={addAutomatedIncomeInputs.amount} className="text-black rounded-xl p-2 text-xs" type="number"/>
                    <label className="font-medium"> Date </label>
                    <input onChange={handleAddAutomatedIncomeInput} name='date' value={addAutomatedIncomeInputs.date} className="text-black rounded-xl p-2 text-xs" type="date"/>
                    <select onChange={handleAddAutomatedIncomeInput} name='scheduleOption' className="rounded-lg text-black">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                    <div className="w-full flex justify-end">
                        <button onClick={submitAddAutomatedIncome} className="bg-primary-purple3 p-2 text-xs shadow-primary-bluegray2 shadow-sm rounded-lg hover:bg-primary-bluegray" type="submit">Submit</button>
                    </div>
                </div>
            </div>

         </dialog>
    )
}