import StatCompnentListL from "./StatComponentL"
import PieChart from "./PieChart"
import Table from "./Table"


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
function Dashboard(){

    return (
        <div className="bg-primary-gray w-full flex flex-col  p-5 gap-8">
            
            <div className="grid grid-cols-3 gap-8">
                <StatCompnentListL amount={15232} color={"green"} description="Current Balance"/>
                <StatCompnentListL amount={15232} color={"red"} description="Expenses"/>
                <StatCompnentListL amount={15232} color={"yellow"} description="Income"/>

                <PieChart title={"Expenses Distribution"} labelNames={["Transportation", "Food"]} dataValues={[25000, 30000]}></PieChart>
                <PieChart title={"Income Distribution"} labelNames={["Transportation", "Food"]} dataValues={[25000, 30000]}></PieChart>
            </div>
            <Table columnValues={columnValues} dataValues={dataValues} />
        </div>
    )
}

export default Dashboard 