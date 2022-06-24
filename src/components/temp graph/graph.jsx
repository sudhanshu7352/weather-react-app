// import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
    
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text:'Temperature Chart',
    },
  },
};

const labels = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
// const times =[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
// const x =[10,40,30,50]
export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Temp',
      data: labels.map(() => Math.floor((Math.random() * 500) + 10) ),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(41, 138, 228, 0.5)',
    },
  ],
};


export function Graph() {
  return <Line options={options} data={data} />;
}
