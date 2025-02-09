import { useState } from "react";
import { convertToCategoryXAmount } from "../../Hooks/categoryXAmount";
import { useGetIncome} from "../../Hooks/QueryHooks";
import { useGetCategoryBasedOnType } from "../../Hooks/QueryHooks";
import PieChart from "../PieChart";

const yearList = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050];
const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fullMonthList = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];





export const IncomePieChart= () => {



    const {data: categoryData, isPending: categoryIsPending, isError:  categoryIsError, error: categoryError}= useGetCategoryBasedOnType("income")
    const {data: incomeData = [] , isPending: incomeIsPending, isError:  incomeIsError, error: incomeError} = useGetIncome();
    
    
    const [pieSelectMonth  , setPieSelectMonth] = useState("Jan");
    const [pieSelectYear, setPieSelectYear] = useState(2024);

    let objPieChart: any = {}
    if (incomeData){
        objPieChart = convertToCategoryXAmount(categoryData, incomeData, pieSelectMonth, pieSelectYear);
    }

    let categories: string[] = Object.keys(objPieChart) || []
    let amount: number[] = Object.values(objPieChart) || []


    return (
        <div className="flex flex-col flex-1 gap-5">
            <div className="flex gap-5">
                <select className="bg-primary-lightpurple rounded-lg" value={pieSelectMonth} onChange={(e)=> {setPieSelectMonth(e.target.value)}}>
                    {monthList.map((month, index)=> {
                        return (<option key={month} value={month}>{fullMonthList[index]}</option>)
                    })}
                </select>
                <select className="bg-primary-lightpurple rounded-lg" value={pieSelectYear} onChange={(e)=> {setPieSelectYear(Number(e.target.value))}}>
                    {yearList.map((year, index)=> {
                        return (<option key={year} value={year}>{year}</option>)
                    })}
                </select>
            </div>
            <PieChart title={"Income Distribution"} labelNames={categories} dataValues={amount}></PieChart>
        </div>

    )

}

