import ButtonM from "./ButtonM"
import Table from "./Table";
const columnValues =  ["a", "b", "c"]
const dataValues = [
    {
        title: "HOW TO EARN BABY",
        category: "Housing",
        date: "24/247/41",
        
    },
    {
        title: "HOW TO EARN BABY",
        category: "Housing",
        date: "24/247/41",
        
    },
    {
        title: "HOW TO EARN BABY",
        category: "Housing",
        date: "24/247/41",
        
    },
    {
        title: "HOW TO EARN BABY",
        category: "Housing",
        date: "24/247/41",
        
    },
    {
        title: "HOW TO EARN BABY",
        category: "Housing",
        date: "24/247/41",
        
    },


]


export default function Expenses(){


    return (
        <div className="bg-primary-gray w-full flex flex-col p-5 gap-8">
            <div className="flex">
                <ButtonM text={"Add Expenses"} size={"xs"}/>
            </div>
            <span>Expenses</span>
            <Table columnValues={columnValues} dataValues={dataValues} />
        </div>
    )
}