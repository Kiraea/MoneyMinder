 



export default function SettingsC(){



    return (
        <div className="bg-primary-bluegray3 w-full m-5 rounded-2xl p-5 flex flex-col text-white font-medium">
           Currency used 
           <div>
            <select className="text-black">
                <option>$</option>
                <option>€</option>
                <option>£</option>
                <option>¥</option>
                <option>₱</option>
                </select>
           </div>

        </div>
    )
}