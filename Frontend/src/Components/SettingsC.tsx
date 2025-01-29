 

import useState, { useContext } from 'react'
import { SettingsContext } from '../Context/SettingsContext'
export default function SettingsC(){

    const {currency, setCurrency} = useContext(SettingsContext)    

    const changeCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => { 
        const newValue = e.target.value
        localStorage.setItem('currency', newValue)
        setCurrency(newValue)
    }
// Iterate through all keys and get their values

    return (
        <div className="bg-primary-bluegray3 w-full m-5 rounded-2xl p-5 flex flex-col text-white font-medium">
           Currency used: 
           <div>
            <select className="text-black" value={currency || "$"} onChange={changeCurrency}>
                <option value="$">$</option>
                <option value="€">€</option>
                <option value="£">£</option>
                <option value="¥">¥</option>
                <option value="₱">₱</option>
                </select>
           </div>


        </div>
    )
}