import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

import { SettingsContext } from '../Context/SettingsContext';
import { useContext } from 'react';


ChartJS.register(ArcElement, Tooltip, Legend);


  

type PieChartProps = {
    title: string,
    labelNames:  string[],
    dataValues: number[],
}


  export default function PieChart({title, labelNames, dataValues}: PieChartProps) {
    const {currency} = useContext(SettingsContext)
    const data = {
        labels: labelNames,
        datasets: [
            {
                label: title,
                data: dataValues,
                backgroundColor:
                [        
                        'rgba(189, 187, 228, 1)',  
                        'rgba(228, 187, 206, 1)',
                        'rgba(226, 228, 187, 1)',
                        'rgba(226, 228, 187, 1)',

                ],
            },
        ],

    };
    return (
        <div  className='bg-white p-2 rounded-2xl flex flex-col shadow-gray shadow-md gap-5'>
            <h1 className='font-bold'>{title}</h1>
            <div>
                <Doughnut data={data}
                options={{maintainAspectRatio: false, responsive: true,
                }}/>
            </div>


        </div>
    )

  }
  