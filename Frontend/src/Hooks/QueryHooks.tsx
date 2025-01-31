import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { axiosInstance } from "../axios"


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

