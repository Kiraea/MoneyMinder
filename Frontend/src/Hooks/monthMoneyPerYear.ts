
import { IYear } from "../Types/categoryT";

const yearList = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050];
const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


export const convertToPerYear = ({dataList, selectYear}: {dataList:any, selectYear:IYear})  => {
    let obj: {[key: string]: number} = {}
    monthList.forEach(month => {
        obj[month] = 0;
    });
    const convertToByYear = (selectYear: IYear) => {
        for (let month of monthList){
            for (let data of dataList){
                const yearX = data.date.substring(8,12); 
                const monthX = data.date.substring(0,3); 
                if (month === monthX && Number(selectYear) === Number(yearX)){
                    obj[month] += data.amount
                }
            }
        }
    }
    convertToByYear(selectYear as IYear)
    return obj
}

