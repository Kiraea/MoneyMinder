
import { FaTrashCan } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";


import {useState} from 'react'
type tableProps = {
    columnValues: string[],
    dataValues: {[key: string]: string}[] // for now 
}
function findEven(num: number){
    return num % 2 === 0;
}

const colorTable: {true: string, false: string} = {
    true: "bg-gray-100",
    false: "bg-white"
}


export default function Table({columnValues, dataValues} : tableProps){

    const [openActions, setOpenActions] = useState<Record<number, boolean>>({})




    const toggleActions = (index: number) => {
        setOpenActions((prev) => ({
          ...prev,
          [index]: !prev[index], // Toggle the specific row's state
        }));
      };

    return (
        <table>
            <tr className="bg-primary-bluegray text-white text-left">
            {columnValues.map((value, index)=> {
                return <th key={index}>{value}</th>

            })}
            <th>Actions</th>
            </tr>

            {dataValues.map((object, index)=> {
                let isEven = findEven(index)
                return (
                <tr key={index}>
                    {Object.keys(object).map((key) => (
                      <td key={key}className={`${colorTable[isEven ? "true" : "false"]}`}>{object[key]}</td>
                        
                    ))
                    }
                    <td className={`${colorTable[isEven ? "true" : "false"]}`} >

    
                        <button onClick={()=>toggleActions(index)} className="">
                            <IoIosArrowDown />
                        </button>
                            
                    <div className={`${openActions[index] ? "block" : "hidden"}`}>
                        <select>
                            <option>Update</option>
                            <option>Delete</option>
                        </select>

                    </div>



                    </td>

                </tr>

            )})}


        </table>
    )
}