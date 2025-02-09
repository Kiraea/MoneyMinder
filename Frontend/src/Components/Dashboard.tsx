import StatCompnentListL from "./StatComponentL"
import PieChart from "./PieChart"
import Table from "./Table"
import { IoMdArrowDropdown } from "react-icons/io"
import { SettingsContext } from "../Context/SettingsContext"
import { useContext } from "react"


import { useGetExpenses, useGetIncome, useGetSavings } from "../Hooks/QueryHooks"
import { ExpensePieChart } from "./Expenses/ExpensePieChart"
import { ExpenseLineChart } from "./Expenses/ExpenseLineChart"
import { IncomePieChart } from "./Income/IncomePieChart"
import { IncomeLineChart } from "./Income/IncomeLineChart"
import { SavingLineChart } from "./Savings/SavingLineChart"
import { SavingPieChart } from "./Savings/SavingPieChart"
import { LineChartComplete } from "./CombinationElements/LineChartComplete"
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
    const {data: incomeData = [] , isPending: incomeIsPending , isError:  incomeIsError , error: incomeError} = useGetIncome();
    const {data: savingsData = [] , isPending: savingsIsPending, isError:  savingsIsError, error: savingsError} = useGetSavings();


    let totalExpense: number = 0
    let totalIncome: number = 0
    let totalSavings: number = 0

    if (expensesData && expensesData.length > 0) {
        totalExpense = findTotalAmount(expensesData)
    }
    if (incomeData && incomeData.length > 0) {
        totalIncome = findTotalAmount(incomeData)
    }
    if (savingsData&& savingsData.length > 0) {
        totalSavings = findTotalAmount(savingsData)
    }







    const {currency} = useContext(SettingsContext);

    return (
        <div className="h-full bg-primary-gray w-full flex flex-col  p-5 gap-8">
            
            <div className="grid grid-cols-3 gap-8">
                <StatCompnentListL currency={currency}  amount={totalExpense} color={"green"} description="Current Balance"/>
                <StatCompnentListL currency={currency} amount={totalIncome} color={"red"} description="Expenses"/>
                <StatCompnentListL currency={currency} amount={totalSavings} color={"yellow"} description="Income"/>

                <ExpensePieChart/>
                <IncomePieChart/>
                <SavingPieChart/>



            </div>
            <div>
                <LineChartComplete/>
            </div>

        </div>
    )
}

export default Dashboard 