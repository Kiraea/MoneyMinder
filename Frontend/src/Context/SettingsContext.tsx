import {useState, ReactNode, createContext, useEffect} from 'react'

type SettingsContextType = {
    currency: string | null,
    setCurrency:React.Dispatch<React.SetStateAction<string>>,

    expenseCategory: string[],
    setExpenseCategory: React.Dispatch<React.SetStateAction<string[]>>,

    incomeCategory: string[],
    setIncomeCategory:React.Dispatch<React.SetStateAction<string[]>>, 
}

export const SettingsContext = createContext<SettingsContextType>({
    currency: null,
    setCurrency: () => {},


    expenseCategory: [],
    setExpenseCategory: () => {},

    incomeCategory: [],
    setIncomeCategory: () => {}


})

type SettingsProviderProps = {
    children: ReactNode
}

export const SettingsProvider = ({children} : SettingsProviderProps) => {

    const [currency, setCurrency] = useState("$");
    const [expenseCategory, setExpenseCategory] = useState<string[]>([])
    const [incomeCategory, setIncomeCategory] = useState<string[]>([])

    useEffect(()=> {
        const savedCurrent = localStorage.getItem('currency');
        if (savedCurrent){
            setCurrency(savedCurrent)
        }

    }, [currency])


    return (
        <SettingsContext.Provider value={{currency, setCurrency, expenseCategory, setExpenseCategory, incomeCategory, setIncomeCategory}}>
            {children}
        </SettingsContext.Provider>
    )
}