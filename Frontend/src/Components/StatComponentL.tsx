
type StatCompnentListLProps = {
    amount: number,
    color: 'yellow' | 'red' | 'green' | 'blue',
    description: string,
    currency : string | null
}
const amountColor = {
    yellow: 'text-yellow-500',
    red: 'text-red-500',
    green: 'text-green-500',
    blue: 'text-blue-500',
    // Add other colors as needed
};
export default function StatCompnentListL({ currency, amount, color, description }: StatCompnentListLProps){

    return (
        <div className="flex flex-col p-5 bg-white  shadow-gray shadow-md rounded-2xl">
            <span className="text-2xl font-bold">{description}</span>
            <span className={`${amountColor[color]} font-semibold`}>{currency}{amount}</span>
        </div>
    )
}