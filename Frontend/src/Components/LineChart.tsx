import React from 'react';
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

export const options = {
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
                stepSize: 20000 
            }
        }
    }


};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Expenses Amount',
      data: labels.map(() => faker.number.int({ min: 0, max: 100000 })),
      backgroundColor: '#bab7e3',
      borderColor: '#bab7e3',
    },

  ],
};

export default function LineChart() {

  return (
    <div className='w-full shadow-gray shadow-md rounded-lg'>
        <Line options={options} data={data} />
    </div>
  );
}
