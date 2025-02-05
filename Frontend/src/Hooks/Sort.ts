




export const sortByOptions = (arrObj: any, selectedSort: string, orderBy: string)=> {
    console.log("arrobj" , arrObj)
    if (arrObj.every(obj => !obj.date || !obj.amount || !obj.category_id)){ // function works if date amoutn category_id exist
        console.log('failed to sort');
        return []
    }

    let sortedData: any = {}


    if (selectedSort === "date"){
        if (orderBy === "ascending"){
            sortedData = arrObj.slice().sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            })
        }else{
            sortedData = arrObj.slice().sort((a, b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime()
            })
        }

    }else if (selectedSort === "amount"){

        if (orderBy === "ascending"){
            sortedData = arrObj.slice().sort((a, b) => {
                return b.amount - a.amount
            })
        }else{
            sortedData = arrObj.slice().sort((a, b) => {
                return a.amount - b.amount
            })
        }



    }else if (selectedSort === "category"){
        if (orderBy === "ascending"){
            console.log("cateogyr happens")
            sortedData = arrObj.slice().sort((a, b) => {
                console.log("b.category_id:", b.category_id,"a.category_id:",  a.category_id)
                return b.category_id - a.category_id
            })
        }else{
            sortedData = arrObj.slice().sort((a, b) => {

                console.log("b.category_id:", b.category_id,"a.category_id:",  a.category_id)
                return a.category_id - b.category_id
            })
        }
    }else{
        sortedData = arrObj
    }

    return sortedData
}