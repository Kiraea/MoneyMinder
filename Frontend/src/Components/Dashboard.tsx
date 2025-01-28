import StatCompnentListL from "./StatComponentL"
import PieChart from "./PieChart"
import Table from "./Table"
import { IoMdArrowDropdown } from "react-icons/io"




const columnValues =  ["a", "b", "c"]
const dataValues = [
    {
        title: "HOW TO EARN BABY",
        category: "Housing",
        amount: 2323,
        date: "24/247/41",
        type: "Income"
        
    },
    {
        title: "HOW TO EARN BABY",
        category: "Housing",
        amount: 2323,
        date: "24/247/41",
        type: "Expenses"
        
    },
    {
        title: "HOW TO EARN BABY",
        category: "Housing",
        date: "24/247/41",
        amount: 2323,
        type: "Income"

        
    },
    {
        title: "HOW TO EARN BABY",
        category: "Housing",
        date: "24/247/41",
        amount: 2323,
        type: "Expenses"
        
    },
    {
        title: "HOW TO EARN BABY",
        category: "Housing",
        date: "24/247/41",
        type: "Expenses"
        
    },


]
function Dashboard(){

    return (
        <div className="h-full bg-primary-gray w-full flex flex-col  p-5 gap-8">
            
            <div className="grid grid-cols-3 gap-8">
                <StatCompnentListL amount={15232} color={"green"} description="Current Balance"/>
                <StatCompnentListL amount={15232} color={"red"} description="Expenses"/>
                <StatCompnentListL amount={15232} color={"yellow"} description="Income"/>

                <PieChart title={"Expenses Distribution"} labelNames={["Transportation", "Food"]} dataValues={[25000, 30000]}></PieChart>
                <PieChart title={"Income Distribution"} labelNames={["Transportation", "Food"]} dataValues={[25000, 30000]}></PieChart>
            </div>
            <table className=" rounded-md">
                <thead>
                    <tr className="text-left font-medium bg-primary-bluegray text-white p-5">
                        <th className="px-5">Title</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>

                    </tr>
                </thead>
                <tbody>
                    {dataValues.map((value, index)=> {
                        return (
                        <tr key={index} className={` text-sm odd:bg-primary-lightpurple4 `}>
                            <td className="">{value.title}</td>
                            <td  className=" ">{value.category}</td>
                            <td className="">{value.amount}</td>
                            <td className="">{value.date}</td>
                            

                        </tr>
                        )

                    })}
                    <tr>
                    </tr>

                </tbody>
            </table>

        </div>
    )
}

export default Dashboard 