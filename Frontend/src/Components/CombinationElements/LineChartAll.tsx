import React, { useContext } from 'react';
import { SettingsContext } from '../../Context/SettingsContext';
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


export default function LineChartAll({obj} : LineChartType) {

  console.log(obj);
const data = {
  labels,
  datasets: [
    {
      label: 'Expenses Amount',
      data: labels.map(month => obj.expenses[month] || 0), // Map ordered labels to values
      backgroundColor: '#F44336',
      borderColor: '#F44336',
    },
    {
      label: 'Income Amount',
      data: labels.map(month => obj.income[month] || 0), // Map ordered labels to values
      backgroundColor: '#4CAF50',
      borderColor: '#4CAF50',
    },
    {
      label: 'Savings Amount',
      data: labels.map(month => obj.savings[month] || 0), // Map ordered labels to values
      backgroundColor: '#FFEB3B',
      borderColor: '#FFEB3B',
    },


  ],



};
    const options = {
    responsive: true,
    aspectRatio: 5,
    plugins: {
        legend: {
        position: 'top' as const,
        },
        title: {
        display: true,
        text: 'Line Chart Distribution',
        },
    },
        scales: {
            y: {
                ticks:{
                    stepSize: 100000,
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
