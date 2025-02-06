import { convertToPerYear } from "../../Hooks/monthMoneyPerYear";
import { useGetSavings} from "../../Hooks/QueryHooks";
import { useGetCategoryBasedOnType } from "../../Hooks/QueryHooks";
import { IYear } from "../../Types/categoryT";
import { useState } from "react";
import LineChart from "../LineChart";

const yearList = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050];
const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fullMonthList = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];


export const SavingLineChart= () => {

    const [selectYear, setSelectYear] = useState<IYear>(2024)

    const {data: categoryData, isPending: categoryIsPending, isError:  categoryIsError, error: categoryError}= useGetCategoryBasedOnType("savings")
    const {data: savingsData = [] , isPending: savingsIsPending, isError:  savingsIsError, error: savingsError} = useGetSavings();

    
    let objLineChart: any = {}

    if (savingsData){
        objLineChart = convertToPerYear({dataList: savingsData, selectYear: selectYear});
    }



    if (categoryIsPending){
        console.log("daskodksao")
        return <div className="bg-black">...loading</div>
    }

    return (
        <div className="flex flex-col flex-1 gap-5">
            <div>
                <select className="bg-primary-lightpurple rounded-lg" value={selectYear} onChange={(e)=> {setSelectYear(Number(e.target.value) as IYear)}}>
                    {yearList.map((year)=> {
                        return (<option value={year}>{year}</option>)
                    })}
                </select>
            </div>
            <LineChart obj={objLineChart}/>
        </div>


    )

}