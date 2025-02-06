import { QueryCache, QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { axiosInstance } from "../axios"
import { ICategoryType } from "../Types/categoryT"
// Access thorugh sessions 

export const useGetUserPublicDetails = () => {
    return useQuery({
        queryKey: ['userDetails'],
        queryFn: (async ()=> {
            try{
                let result = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL_LINK}/api/users/me/publicDetails`)
                if (result.status === 200){
                    console.log("JUST FINISHED FETCHING")
                    return result.data.data
                }
            }catch(e:unknown){
                if (e instanceof AxiosError){
                    console.log(e)
                    throw e
                }
                throw e
            }
        })
    })
}
export const useGetCategoryBasedOnType= (categoryType: ICategoryType) => {
    return useQuery({
        queryKey: ['categories', categoryType],
        queryFn: (async ()=> {
            try{
                let result = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL_LINK}/api/categories`, 
                    {params: {categoryType}}
                )

                if (result.status === 200){
                    console.log("JUST FINISHED FETCHING")
                    return result.data.data
                }
            }catch(e:unknown){
                if (e instanceof AxiosError){
                    console.log(e)
                    throw e
                }
                throw e
            }
        })
    })
}


export const useGetExpenses= () => {
    return useQuery({
        queryKey: ['expenses'],
        queryFn: (async ()=> {
            try{
                let result = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL_LINK}/api/expenses`)
                if (result.status === 200){
                    console.log("JUST FINISHED FETCHING")
                    return result.data.data
                }
            }catch(e:unknown){
                if (e instanceof AxiosError){
                    console.log(e)
                    throw e
                }
                throw e
            }
        })
    })
}
export const useGetIncome= () => {
    return useQuery({
        queryKey: ['income'],
        queryFn: (async ()=> {
            try{
                let result = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL_LINK}/api/income`)
                if (result.status === 200){
                    console.log("JUST FINISHED FETCHING")
                    return result.data.data
                }
            }catch(e:unknown){
                if (e instanceof AxiosError){
                    console.log(e)
                    throw e
                }
                throw e
            }
        })
    })
}
export const useGetSavings = () => {
    return useQuery({
        queryKey: ['savings'],
        queryFn: (async ()=> {
            try{
                let result = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL_LINK}/api/savings`)
                if (result.status === 200){
                    console.log("JUST FINISHED FETCHING")
                    return result.data.data
                }
            }catch(e:unknown){
                if (e instanceof AxiosError){
                    console.log(e)
                    throw e
                }
                throw e
            }
        })
    })
}



type categoryAddMutationVariables = {
    categoryName: string,
    categoryType: ICategoryType 
}
export const AddCategoryBasedOnType = async ({categoryType, categoryName}: categoryAddMutationVariables) => {
    try{
        let result = await axiosInstance.post(`${import.meta.env.VITE_BASE_URL_LINK}/api/categories`, {categoryType: categoryType, categoryName: categoryName})
    }catch(e:unknown){
        if (e instanceof AxiosError){
            console.log(e)
            throw e
        }
        throw e
    }
}

// they haveto be in the same types for variables to work cause it depends on thhe params of the actual function


export const useAddCategoryBasedOnType = ()=> {
    const queryClient = useQueryClient()

    const {mutateAsync :useAddCategoryAsync} = useMutation({
        mutationFn: AddCategoryBasedOnType,
        onSuccess: (data, variables) => {queryClient.invalidateQueries({queryKey: ['categories', variables.categoryType]})}
    })  
    return {useAddCategoryAsync}
}


type categoryDeleteMutationVariables= {
    categoryId: number,
    categoryType: ICategoryType 
}
export const deleteCategory = async ({categoryId, categoryType} : categoryDeleteMutationVariables) => {
    try{
        let result = await axiosInstance.delete(`${import.meta.env.VITE_BASE_URL_LINK}/api/categories/${categoryId}`)
    }catch(e:unknown){
        if (e instanceof AxiosError){
            console.log(e)
            throw e
        }
        throw e
    }
}

// they haveto be in the same types for variables to work cause it depends on thhe params of the actual function


export const useDeleteCategory= ()=> {
    const queryClient = useQueryClient()

    const { mutateAsync: useDeleteCategoryAsync } = useMutation({
        mutationFn: deleteCategory,
        onSuccess: (data, variables) => {
          // Manually remove the category from the cache

          // Invalidate to refetch and sync with server
          queryClient.invalidateQueries({ queryKey: ['categories', variables.categoryType] });
        },
      });
    return {useDeleteCategoryAsync}
}




export const addExpense = async ({description, categoryId, amount , date}: {description: string, categoryId: number, amount: number, date: string } ) => {

    try{
        let result = await axiosInstance.post(`${import.meta.env.VITE_BASE_URL_LINK}/api/expenses/`, {description: description, categoryId: categoryId, amount:amount, date:date})
        if (result.status === 200){
            result.data.data
        }
    }catch(e:unknown){
        if (e instanceof AxiosError){
            console.log(e)
            throw e
        }
        throw e
    }
}


export const useAddExpense = ()=> {
    const queryClient = useQueryClient()

    const { mutateAsync: useAddExpenseAsync} = useMutation({
        mutationFn: addExpense,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
      });
    return {useAddExpenseAsync}
}


export const deleteExpense = async ({expenseId}: {expenseId: number} ) => {
    console.log(expenseId + "expenseId");
    try{
        let result = await axiosInstance.delete(`${import.meta.env.VITE_BASE_URL_LINK}/api/expenses/${expenseId}`)
        if(result.status === 200){
            result.data.message
            console.log(result.data.message)
        }
    }catch(e:unknown){
        if (e instanceof AxiosError){
            console.log(e)
            throw e
        }
        throw e
    }
}

// they haveto be in the same types for variables to work cause it depends on thhe params of the actual function


export const useDeleteExpense = ()=> {
    const queryClient = useQueryClient()
    const { mutateAsync: useDeleteExpenseAsync} = useMutation({
        mutationFn: deleteExpense,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
      });
    return {useDeleteExpenseAsync}
}

/*
{
    "expenseObj": {
      "amount": 25.00,
      "category_id": 2
    }
  }
  {
    "amount": 25.00,
    "category_id": 2
  }
*/
const patchExpense = async ({expenseObj, expenseId}: {expenseObj: {[key: string]: any}, expenseId: number}) => {
    console.log(expenseId, expenseObj, "PATHC EPXENSE EXPENS")
    try{
        let result = await axiosInstance.patch(`${import.meta.env.VITE_BASE_URL_LINK}/api/expenses/${expenseId}`, expenseObj) 
        if(result.status == 200){
            result.data.data
        }
    }catch(e: unknown){
        if (e instanceof AxiosError){
            console.log(e)
            throw(e)
        }
    }
}

export const usePatchExpense = () => {
    const queryClient = useQueryClient()
    const {mutateAsync: usePatchExpenseAsync} = useMutation({
        mutationFn: patchExpense,
        onSuccess: () =>  queryClient.invalidateQueries({queryKey: ["expenses"]})
    })
    return {usePatchExpenseAsync}
}











export const addIncome= async ({description, categoryId, amount , date}: {description: string, categoryId: number, amount: number, date: string } ) => {

    try{
        let result = await axiosInstance.post(`${import.meta.env.VITE_BASE_URL_LINK}/api/income/`, {description: description, categoryId: categoryId, amount:amount, date:date})
        if (result.status === 200){
            result.data.data
        }
    }catch(e:unknown){
        if (e instanceof AxiosError){
            console.log(e)
            throw e
        }
        throw e
    }
}


export const useAddIncome = ()=> {
    const queryClient = useQueryClient()

    const { mutateAsync: useAddIncomeAsync} = useMutation({
        mutationFn: addIncome,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['income'] });
        },
      });
    return {useAddIncomeAsync}
}


export const deleteIncome = async ({incomeId}: {incomeId: number} ) => {
    try{
        let result = await axiosInstance.delete(`${import.meta.env.VITE_BASE_URL_LINK}/api/income/${incomeId}`)
        if(result.status === 200){
            result.data.message
            console.log(result.data.message)
        }
    }catch(e:unknown){
        if (e instanceof AxiosError){
            console.log(e)
            throw e
        }
        throw e
    }
}

// they haveto be in the same types for variables to work cause it depends on thhe params of the actual function


export const useDeleteIncome = ()=> {
    const queryClient = useQueryClient()
    const { mutateAsync: useDeleteIncomeAsync} = useMutation({
        mutationFn: deleteIncome,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['income'] });
        },
      });
    return {useDeleteIncomeAsync}
}


const patchIncome = async ({incomeObj, incomeId}: {incomeObj: {[key: string]: any}, incomeId: number}) => {
    try{
        let result = await axiosInstance.patch(`${import.meta.env.VITE_BASE_URL_LINK}/api/income/${incomeId}`, incomeId) 
        if(result.status == 200){
            result.data.data
        }
    }catch(e: unknown){
        if (e instanceof AxiosError){
            console.log(e)
            throw(e)
        }
    }
}

export const usePatchIncome = () => {
    const queryClient = useQueryClient()
    const {mutateAsync: usePatchIncomeAsync} = useMutation({
        mutationFn: patchIncome,
        onSuccess: () =>  queryClient.invalidateQueries({queryKey: ["income"]})
    })
    return {usePatchIncomeAsync}
}









export const addSaving= async ({description, categoryId, amount , date}: {description: string, categoryId: number, amount: number, date: string } ) => {

    try{
        let result = await axiosInstance.post(`${import.meta.env.VITE_BASE_URL_LINK}/api/savings/`, {description: description, categoryId: categoryId, amount:amount, date:date})
        if (result.status === 200){
            result.data.data
        }
    }catch(e:unknown){
        if (e instanceof AxiosError){
            console.log(e)
            throw e
        }
        throw e
    }
}



export const useAddSaving = ()=> {
    const queryClient = useQueryClient()

    const { mutateAsync: useAddSavingAsync} = useMutation({
        mutationFn: addSaving,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['savings'] });
        },
      });
    return {useAddSavingAsync}
}


export const deleteSaving = async ({savingId}: {savingId: number} ) => {
    try{
        let result = await axiosInstance.delete(`${import.meta.env.VITE_BASE_URL_LINK}/api/saving/${savingId}`)
        if(result.status === 200){
            result.data.message
            console.log(result.data.message)
        }
    }catch(e:unknown){
        if (e instanceof AxiosError){
            console.log(e)
            throw e
        }
        throw e
    }
}

// they haveto be in the same types for variables to work cause it depends on thhe params of the actual function


export const useDeleteSaving= ()=> {
    const queryClient = useQueryClient()
    const { mutateAsync: useDeleteSavingAsync} = useMutation({
        mutationFn: deleteSaving,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['saving'] });
        },
      });
    return {useDeleteSavingAsync}
}


const patchSaving= async ({savingObj, savingId}: {savingObj: {[key: string]: any}, savingId: number}) => {
    try{
        let result = await axiosInstance.patch(`${import.meta.env.VITE_BASE_URL_LINK}/api/savings/${savingObj}`, savingId) 
        if(result.status == 200){
            result.data.data
        }
    }catch(e: unknown){
        if (e instanceof AxiosError){
            console.log(e)
            throw(e)
        }
    }
}

export const usePatchSaving= () => {
    const queryClient = useQueryClient()
    const {mutateAsync: usePatchSavingAsync} = useMutation({
        mutationFn: patchSaving,
        onSuccess: () =>  queryClient.invalidateQueries({queryKey: ["savings"]})
    })
    return {usePatchSavingAsync}
}







