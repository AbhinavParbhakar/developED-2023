import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Subscription, statistics } from '@/app/interfaces/interfaces';

ChartJS.register(ArcElement, Tooltip, Legend);

interface subscriptionProp{
    input: Subscription,
    statistics : statistics
}



export function App({input,statistics} : subscriptionProp){
  const data = {
    labels: ['Other', input.name],
    datasets: [
      {
        label: 'Cost',
        data: [statistics.subscriptions_total - input.cost, input.cost],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 3,
      },
    ],
  };
    return (<Pie data={data} />)
}

