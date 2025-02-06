













export const convertToCategoryXAmount = (dataForCategory: any, dataForData: any, selectedMonth: string, selectedYear: number) => {


    let obj: {[key: string]: number} = {}
    if (dataForData.length === 0){
        return obj
    }
    dataForCategory.forEach(dataX => {
        obj[dataX.name] = 0
    });

    dataForCategory.map((dataC)=> {

        dataForData.map((dataD)=> {
            let month = dataD.date.substring(0,3);
            let year = dataD.date.substring(8,12);
            if (dataC.name === dataD.category_name && month === selectedMonth && Number(year) === selectedYear){
                obj[dataC.name] += dataD.amount
            }
        })

    })

    return obj
}
