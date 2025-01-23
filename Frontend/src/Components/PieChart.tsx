import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';




ChartJS.register(ArcElement, Tooltip, Legend);


  

type PieChartProps = {
    title: string,
    labelNames:  string[],
    dataValues: number[],
}


  export default function PieChart({title, labelNames, dataValues}: PieChartProps) {

    const data = {
        labels: labelNames,
        datasets: [
            {
                label: title,
                data: dataValues,
                backgroundColor:
                [        
                        'rgba(54, 235, 129, 1)',  // Lime green
                        'rgba(102, 102, 255, 1)'  // Light blue
                ],
            },
        ],

    };
    return (
        <div  className='bg-white p-2 rounded-2xl flex flex-col shadow-gray shadow-md gap-5'>
            <h1 className='font-bold'>{title}</h1>
            <div>
                <Doughnut data={data}
                options={{maintainAspectRatio: false, responsive: true}}/>
            </div>


        </div>
    )

  }
  