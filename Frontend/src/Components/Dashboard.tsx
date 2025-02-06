import StatCompnentListL from "./StatComponentL"
import PieChart from "./PieChart"
import Table from "./Table"
import { IoMdArrowDropdown } from "react-icons/io"
import { SettingsContext } from "../Context/SettingsContext"
import { useContext } from "react"


import { useGetExpenses } from "../Hooks/QueryHooks"

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

const findTotalAmount= (arrObj) => {
    let totalExpenses: number = 0
    if (arrObj && arrObj.length > 0){
        arrObj.map((expense) => {
            totalExpenses += expense.amount
        })


        console.log("totalExpenses:", totalExpenses);
    }
    return totalExpenses
}



function Dashboard(){



    const {data: expensesData = [], isPending: expensesIsPending, error: expensesError, isError: expenseIsError} = useGetExpenses()

    let totalExpense: number = 0
    let totalIncome: number = 0
    let totalSavings: number = 0

    if (expensesData && expensesData.length > 0) {
        totalExpense = findTotalAmount(expensesData)
    }







    const {currency} = useContext(SettingsContext);

    return (
        <div className="h-full bg-primary-gray w-full flex flex-col  p-5 gap-8">
            
            <div className="grid grid-cols-3 gap-8">
                <StatCompnentListL currency={currency}  amount={15232} color={"green"} description="Current Balance"/>
                <StatCompnentListL currency={currency} amount={15232} color={"red"} description="Expenses"/>
                <StatCompnentListL currency={currency} amount={15232} color={"yellow"} description="Income"/>

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
                            <td className="">{currency}{value.amount}</td>
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