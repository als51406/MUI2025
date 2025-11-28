import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Chart.js 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Utils 유틸리티 구현
const Utils = {
  months: function({ count }: { count: number }) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames.slice(0, count);
  }
};

// 재사용 가능한 Barchart 컴포넌트
type BarchartProps = {
  labels?: string[];
  dataValues?: number[];
  barColors?: string[];
  borderColors?: string[];
  label?: string;
};

const defaultLabels = Utils.months({ count: 7 });
const defaultDataValues = [65, 59, 80, 81, 56, 55, 40];
const defaultBarColors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 205, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(201, 203, 207, 0.2)'
];
const defaultBorderColors = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)'
];

const Barchart: React.FC<BarchartProps> = ({
  labels = defaultLabels,
  dataValues = defaultDataValues,
  barColors = defaultBarColors,
  borderColors = defaultBorderColors,
  label = 'My First Dataset',
}) => {
  const data = {
    labels: labels,
    datasets: [{
      label: label,
      data: dataValues,
      backgroundColor: barColors,
      borderColor: borderColors,
      borderWidth: 1
    }]
  };
  return <Bar data={data} />;
};

export default Barchart;