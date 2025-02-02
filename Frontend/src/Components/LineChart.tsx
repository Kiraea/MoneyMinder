import React, { useContext } from 'react';
import { SettingsContext } from '../Context/SettingsContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];



type LineChartType = {
  obj: any
}
export default function LineChart({obj} : LineChartType) {

const data = {
  labels,
  datasets: [
    {
      label: 'Expenses Amount',
      data: Object.values(obj),
      backgroundColor: '#bab7e3',
      borderColor: '#bab7e3',
    },
  ],

};
    const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top' as const,
        },
        title: {
        display: true,
        text: 'Month Expenses',
        },
    },
        scales: {
            y: {
                ticks:{
                    stepSize: 20000,
                    callback: function (value){
                        return `${currency}` + value
                    }  
                }
            }
        }


    };
    const {currency} = useContext(SettingsContext)
  return (
    <div className='w-full shadow-gray shadow-md rounded-lg'>
        <Line options={options} data={data} />
    </div>
  );
}
