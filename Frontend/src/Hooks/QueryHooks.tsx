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

    const {mutateAsync :useDeleteCategoryAsync} = useMutation({
        mutationFn: deleteCategory,
        onSuccess: (data, variables) => {queryClient.invalidateQueries({queryKey: ['categories', variables.categoryType]})}
    })  
    return {useDeleteCategoryAsync}
}








