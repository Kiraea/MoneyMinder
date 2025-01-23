

type tableProps = {
    columnValues: string[],
    dataValues: {[key: string]: string}[] // for now 
}
function findEven(num: number){
    return num % 2 === 0;
}

const colorTable: {true: string, false: string} = {
    true: "bg-gray-100",
    false: "bg-white"
}


export default function Table({columnValues, dataValues} : tableProps){

    
    return (
        <table>
            <tr className="bg-primary-bluegray text-white text-left p-5">
            {columnValues.map((value)=> {
                return <th>{value}</th>
            })}   
            </tr>

            {dataValues.map((object, index)=> {
                let isEven = findEven(index)
                return (
                <tr>
                    {Object.keys(object).map((key) => (
                      <td className={`${colorTable[isEven ? "true" : "false"]}`}>{object[key]}</td>
                    ))}
                </tr>
            )})}

        </table>
    )
}